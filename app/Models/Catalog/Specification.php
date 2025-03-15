<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isArray;

class Specification extends Model
{
    use HasFactory;

    protected $table = 'specifications';

    protected $fillable = [
        'name',
    ];

    public static function updateSpecification($data, $productId)
    {

        if (!isset($data['specifications'])) {
            return false;
        }
        $specifications = $data['specifications'];
        foreach ($specifications as $spec) {
            // Check if the specification already exists
            $existingSpec = self::where('product_id', $productId)
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
                    'product_id' => $productId,
                    'specification_name' => $spec,
                    'specification_value' => $spec,
                ]);
            }
        }
        return true;
    }
}
