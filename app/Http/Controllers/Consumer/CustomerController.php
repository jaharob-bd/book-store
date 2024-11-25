<?php

namespace App\Http\Controllers\Consumer;

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
use App\Models\Consumer\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
    function index()
    {
        $data['customers'] = Customer::all();
        return Inertia::render('Consumer/Customer/Index', $data);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'required|string|max:255',
            'gender' => 'nullable|string',
            'dob' => 'nullable|date',
            // 'customer_group_id' => 'nullable|integer',
            'status' => 'required|integer',
        ]);

        // Attempt to create the customer
        try {
            $customer = Customer::create($validatedData);

            // Flash success message and redirect to the customers listing page
            Session::flash('success', 'Customer added successfully!');
            return redirect()->route('customers.index');
        } catch (\Exception $e) {
            // Flash error message and redirect back with input data
            Session::flash('failed', 'Failed to add customer: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->gender = $request->gender;
        $customer->dob = $request->dob;
        $customer->customer_group_id = $request->customer_group_id;
        $customer->status = $request->status;
        $customer->save();
        Session::flash('success', 'Customer updated successfully!');
        return redirect()->route('customers');
    }
}
