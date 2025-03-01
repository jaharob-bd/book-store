<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use App\Models\Consumer\Customer;
use App\Models\Order\Order;
use App\Models\Order\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Models\Setting\Organization;
use App\Models\Inventory\Stock\StockMovement;
use App\Models\Order\Payment;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\Inventory\Stock\Stock;

class OrderController extends Controller
{
    // store the order
    public function store(Request $request)
    {
        $data      = $request->all();
        $panel     = ($data['submitFrom'] == 'panel') ? true : false;
        $validated = $request->validate([
            'subAmount'               => 'required|numeric|min:0',
            'discountAmount'          => 'nullable|numeric|min:0',
            'vatAmount'               => 'nullable|numeric|min:0',
            'shippingFee'             => 'nullable|numeric|min:0',
            'totalAmount'             => 'required|numeric|min:0',
            'shippingAddress'         => 'nullable|array',
            'orderDetails'            => 'required|array',
            'orderDetails.*.id'       => 'required|exists:products,id',   // product id
            'orderDetails.*.price'    => 'required|numeric|min:0',
            'orderDetails.*.quantity' => 'required|integer|min:1',
        ]);
        // Start DB Transaction
        DB::beginTransaction();
        try {
            // customer data
            $customerId = Customer::saveCustomerFromOrder($data['customer'], $panel);
            // dd($customerId);
            $order = Order::saveOrder($validated, $panel, $customerId);
            if ($order) {
                foreach ($validated['orderDetails'] as $detail) {
                    $product = Product::with('stock')->find($detail['id']);
                    // Check if enough stock is available
                    if ($product->stock && $product->stock->quantity < $detail['quantity']) {
                        throw new \Exception("Insufficient stock for product ID: {$detail['id']}");
                    }
                    $createOrder    = OrderDetail::saveOrderDetails($detail, $order->id);
                    $stockDecrement = $product->stock->decrement('quantity', $detail['quantity']);
                    $stockMovement = ($stockDecrement) ? StockMovement::saveStockMovement($detail, $order->id) : '';
                }
                // payment method
                ($panel && isset($data['paymentMethods'])) ? Payment::savePayment($data['paymentMethods'], $order->id) : '';
            }
            // Commit transaction
            DB::commit();
            if ($panel) {
                echo json_encode(['status' => true, 'message' => 'Order place successfully', 'orderNo' => $order->order_no], 200);
            } else {
                Session::flash('success', 'Order Place successfully!');
                redirect()->route('order-success', ['order_no' => (string) $order->order_no]);
            }
            // return $panel ? redirect()->route('sales.order.create')
            //     : redirect()->route('order-success', ['order_no' => (string) $order->order_no]);
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
        $organization = Organization::first();
        $order = Order::with(['customer', 'orderDetails.product', 'paymentDetails'])
            ->where('order_no', $order_no)
            ->first();
        $shippingAddress = explode('@', $order->shipping_address);
        // dd($shippingAddress);
        if ($order) {
            $order = [
                'id'              => $order->order_no,
                'shippingAddress' => [
                    'city'     => isset($shippingAddress[1]) ? $shippingAddress[1] : '',
                    'district' => isset($shippingAddress[0]) ? $shippingAddress[0] : '',
                    'address'  => isset($shippingAddress[2]) ? $shippingAddress[2] : '',
                ],
                'date'            => date('Y-m-d', strtotime($order->order_date)),
                'customer'        => [
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
                'vatAmount'   => $order->tax_amount ?? 0,                  // Example VAT rate, you can calculate it dynamically if needed
                'shippingFee' => $order->shipping_fee,                // Example VAT rate, you can calculate it dynamically if needed
                'discount'    => floatval($order->discount_amount),   // Use discount amount from the order
            ];
        } else {
            $order = null;  // Handle case when order is not found
        }

        // return $order;
        return Inertia::render('Website/OrderDetails', ['order' => $order, 'organization' => $organization]);
    }
}
