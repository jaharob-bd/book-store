<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Brand;
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
use App\Models\Catalog\Category;
use App\Models\Catalog\Tag;
use App\Models\Catalog\Attribute;
use App\Models\Catalog\Specification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ProductCommonController extends Controller
{
    function brand_index()
    {
        $data['brands'] = Brand::all();
        return Inertia::render('Catalog/Brand/Index', $data);
    }

    public function brand_store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'brand_code' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|integer',
        ]);

        // Attempt to create the brand
        try {
            $brand = Brand::create($validatedData);

            // Flash success message and redirect to the brands listing page
            Session::flash('success', 'Brand added successfully!');
            return redirect()->route('brands');
        } catch (\Exception $e) {
            // Flash error message and redirect back with input data
            Session::flash('failled', 'Failed to add brand: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    function brand_update(Request $request, $id)
    {
        // dd($request->all());
        $brand = Brand::findOrFail($id);
        $brand->name = $request->name;
        $brand->brand_code = $request->brand_code;
        $brand->notes = $request->notes;
        $brand->status = $request->status;
        $brand->save();
        Session::flash('success', 'Brand updated successfully!');
        return redirect()->route('brands');
    }
    function category_index()
    {
        $data['categories'] = Category::all();
        return Inertia::render('Catalog/Category/Index', $data);
    }

    public function category_store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'cat_code' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|integer',
        ]);

        // Attempt to create the category
        try {
            $category = Category::create($validatedData);
            // dd($category);
            if ($category) {
                return response()->json([
                    'status' => true,
                    'categoryId' => $category->id,
                    'message' => 'Category added successfully.'
                ], 201);
            }

            // // Flash success message and redirect to the categories listing page
            // Session::flash('success', 'Category added successfully!');
            // return redirect()->route('categories');
        } catch (\Exception $e) {
            // Flash error message and redirect back with input data
            Session::flash('failed', 'Failed to add category: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    public function category_update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->cat_code = $request->cat_code;
        $category->notes = $request->notes;
        $category->status = $request->status;
        $category->save();
        Session::flash('success', 'Category updated successfully!');
        return redirect()->route('categories');
    }

    function tag_index()
    {
        $data['tags'] = Tag::all();
        // return $data;
        return Inertia::render('Catalog/Tag/Index', $data);
    }

    /**
     * Store a new tag.
     */
    public function tag_store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:tags,name',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Tag created successfully!',
            'tag' => $tag
        ], 201);
    }

    /**
     * Update an existing tag.
     */
    public function tag_update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('tags', 'name')->ignore($tag->id)],
        ]);

        $tag->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Tag updated successfully!',
            'tag' => $tag
        ]);
    }

    public function specification_index()
    {
        $data['specifications'] = Specification::all();
        // return response()->json(['status' => true, 'specifications' => $specifications]);
        return Inertia::render('Catalog/Specification/Index', $data);
    }

    public function specification_store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:specifications,name|max:255',
        ]);

        $specification = Specification::create([
            'name' => $request->name,
            'status' => true,
        ]);

        return response()->json(['status' => true, 'message' => 'Specification added!', 'specification' => $specification]);
    }

    public function specification_update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:255|unique:specifications,name,' . $id,
        ]);

        $specification = Specification::findOrFail($id);
        $specification->update([
            'name' => $request->name,
        ]);

        return response()->json(['status' => true, 'message' => 'Specification updated!', 'specification' => $specification]);
    }

    public function attribute_index()
    {
        $data['attributes'] = Attribute::all();
        // return response()->json(['status' => true, 'specifications' => $specifications]);
        return Inertia::render('Catalog/Attribute/Index', $data);
    }

    //
    /**
     * Store a newly created attribute.
     */
    public function attribute_store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:attributes,name',
        ]);

        // Create the new attribute
        $attribute = Attribute::create([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Attribute created successfully!',
            'attribute' => $attribute
        ], 201);
    }

    /**
     * Update an existing attribute.
     */
    public function attribute_update(Request $request, $id)
    {
        // Find the attribute by its ID or fail
        $attribute = Attribute::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('attributes', 'name')->ignore($attribute->id)],
        ]);

        // Update the attribute
        $attribute->update([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Attribute updated successfully!',
            'attribute' => $attribute
        ]);
    }
}
