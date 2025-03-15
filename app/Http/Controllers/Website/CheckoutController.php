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
use Illuminate\Support\Facades\Validator;
use App\Models\Catalog\Product;
use App\Http\Requests\Catalog\Product\StoreProductRequest;
use App\Http\Requests\Catalog\Product\VariantPriceRequest;
use App\Models\Catalog\Category;
use App\Models\Consumer\Customer;
use App\Models\Setting\Organization;

class CheckoutController extends Controller
{
    function index()
    {
        $data['organization'] = Organization::first();
        $data['customer'] = Customer::where('user_id', Auth::user()->id)->first();
        return Inertia::render('Website/Checkout', $data);
    }
    function gift()
    {
        return Inertia::render('Website/Gift');
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->all();
        // If validation passes, proceed with creating the product
        $inserted = Product::create($request->validated());
        if ($inserted) {
            Session::flash('success', 'Product added successfully!');
            // Redirect to the desired page (e.g., product listing) with serialized data
            return redirect()->route('product-edit', ['slug' => $inserted->product_url]);
        }
    }

    function edit($slug)
    {
        $data['product'] = Product::with('productCategory')
            ->with('images')
            ->with('variantPrices')
            ->with('groupPrices')
            ->where('product_url', $slug)->first();
        // category
        $data['categories'] = Category::select('id', 'name')->get();
        // return $data['category'];
        // return $data['product']; exit;
        return Inertia::render('Catalog/Product/Edit', $data);
    }
}
