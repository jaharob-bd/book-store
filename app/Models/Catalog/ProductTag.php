<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\Tag;

class ProductTag extends Model
{
    use HasFactory;

    protected $table = 'product_tags';

    protected $fillable = [
        'product_id',
        'tag_id',
    ];

    public static function updateTags(array $data, int $productId): bool
    {
        if (empty($data['tags'])) {
            return false;
        }

        $tagIds = [];

        foreach ($data['tags'] as $tag) {
            if (empty($tag['tag_id'])) {
                // Insert new tag and get its ID
                $newTag = Tag::firstOrCreate(['name' => $tag['name']]);
                $tagId = $newTag->id;
            } else {
                $tagId = $tag['tag_id'];
            }

            $tagIds[] = $tagId;
        }

        // Fetch existing tags for the product
        $existingTagIds = self::where('product_id', $productId)->pluck('tag_id')->toArray();

        // Determine tags to add and remove
        $tagsToAdd = array_diff($tagIds, $existingTagIds);
        $tagsToRemove = array_diff($existingTagIds, $tagIds);

        // Insert new associations
        if (!empty($tagsToAdd)) {
            $insertData = array_map(fn($tagId) => [
                'product_id' => $productId,
                'tag_id' => $tagId,
                'created_at' => now(),
                'updated_at' => now(),
            ], $tagsToAdd);

            self::insert($insertData);
        }

        // Remove unselected tags
        if (!empty($tagsToRemove)) {
            self::where('product_id', $productId)
                ->whereIn('tag_id', $tagsToRemove)
                ->delete();
        }

        return true;
    }

    public static function updateTags_old($data, $productId)
    {
        if (!isset($data['tags'])) {
            return false;
        }
        $tags = $data['tags'];
        foreach ($tags as $tag) {

            if (!$tag['tag_id']) {
                // insert tags table into
                $tagId = Tag::insertGetId([
                    'name' => $tag,
                ]);
                self::create([
                    'product_id' => $productId,
                    'tag_id'     => $tagId,
                ]);
            } else {
                $existingTag = self::where('product_id', $productId)
                    ->where('tag_id', $tag['tag_id'])
                    ->first();

                if (!$existingTag) {
                    // Insert new if not exists
                    self::create([
                        'product_id' => $tag['product_id'],
                        'tag_id'     => $tag['tag_id'],
                    ]);
                }
            }
        }
        return true;
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
