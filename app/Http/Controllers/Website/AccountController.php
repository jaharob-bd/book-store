<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Consumer\Customer;
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
}
