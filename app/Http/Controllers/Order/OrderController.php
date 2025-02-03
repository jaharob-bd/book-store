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
            return redirect()->route('order-success', ['order_no' => (string)$order->order_no]);
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }

    // success order back to other page
    public function success()
    {
        // Get order number from request or session
        $order_no = request()->input('order_no');
        // dd($order_no);

        if (!$order_no) {
            // Handle case where order_no might not exist
            Session::flash('failed', 'Order number is missing.');
            return redirect()->route('order-failure');
        }

        return Inertia::render('Website/OrderSuccess', ['order_no' => (string)$order_no]);
    }

    // failed
    public function failure()
    {
        echo "Order failed";
    }
    public function details($order_no)
    {
        $order = Order::with(['customer', 'orderDetails.product', 'paymentDetails'])
            ->where('order_no', $order_no)
            ->first();
        if ($order) {
            $order = [
                'id'       => $order->order_no,                               // Format ID as INV-XXXXXX
                'date'     => date('Y-m-d', strtotime($order->order_date)),   // Format the order date
                'customer' => [
                    'name'    => $order->customer->name ?? '',
                    'email'   => $order->customer->email ?? '',
                    'phone'   => $order->customer->phone ?? '',
                    'address' => $order->shipping_address ?? 'N/A',   // Provide a default value if address is null
                ],
                'items' => $order->orderDetails->map(function ($detail) {
                    return [
                        'name'     => $detail->product->name ?? 'Unknown Product',   // Fetch product name
                        'quantity' => $detail->quantity,
                        'price'    => floatval($detail->price),                      // Ensure price is a float
                    ];
                })->toArray(),
                'payments' => $order->paymentDetails->map(function ($payment) {
                    return [
                        'transaction_id' => $payment->transaction_id ?? 'Unknown Product',   // Fetch product name
                        'amount'         => $payment->amount,
                        'payment_method' => $payment->payment_method,
                        'payment_date'   => $payment->payment_date,                          // Ensure price is a float
                    ];
                })->toArray(),
                'vatRate'     => 0,                                   // Example VAT rate, you can calculate it dynamically if needed
                'shippingFee' => 50,                                  // Example VAT rate, you can calculate it dynamically if needed
                'discount'    => floatval($order->discount_amount),   // Use discount amount from the order
            ];
        } else {
            $order = null;  // Handle case when order is not found
        }

        // return $order;
        return Inertia::render('Website/OrderDetails', ['order' => $order]);
    }
}
