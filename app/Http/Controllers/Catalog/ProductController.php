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
use App\Models\Catalog\ProductAttribute;
use App\Models\Catalog\ProductCategory;
use App\Models\Catalog\ProductImage;
use App\Models\Catalog\ProductSpecification;
use App\Models\Catalog\ProductTag;
use App\Models\Catalog\Specification;
use App\Models\Catalog\Tag;
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
        $data['productQ'] = $product = Product::with(['attributes', 'specifications', 'images', 'categories:id,name', 'tags', 'variantPrices', 'groupPrices'])
            ->where('product_url', $slug)
            ->first();
        // return $product;
        if (!$product) {
            Session::flash('failed', 'Not found product!');
            return redirect()->route('products');
        }

        // return $product;
        $data['product'] = [
            'productId'        => $product->id,
            'name'             => $product->name ?? '',
            'description'      => $product->description,
            'shortDescription' => $product->short_description ?? '',
            'status'           => 1,
            'newProduct'       => 1,
            'featured'         => 0,
            'meta'             => [
                'metaTitle'       => $product->meta_title ?? '',
                'metaDescription' => $product->meta_description ?? '',
                'metaKeywords'    => $product->meta_keywords ?? '',
            ],
            'general' => [
                'productUrl'   => $product->product_url,
                'productType'  => $product->product_type ?? 0,
                'regularPrice' => $product->regular_price ?? 0,
                'salePrice'    => $product->sale_price ?? 0,
                'mrpPrice'     => $product->mrp_price ?? 0,
                'taxStatus'    => $product->tax_status ?? '',
                'taxClass'     => $product->tax_class ?? '',
                'taxIncluded'  => $product->tax_included ?? '',
                'expiryDate'   => (empty($product->expiry_date) || $product->expiry_date == '1970-01-01') 
                ? date('Y-m-d', strtotime('+1 year')) 
                : $product->expiry_date,
            ],
            'inventory' => [
                'sku'           => $product->sku ?? '',
                'stockQuantity' => $product->stock_quantity ?? 0,
                'manageStock'   => $product->manage_stock ?? 0,
                'stockStatus'   => $product->stock_status ?? '',
            ],
            'publish' => [
                'visibleIndividually' => $product->visible_individually ?? 0,
                'publishedStatus'     => $product->published_status ?? 0,
                'publishedAt'         => $product->published_at ?? '',
            ],
            'categories' => $product->categories->map(fn($category) => [
                'id'   => $category->id,
                'name' => $category->name
            ]),
            'tags' => $product->tags->map(fn($tag) => [
                'id'   => $tag->id,
                'name' => $tag->name
            ]),
            'images' => $product->images->map(fn($image) => [
                'id'      => $image->id,
                'preview' => asset($image->src)
            ]),
            'imageIds' => [],
            'specifications' => $product->specifications->map(fn($spec) => [
                'id'               => $spec->id,
                'specification_id' => $spec->pivot->specification_id,
                'name'             => $spec->name,
                'value'            => $spec->pivot->value
            ]),
            'attributes' => $product->attributes
                ->groupBy('attribute_name')
                ->map(function ($group) {
                    return [
                        'attribute' => $group->first()->attribute_name,
                        'attribute_value_id' => $group->pluck('pivot.attribute_value_id')->implode(','),
                        'attribute_values' => $group->pluck('pivot.attribute_value')->implode(', ')
                    ];
                })->values(),
            'variants'   => []    // Future use
        ];

        // return response()->json($data['product']);
        $data['categories'] = Category::select('id', 'name')->get();
        // specification
        $data['specifications'] = Specification::all();
        // tag
        $data['tags'] = Tag::all();

        // attributes value
        $attributes = DB::table('attributes')
            ->leftJoin('attribute_values', 'attributes.id', '=', 'attribute_values.attribute_id')
            ->select('attributes.name as attribute_name', 'attribute_values.id as attribute_value_id', 'attribute_values.value')
            ->get();

        // Transform result into the desired format
        $attributeOptions = [];

        foreach ($attributes as $attribute) {
            if (!isset($attributeOptions[$attribute->attribute_name])) {
                $attributeOptions[$attribute->attribute_name] = [];
            }

            if ($attribute->value) { // Avoid null values
                $attributeOptions[$attribute->attribute_name][] = [
                    'id' => $attribute->attribute_value_id,
                    'value' => $attribute->value,
                ];
            }
        }
        $data['attributes'] = $attributeOptions;
        // return $attributeOptions;

        return Inertia::render('Catalog/Product/Edit', $data);
    }

    function update(Request $request)
    {
        $data             = $request->all();
        $product_id       = (int) $data['productId'];
        try {
            $updateProduct = Product::updateProduct($data, $product_id);
            if ($updateProduct['status']) {
                $updateAttributes     = ProductAttribute::updateAttribute($data, $product_id);
                $updateSpecifications = ProductSpecification::updateSpecification($data, $product_id);
                $updateImages         = ProductImage::updateImages($request->file('images'), $data, $product_id);
                $updateCategories     = ProductCategory::updateCategory($data, $product_id);
                $updateTags           = ProductTag::updateTags($data, $product_id);
                echo json_encode(['status' => true, 'message' => 'Product updated successfully!'], 200);
            } else {
                echo json_encode(['status' => false, 'message' => 'Product not found']);
            }

            // return response()->json([
            //     'success' => true,
            //     'message' => 'Product updated successfully!'
            // ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }




        // echo json_encode(['status' => false, 'message' => 'Product not found']);
        // exit;



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


    public function imageUpload(Request $request)
    {
        // dd($request->all());
        if (!$request->hasFile('images')) {
            return response()->json(['error' => 'No files received'], 400);
        }

        foreach ($request->file('images') as $file) {
            // $file->storeAs('public/products', time(). '_'. $file->getClientOriginalName());
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/products'), $filename);
            // return response()->json([
            //     'message' => 'File received',
            //     'filename' => $file->getClientOriginalName(),
            //     'size' => $file->getSize(),
            //     'mime' => $file->getMimeType(),
            // ]);
        }
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
