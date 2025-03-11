<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isArray;

class ProductSpecification extends Model
{
    use HasFactory;

    protected $table = 'product_specifications';

    protected $fillable = [
        'product_id',
        'specification_id',
        'value',
    ];

    public static function updateSpecification($data, $product_id)
    {
        if (!isset($data['specifications']) || !is_array($data['specifications'])) {
            return false;
        }

        foreach ($data['specifications'] as $spec) {
            // Ensure proper data structure
            if (!isset($spec['specification_id'], $spec['value'])) {
                continue; // Skip if invalid data
            }

            $existingSpec = self::where('product_id', $product_id)
                ->where('specification_id', $spec['specification_id'])
                ->first();

            if ($existingSpec) {
                // Update if exists
                $existingSpec->update([
                    'value' => $spec['value'],
                ]);
            } else {
                // Insert new if not exists
                self::create([
                    'product_id' => $product_id,
                    'specification_id' => $spec['specification_id'],
                    'value' => $spec['value'],
                ]);
            }
        }

        return true;
    }
}
