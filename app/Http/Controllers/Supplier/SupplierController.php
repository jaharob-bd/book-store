<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Models\Supplier\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{
    public function index()
    {
        $data['suppliers'] = Supplier::all();
        return Inertia::render('Supplier/Index', $data);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'required|string|max:20|unique:suppliers',
            'address' => 'required|string',
            'status' => 'required|integer',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
        ]);

        // Attempt to create the supplier
        try {
            $supplier = Supplier::create($validatedData);

            // Flash success message and redirect to the suppliers listing page
            Session::flash('success', 'Supplier added successfully!');
            return redirect()->route('suppliers.index');
        } catch (\Exception $e) {
            // Flash error message and redirect back with input data
            Session::flash('failed', 'Failed to add supplier: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'required|string|max:20|unique:suppliers,phone,' . $id,
            'address' => 'required|string',
            'status' => 'required|integer',
            'created_by' => 'nullable|integer',
            'updated_by' => 'nullable|integer',
        ]);

        try {
            $supplier->update($validatedData);

            Session::flash('success', 'Supplier updated successfully!');
            return redirect()->route('suppliers.index');
        } catch (\Exception $e) {
            Session::flash('failed', 'Failed to update supplier: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }
}
