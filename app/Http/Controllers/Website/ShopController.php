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
use App\Models\Catalog\Author;
use App\Models\Catalog\Publisher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShopController extends Controller
{
    function index(Request $request)
    {
        $data = $request->all();

        // [
        //   "author" => "1"
        //   "category" => "1"
        //   "price" => "100-200"
        //   "publisher" => "1"
        // ]

        // dd($data['author']);
        // shop?author=1&category=1&price=100-200&publisher=1
        // category
        $data['categories'] = Category::where('status', '1')->get();
        // author
        $data['authors'] = Author::where('status', '1')->get();
        // publisher
        $data['publishers'] = Publisher::where('status', '1')->get();
        // $products = DB::table('products as p')
        //     ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
        //     ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
        //     ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
        //     ->select(
        //         'p.*',
        //         'a.name as author_name',
        //         'pb.name as publisher_name',
        //         'c.name as category_name'
        //     );
        // if (isset($data['category']) && $data['category'] != '') {
        //     $products = $products->where('p.category_id', $data['category']);
        // }
        // if (isset($data['author']) && $data['author'] != '') {
        //     $products = $products->where('p.author_id', $data['author']);
        // }
        // if (isset($data['publisher']) && $data['publisher'] != '') {
        //     $products = $products->where('p.publisher_id', $data['publisher']);
        // }


        // $data = $request->all();
        // $data = array_map(function ($value) {
        //     return str_replace('_', ',', $value);
        // }, $request->all());

        $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'c.name as category_name'
            );

        // Handle "category" filter
        if (!empty($data['category'])) {
            $categoryIds = explode('_', $data['category']); // Convert "1,2,3" into an array
            $products = $products->whereIn('p.category_id', $categoryIds);
        }

        // Handle "author" filter
        if (!empty($data['author'])) {
            $authoryIds = explode('_', $data['author']); // Convert "1,2,3" into an array
            $products = $products->whereIn('p.author_id', $authoryIds);
        }

        // Handle "publisher" filter
        if (!empty($data['publisher'])) {
            $publisherIds = explode('_', $data['publisher']); // Convert "1,2,3" into an array
            $products = $products->whereIn('p.publisher_id', $publisherIds);
        }

        $data['products'] = $products->get();
        // return $data['products'];

        return Inertia::render('Website/Shop', $data);
    }

    function singleProductView($slug)
    {
        // $slug = 'bangladesher-itihash';
        $product = DB::table('products as p')
            ->where('p.url_key', $slug)
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'c.name as category_name'
            )
            ->first();
        if (!$product) {
            abort(404, 'Product not found');
        }
        return Inertia::render('Website/SingleProduct', [
            'product' => $product,
        ]);
    }

    // filter products
    function filter(Request $request)
    {
        $data = $request->all();
        // $data = array_map(function ($value) {
        //     return str_replace('_', ',', $value);
        // }, $request->all());

        $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'c.name as category_name'
            );

        // Handle "category" filter
        if (!empty($data['category'])) {
            $categoryIds = explode('_', $data['category']); // Convert "1,2,3" into an array
            $products = $products->whereIn('p.category_id', $categoryIds);
        }

        // Handle "author" filter
        if (!empty($data['author'])) {
            $authoryIds = explode('_', $data['author']); // Convert "1,2,3" into an array
            $products = $products->whereIn('p.author_id', $authoryIds);
        }

        // Handle "publisher" filter
        if (!empty($data['publisher'])) {
            $publisherIds = explode('_', $data['publisher']); // Convert "1,2,3" into an array
            $products = $products->whereIn('p.publisher_id', $publisherIds);
        }

        $products = $products->get();
        return response()->json($products, 200);
    }
}
