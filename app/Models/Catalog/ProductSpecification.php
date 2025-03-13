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

        // Ensure each specification has valid data
        foreach ($data['specifications'] as $spec) {
            if (!isset($spec['specification_id'], $spec['value']) || empty($spec['value'])) {
                return false; // Invalid data found
            }
        }

        // Get current specifications from DB
        $currentSpecifications = self::where('product_id', $product_id)
            ->pluck('specification_id')
            ->values()
            ->toArray();

        $requestSpecifications = array_column($data['specifications'], 'specification_id');

        // Specifications to insert
        $specificationsToInsert = array_diff($requestSpecifications, $currentSpecifications);
        if (!empty($specificationsToInsert)) {
            $insertData = [];
            foreach ($specificationsToInsert as $specId) {
                $index = array_search($specId, $requestSpecifications);
                if ($index !== false) {
                    $insertData[] = [
                        'product_id' => $product_id,
                        'specification_id' => $specId,
                        'value' => $data['specifications'][$index]['value'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
            if (!empty($insertData)) {
                self::insert($insertData);
            }
        }

        // Specifications to delete
        $specificationsToDelete = array_diff($currentSpecifications, $requestSpecifications);
        if (!empty($specificationsToDelete)) {
            self::where('product_id', $product_id)
                ->whereIn('specification_id', $specificationsToDelete)
                ->delete();
        }

        // Merge insert and delete arrays
        $specificationsToMerge = array_merge($specificationsToInsert, $specificationsToDelete);

        // Specifications to update
        $specificationsToUpdate = array_diff($requestSpecifications, $specificationsToMerge);
        if (!empty($specificationsToUpdate)) {
            foreach ($specificationsToUpdate as $specId) {
                $index = array_search($specId, $requestSpecifications);
                if ($index !== false) {
                    self::where('product_id', $product_id)
                        ->where('specification_id', $specId)
                        ->update([
                            'value' => $data['specifications'][$index]['value'],
                            'updated_at' => now(),
                        ]);
                }
            }
        }

        return true;
    }


    public static function updateSpecification_OLD($data, $product_id)
    {
        if (!isset($data['specifications']) || !is_array($data['specifications'])) {
            return false;
        }
        $currentSpecifications = self::where('product_id', $product_id)->get()->pluck('specification_id')->toArray();
        $requestSpecifications = array_column($data['specifications'], 'specification_id');
        // specifications to insert
        $specificationsToInsert = array_diff($requestSpecifications, $currentSpecifications);
        if ($specificationsToInsert) {
            $insertData = array_map(fn($specId) => [
                'product_id' => $product_id,
                'specification_id' => $specId,
                'value' => $data['specifications'][array_search($specId, $requestSpecifications)]['value'],
            ], $specificationsToInsert);
            self::insert($insertData);
        }
        // specifications to delete
        $specificationsToDelete = array_diff($currentSpecifications, $requestSpecifications);
        if ($specificationsToDelete) {
            self::where('product_id', $product_id)
                ->whereIn('specification_id', $specificationsToDelete)
                ->delete();
        }
        // merge inser and delete array
        $specificationsToMerge = array_merge($specificationsToInsert, $specificationsToDelete);
        // update requestSpecifications and specificationsToMerge diff
        $specificationsToUpdate = array_diff($requestSpecifications, $specificationsToMerge);
        if ($specificationsToUpdate) {
            foreach ($specificationsToUpdate as $specId) {
                self::where('product_id', $product_id)
                    ->where('specification_id', $specId)
                    ->update([
                        'value' => $data['specifications'][array_search($specId, $requestSpecifications)]['value']
                    ]);
            }
        }

        return true;
    }
}
