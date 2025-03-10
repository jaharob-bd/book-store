<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Catalog\Product;
use App\Http\Requests\Catalog\Product\StoreProductRequest;
use App\Http\Requests\Catalog\Product\VariantPriceRequest;
use App\Models\Catalog\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    function index()
    {
        $products = $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            // ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'a.name as category_name'
            )
            ->get();

        return Inertia::render('Website/Cart', [
            'products' => $products
        ]);
    }
    function wishList()
    {
        $products = $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'a.name as category_name'
            )
            ->get();

        return Inertia::render('Website/Wishlist', [
            'products' => $products
        ]);
    }
}
