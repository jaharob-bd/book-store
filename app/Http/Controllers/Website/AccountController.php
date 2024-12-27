<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Consumer\Customer;
use App\Models\Order\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    function index()
    {
        $products = $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'c.name as category_name'
            )
            ->get();

        return Inertia::render('Website/MyProfile', [
            'products' => $products,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
    // my order history
    public function myOrderHistory()
    {
        $customer = Customer::with('orders')->where('user_id', Auth::user()->id)->first();
        // return $customer;
        if (!$customer) {
            return redirect()->route('home');
        }
        return Inertia::render('Website/MyOrderHistory', ['orders' => $customer->orders]);
    }

    // myWishList 
    public function myWishList()
    {
        $products = $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'c.name as category_name'
            )
            ->get();

        return Inertia::render('Website/MyWishList', [
            'products' => $products
        ]);
    }

    // MyChangePassword
    public function myChangePassword()
    {
        return Inertia::render('Website/MyChangePassword');
    }
    // MyAddressMange
    public function myAddressManage()
    {
        return Inertia::render('Website/MyAddressMange');
    }

    // myOrderTracking
    public function myOrderTracking($order_no)
    {
        // echo 555;
        $order = Order::with('orderDetails.product', 'orderTracking')->where('order_no', $order_no)->first();
        // return $order;
        if (!$order) {
            return redirect()->route('home');
        }
        // order history
        $tracking = [];
        foreach ($order->orderTracking as $value) {
            $tracking[$value->status] = [
                'statusUpdatedAt' => $value->status_updated_at
                    ? Carbon::parse($value->status_updated_at)->format('d M Y, H:i')
                    : null,
                'estimatedDeliveryDate' => $value->estimated_delivery_date
                    ? Carbon::parse($value->estimated_delivery_date)->format('d M Y')
                    : null,
                'carrierName' => $value->carrier_name ?? null,
            ];
        }

        // Ensure all statuses are included, even if no entry exists for them
        $statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Payment', 'Placed'];

        foreach ($statuses as $status) {
            if (!isset($tracking[$status])) {
                $tracking[$status] = [
                    'statusUpdatedAt' => $status == 'Pending' ? Carbon::parse($order->order_date)->format('d M Y, , H:i') : null,
                    'estimatedDeliveryDate' => null,
                    'carrierName' => null,
                ];
            }
        }
        // return $tracking['Processing']['statusUpdatedAt'];
        // return $tracking;
        return Inertia::render('Website/MyOrderTracking', ['order' => $order, 'tracking' => $tracking]);
    }
}
