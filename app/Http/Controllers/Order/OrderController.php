<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use App\Models\Order\Order;
use App\Models\Order\OrderDetail;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    // store the order
    public function store(Request $request)
    {
        $data = $request->all();
        dd($data);
    }
    public function store4(Request $request)
    {
        $data = $request->all();
        dd($data);
        $validated = $request->validate([
            'subAmount'                   => 'required|numeric|min:0',
            'discountAmount'              => 'nullable|numeric|min:0',
            'taxAmount'                   => 'nullable|numeric|min:0',
            'shippingFee'                 => 'nullable|numeric|min:0',
            'totalAmount'                 => 'required|numeric|min:0',
            'orderDetails'                => 'required|array',
            'orderDetails.*.id'           => 'required|exists:products,id',
            'orderDetails.*.salePrice'    => 'required|numeric|min:0',
            'orderDetails.*.mrpPrice'     => 'nullable|numeric|min:0',
            'orderDetails.*.categoryName' => 'nullable|string',
            'orderDetails.*.quantity'     => 'required|integer|min:1',
        ]);

        // Start DB Transaction
        DB::beginTransaction();

        try {
            // Create order
            $order = Order::create([
                'customer_id'      => auth()->id(),                               // Assuming the logged-in user is the customer
                'order_date'       => now(),
                'shipping_address' => $request->input('shippingAddress', null),
                'billing_address'  => $request->input('billingAddress', null),
                'sub_amount'       => $validated['subAmount'],
                'discount_amount'  => $validated['discountAmount'] ?? 0.00,
                'tax_amount'       => $validated['taxAmount'] ?? 0.00,
                'shipping_fee'     => $validated['shippingFee'] ?? 0.00,
                'status'           => 'pending',                                  // Assuming a default status
            ]);

            // Create order details
            foreach ($validated['orderDetails'] as $detail) {
                $product = Product::with('stock')->findOrFail($detail['id']);

                // Check if enough stock is available
                if ($product->stock->quantity < $detail['quantity']) {
                    throw new \Exception("Insufficient stock for product ID: {$detail['id']}");
                }

                // Create order detail record
                OrderDetail::create([
                    'order_id'   => $order->id,
                    'product_id' => $detail['id'],
                    'quantity'   => $detail['quantity'],
                    'price'      => $detail['salePrice'],
                ]);

                // Decrement stock
                $product->stock->decrement('quantity', $detail['quantity']);
            }

            // Commit transaction
            DB::commit();

            Session::flash('success', 'Purchase successfully!');
            return redirect()->route('checkout');
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }
}
