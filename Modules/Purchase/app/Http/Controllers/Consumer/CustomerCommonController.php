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
use App\Models\Consumer\CustomerGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CustomerCommonController extends Controller
{
    function customer_group_index()
    {
        $data['customerGroups'] = CustomerGroup::all();
        return Inertia::render('Consumer/Group/Index', $data);
    }
    
    public function customer_group_store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|integer',
        ]);
    
        // Attempt to create the customer group
        try {
            $customerGroup = CustomerGroup::create($validatedData);
            // Flash success message and redirect to the customer groups listing page
            Session::flash('success', 'Customer group added successfully!');
            return redirect()->route('customer-groups');
        } catch (\Exception $e) {
            // Flash error message and redirect back with input data
            Session::flash('failed', 'Failed to add customer group: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }
    
    function customer_group_update(Request $request, $id)
    {
        $customerGroup = CustomerGroup::findOrFail($id);
        $customerGroup->name = $request->name;
        $customerGroup->code = $request->code;
        $customerGroup->notes = $request->notes;
        $customerGroup->status = $request->status;
        $customerGroup->save();
        Session::flash('success', 'Customer group updated successfully!');
        return redirect()->route('customer-groups');
    }

}
