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
    function index()
    {
        // category
        $data['categories'] = Category::where('status', '1')->get();
        // author
        $data['authors'] = Author::where('status', '1')->get();
        // publisher
        $data['publishers'] = Publisher::where('status', '1')->get();
        // return $data['publishers'];
        $data['products'] = DB::table('products as p')
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
            // return $data;

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
    function filterProducts(Request $request){
        $data = $request->all();
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
        if(isset($data['category_id']) && $data['category_id'] != ''){
            $products = $products->where('p.category_id', $data['category_id']);
        }
        if(isset($data['author_id']) && $data['author_id'] != ''){
            $products = $products->where('p.author_id', $data['author_id']);
        }
        if(isset($data['publisher_id']) && $data['publisher_id'] != ''){
            $products = $products->where('p.publisher_id', $data['publisher_id']);
        }
        $products = $products->get();
        return response()->json($products);
    }

}
