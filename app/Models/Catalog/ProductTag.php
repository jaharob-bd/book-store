<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTag extends Model
{
    use HasFactory;

    protected $table = 'product_tags';

    protected $fillable = [
        'product_id',
        'tag_name',
    ];

    public static function updateTags(array $tags, $product_id)
    {
        foreach ($tags as $tag) {
            $existingTag = self::where('product_id', $product_id)
                ->where('tag_name', $tag)
                ->first();

            if ($existingTag) {
                // Update if exists
                $existingTag->update([
                    'tag_name' => $tag,
                ]);
            } else {
                // Insert new if not exists
                self::create([
                    'product_id' => $product_id,
                    'tag_name' => $tag,
                ]);
            }
        }
        return true;
    }
}
