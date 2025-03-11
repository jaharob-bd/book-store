<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTag extends Model
{
    use HasFactory;

    protected $table = 'tags';

    protected $fillable = [
        'name',
    ];

    public static function updateTags($data, $product_id)
    {
        if (!isset($data['tags'])) {
            return false;
        }
        $tags = $data['tags'];
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

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
