<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ProductSpecification extends Model
{
    use HasFactory;

    protected $table = 'product_specifications';

    protected $fillable = [
        'product_id',
        'specification_name',
        'specification_value',
    ];

    public static function updateSpecification(array $specifications, $product_id)
    {
        foreach ($specifications as $spec) {
            // Check if the specification already exists
            $existingSpec = self::where('product_id', $product_id)
                ->where('specification_value', $spec)
                ->first();

            if ($existingSpec) {
                // Update if exists
                $existingSpec->update([
                    'specification_value' => $spec,
                ]);
            } else {
                // Insert new if not exists
                self::create([
                    'product_id' => $product_id,
                    'specification_name' => $spec,
                    'specification_value' => $spec,
                ]);
            }
        }
        return true;
    }
}
