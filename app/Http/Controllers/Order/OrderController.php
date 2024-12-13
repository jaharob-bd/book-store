<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use App\Models\Consumer\Customer;
use App\Models\Inventory\Stock\Stock;
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
        $validated = $request->validate([
            'subAmount'                   => 'required|numeric|min:0',
            'discountAmount'              => 'nullable|numeric|min:0',
            'taxAmount'                   => 'nullable|numeric|min:0',
            'shippingFee'                 => 'nullable|numeric|min:0',
            'totalAmount'                 => 'required|numeric|min:0',
            'orderDetails'                => 'required|array',
            'orderDetails.*.id'           => 'required|exists:products,id', // product id
            'orderDetails.*.salePrice'    => 'required|numeric|min:0',
            'orderDetails.*.quantity'     => 'required|integer|min:1',
        ]);
        // Start DB Transaction
        DB::beginTransaction();
        try {
            // get customers information
            $customerInfo = Customer::where('user_id', '=', Auth::user()->id)->first();
            // Create order
            $order = Order::create([
                'customer_id'      => $customerInfo->id,                               // Assuming the logged-in user is the customer
                'order_date'       => now(),
                'shipping_address' => $request->input('shippingAddress', null),
                'billing_address'  => $request->input('billingAddress', null),
                'sub_amount'       => $validated['subAmount'],
                'discount_amount'  => $validated['discountAmount'] ?? 0.00,
                'tax_amount'       => $validated['taxAmount'] ?? 0.00,
                'shipping_fee'     => $validated['shippingFee'] ?? 0.00,
                'total_amount'     => $validated['totalAmount'],
                'status'           => 'Pending',
                'created_by'       => Auth::user()->id,
            ]);

            // Create order details
            foreach ($validated['orderDetails'] as $detail) {
                $product = Product::with('stock')->find($detail['id']);

                // Check if enough stock is available
                if ($product->stock && $product->stock->quantity < $detail['quantity']) {
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

            Session::flash('success', 'Order Place successfully!');
            return redirect()->route('order-success');

        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }

    // success order back to other page
    public function success()
    {
        echo 44;
        // echo 'Order Place successfully'; exit;
        // return Inertia::render('Wesite/OrderSuccess', ['order_no' => $order_no]);
    }
}
