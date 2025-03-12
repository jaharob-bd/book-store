<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProductAttribute extends Model
{
    use HasFactory;

    protected $table = 'product_attributes';

    protected $fillable = [
        'product_id',
        'attribute_value_id',
        'created_by',
        'updated_by',
    ];

    public static function updateAttribute($data, $product_id)
    {
        // Check if 'attributes' key exists in the provided data
        if (!isset($data['attributes'])) {
            return false; // Return false if no attributes are provided
        }

        // Begin transaction to ensure data integrity
        DB::beginTransaction();

        try {
            // Loop through the attributes and process them
            foreach ($data['attributes'] as $attributeData) {
                // Get the attribute name and attribute values
                $attributeName = $attributeData['attribute'];
                $attributeIds = $attributeData['attribute_value_id'];
                // Convert the comma-separated values into an array of attribute IDs
                $attributeValues = explode(',', $attributeIds);

                // Get the current values for this attribute and product
                $currentValues = self::where('product_id', $product_id)
                    ->where('attribute', $attributeName)
                    ->pluck('attribute_value_id')
                    ->toArray();

                // Calculate the difference between the existing values and the new values
                $valuesToRemove = array_diff($currentValues, $attributeValues);
                $valuesToAdd = array_diff($attributeValues, $currentValues);

                // Remove old attribute values (those that no longer exist)
                foreach ($valuesToRemove as $value) {
                    self::where('product_id', $product_id)
                        ->where('attribute_value_id', $value)
                        ->delete();
                }

                // Add new attribute values (those that don't exist yet)
                foreach ($valuesToAdd as $value) {
                    // Check if the value already exists for the product
                    $existing = self::where('product_id', $product_id)
                        ->where('attribute_value_id', $value)
                        ->exists();

                    // If the value doesn't already exist, insert it
                    if (!$existing) {
                        $insertArray = [
                            'product_id' => (int) $product_id,
                            // 'attribute' => $attributeName,  // Ensure attribute name is added
                            'attribute_value_id' => (int) $value, // The specific value ID for the attribute
                        ];
                        self::create($insertArray);
                    }
                }
            }

            // Commit the transaction
            DB::commit();

            return true; // Return true when the operation is successful

        } catch (\Exception $e) {
            // Rollback transaction if something goes wrong
            DB::rollBack();
            return false; // Return false if an error occurs
        }
    }
}
