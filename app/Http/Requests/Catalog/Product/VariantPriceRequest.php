<?php

namespace App\Http\Requests\Catalog\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;

class VariantPriceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'variant_name' => 'required|string|max:255',
            'buy_price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0|gte:buy_price',
            'mrp_price' => 'required|numeric|min:0|gte:buy_price',
        ];
    }

    public function messages()
    {
        return [
            'variant_name.required' => 'Variant name is required.',
            'buy_price.required' => 'Buying price is required.',
            'buy_price.numeric' => 'Buying price must be a number.',
            'buy_price.min' => 'Buying price must be at least 0.',
            'sale_price.required' => 'Sale price is required.',
            'sale_price.numeric' => 'Sale price must be a number.',
            'sale_price.min' => 'Sale price must be at least 0.',
            'sale_price.gte' => 'Sale price must be greater than or equal to buying price.',
            'mrp_price.required' => 'MRP price is required.',
            'mrp_price.numeric' => 'MRP price must be a number.',
            'mrp_price.min' => 'MRP price must be at least 0.',
            'mrp_price.gte' => 'MRP price must be greater than or equal to buying price.',
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors()->all();
        Session::flash('errors', $errors);
        parent::failedValidation($validator);
    }
}
