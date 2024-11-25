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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

            // Flash success message and redirect to the categories listing page
            Session::flash('success', 'Category added successfully!');
            return redirect()->route('categories');
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

}
