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

    public static function updateAttribute($data, $productId)
    {
        // Check if 'attributes' key exists in the provided data
        if (!isset($data['attributes'])) {
            return false; // Return false if no attributes are provided
        }

        DB::beginTransaction();

        try {
            // Fetch current attributes for the given product_id
            $currentAttributes = self::where('product_id', $productId)->pluck('attribute_value_id')
                ->values()
                ->toArray();
            // print_r($currentAttributes);
            $requestValueArray = [];
            foreach ($data['attributes'] as $attributeData) {
                $attributeIds = $attributeData['attribute_value_id'];
                $attributeValues = explode(',', $attributeIds);
                // Populate the new value array with cleaned attribute values (cast to integers)
                foreach ($attributeValues as $value) {
                    $requestValueArray[] = (int)$value;
                }
            }

            // print_r($requestValueArray);
            // Find new values that need to be inserted (those not already present in current attributes)
            $newValuesToInsert = array_diff($requestValueArray, $currentAttributes);
            // print_r($newValuesToInsert);
            // exit;

            // Bulk insert only the new attribute values that don't exist yet
            if (!empty($newValuesToInsert)) {
                $insertData = [];
                foreach ($newValuesToInsert as $value) {
                    $insertData[] = [
                        'product_id' => (int)$productId,
                        'attribute_value_id' => $value
                    ];
                }

                // Insert in bulk
                self::insert($insertData);
            }

            // Find old values that should be deleted (those no longer present in new values)
            $valuesToDelete = array_diff($currentAttributes, $requestValueArray);
            // print_r($valuesToDelete);
            // exit;
            // Bulk delete only the outdated attribute values
            if (!empty($valuesToDelete)) {
                self::whereIn('attribute_value_id', $valuesToDelete)
                    ->where('product_id', $productId) // Make sure to delete only for the specific product
                    ->delete();
            }

            // Commit the transaction if everything is successful
            DB::commit();
            return true;
        } catch (\Exception $e) {
            // In case of an exception, rollback the transaction
            DB::rollBack();
            // Optionally, you can log the exception message for debugging purposes
            // Log::error($e->getMessage());
            return false;
        }
    }

    public static function updateAttribute_old($data, $productId)
    {
        // Check if 'attributes' key exists in the provided data
        if (!isset($data['attributes'])) {
            return false; // Return false if no attributes are provided
        }

        $currentAttributes = self::where('product_id', $productId)->get()->toArray();
        $existingAttributeValueIdArray = array_column($currentAttributes, 'attribute_value_id');
        DB::beginTransaction();
        try {
            // Loop through the attributes and process them
            $newValueArray = [];
            foreach ($data['attributes'] as $attributeData) {
                $attributeIds = $attributeData['attribute_value_id'];
                // Convert the comma-separated values into an array of attribute IDs
                $attributeValues = explode(',', $attributeIds);

                // Add new attribute values (those that don't exist yet)
                foreach ($attributeValues as $value) {
                    $newValueArray[] = (int) $value;
                    $existing = in_array($value, $existingAttributeValueIdArray);
                    if (!$existing) {
                        $insertArray = [
                            'product_id' => (int) $productId,
                            'attribute_value_id' => (int) $value, // The specific value ID for the attribute
                        ];
                        self::create($insertArray);
                    }
                }
            }
            $deleteArray = array_diff($existingAttributeValueIdArray, $newValueArray);
            if (!empty($deleteArray)) {
                // Delete the records where attribute_value_id is in $deleteArray
                self::whereIn('attribute_value_id', $deleteArray)->delete();
            } else {
                return false;
            }
            DB::commit();

            return true; // Return true when the operation is successful

        } catch (\Exception $e) {
            // Rollback transaction if something goes wrong
            DB::rollBack();
            return false; // Return false if an error occurs
        }
    }
}
