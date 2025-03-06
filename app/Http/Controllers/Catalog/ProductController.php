<?php

namespace App\Http\Controllers\Catalog;

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
use App\Models\Catalog\ProductCategory;
use App\Models\Catalog\ProductImage;
use App\Models\Catalog\ProductSpecification;
use App\Models\Catalog\ProductTag;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    function index()
    {
        $data['products'] = Product::all();
        return Inertia::render('Catalog/Product/Index', $data);
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
        return Inertia::render('Catalog/Product/Edit1', $data);
    }

    function update(Request $request, $product_id)
    {
        $data = $request->all();
        // update product table
        $updateProduct = Product::updateProduct($data, $product_id);
        if ($updateProduct['status']) {
            // update specification table
            $updateCategories = ProductCategory::updateCategory($data['categories'], $product_id);
            $updateSpecifications = ProductSpecification::updateSpecification($data['specifications'], $product_id);
            $updateTags = ProductTag::updateTags($data['tags'], $product_id);
            // attributes
            // images 
            // $updateImages = ProductImage::updateImages($request->file('images'), $id);
            // dd($updateTags);
            // update variant prices table
            // $updateVariantPrices = ProductVariantPrice::updateVariantPrices($request->all(), $id);
            // dd($updateVariantPrices);
            // update group prices table
            // $updateGroupPrices = ProductGroupPrice::updateGroupPrices($request->all(), $id);
            // dd($updateGroupPrices);
            // update bundle prices table
            // $updateBundlePrices = ProductBundlePrice::updateBundlePrices($request->all(), $id);
            // dd($updateBundlePrices);
            // update bundle items table
            // $updateBundleItems = ProductBundleItem::updateBundleItems($request->all(), $id);
            // dd($updateBundleItems);
            // update bundle options table
            // $updateBundleOptions = ProductBundleOption::updateBundleOptions($request->all(), $id);
            // update images table

            // dd($updateImages);
        }

        // // dd($data);
        // exit;
        // DB::beginTransaction();
        // try {
        //     //code...
        //     // update product model
        //     $product = Product::find($product_id);
        //     $product->update($request->all());
        //     // update images
        //     if ($request->hasFile('images')) {
        //         $images = $request->file('images');
        //         foreach ($images as $image) {
        //             $imageName = time() . '_' . $image->getClientOriginalName();
        //             $image->move(public_path('images/products'), $imageName);
        //             $product->images()->create(['image' => $imageName]);
        //         }
        //     }
        //     // update variant prices
        //     DB::commit();
        //     echo json_encode(['status' => true, 'message' => 'Product Add successfully', 'orderNo' => ''], 200);
        // } catch (\Exception $e) {
        //     // Rollback transaction on error
        //     DB::rollBack();
        //     Session::flash('failed', $e->getMessage());
        // }
    }

    function imageUpload($request, $id)
    {
        dd($request);
        // // Validate the incoming request
        // $request->validate([
        //     'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);

        // Find the product by ID
        $product = Product::findOrFail($id);

        // Upload images and insert their data
        if ($request->hasfile('images')) {
            foreach ($request->file('images') as $file) {
                $name = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $name);

                // Insert image data
                $product->images()->create([
                    'src' => 'uploads/' . $name,
                    'alt' => $file->getClientOriginalName(),
                    'status' => 1,
                ]);
            }
        }

        Session::flash('success', 'Images uploaded successfully!');
        return redirect()->route('product-edit', ['slug' => $product->url_key]);
    }

    function variantPrice(VariantPriceRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        try {
            // Start transaction
            DB::beginTransaction();
            // Insert variant price data
            $product->variantPrices()->create([
                'variant_name' => $request->variant_name,
                'buy_price' => $request->buy_price,
                'sale_price' => $request->sale_price,
                'mrp_price' => $request->mrp_price,
                'status' => 1
            ]);

            // Commit transaction
            DB::commit();
            Session::flash('success', 'Product updated successfully!');
            return redirect()->route('product-edit', ['slug' => $product->url_key]);
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
            return redirect()->route('product-edit', ['slug' => $product->url_key]);
        }
    }

    function groupPrice(Request $request, $id)
    {
        // dd($request->all());
        $product = Product::findOrFail($id);
        // Insert image data
        $product->groupPrices()->create([
            'customer_group_id' => $request->customer_group_id ?: '',
            'discount_type' => $request->discount_type ?: '',
            'qty' => $request->qty ?: '',
            'amount' => $request->amount ?: '',
            'status' => 1
        ]);

        Session::flash('success', 'Product price updated successfully!');
        return redirect()->route('product-edit', ['slug' => $product->url_key]);
    }
}
