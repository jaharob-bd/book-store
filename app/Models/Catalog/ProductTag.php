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
        'tag_id',
    ];

    public static function updateTags($data, $product_id)
    {
        if (!isset($data['tags'])) {
            return false;
        }
        $tags = $data['tags'];
        foreach ($tags as $tag) {
            $existingTag = self::where('product_id', $product_id)
                ->where('tag_id', $tag)
                ->first();

            if ($existingTag) {
                // Update if exists
                $existingTag->update([
                    'tag_id' => $tag,
                ]);
            } else {
                // Insert new if not exists
                self::create([
                    'product_id' => $product_id,
                    'tag_id' => $tag,
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
