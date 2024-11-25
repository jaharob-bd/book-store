<?php

namespace App\Http\Requests\Catalog\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;

class StoreProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'url_key' => 'required|string|min:3|max:100|regex:/^[a-z0-9-]+$/|unique:products,url_key',
            'sku' => 'required|string|min:3|max:50|unique:products,sku',
            'product_code' => 'required|string|min:3|unique:products,product_code',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'name.min' => 'The product name must be at least 3 characters.',
            'name.max' => 'The product name may not be greater than 255 characters.',
            'url_key.required' => 'The URL key is required.',
            'url_key.min' => 'The URL key must be at least 3 characters.',
            'url_key.max' => 'The URL key may not be greater than 255 characters.',
            'url_key.regex' => 'The URL key may only contain letters, numbers, and hyphens.',
            'url_key.unique' => 'The URL key has already been taken.',
            'sku.required' => 'The SKU is required.',
            'sku.min' => 'The SKU must be at least 3 characters.',
            'sku.max' => 'The SKU may not be greater than 50 characters.',
            'sku.unique' => 'The SKU has already been taken.',
            'product_code.required' => 'The product code is required.',
            'product_code.min' => 'The product code must be at least 3 characters.',
            'product_code.unique' => 'The product code has already been taken.',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors()->all();
        Session::flash('errors', $errors);
        parent::failedValidation($validator);
    }
}