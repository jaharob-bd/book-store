<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    protected $table = 'product_categories';

    protected $fillable = [
        'product_id',
        'category_id',
        'created_by',
        'updated_by',
    ];

    public static function updateCategory($data, $product_id)
    {
        if (!isset($data['categories'])) {
            return false;
        }
        $categories = $data['categories'];
        foreach ($categories as $key => $category) {
            $sl = $key + 1;
            // Check if the category already exists for this product
            $existingCategory = self::where('product_id', $product_id)
                ->where('category_id', $sl)
                ->first();

            if ($existingCategory) {
                // Update timestamps only (No extra update needed as only IDs are stored)
                $existingCategory->touch();
            } else {
                // Insert new if not exists
                self::create([
                    'product_id'  => $product_id,
                    'category_id' => $sl,
                    'created_by'  => auth()->id() ?? null,
                    'updated_by'  => auth()->id() ?? null,
                ]);
            }
        }
        return true;
    }
}
