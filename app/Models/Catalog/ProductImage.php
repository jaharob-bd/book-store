<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'src', 'alt', 'status'];

    public static function updateImages($images, $id)
    {
        if (!$images) {
            return false;
        }
        
        $product = Product::findOrFail($id);
        foreach ($images as $file) {
            // $file->storeAs('public/products', time(). '_'. $file->getClientOriginalName());
            $filename = time() . '_' .rand(99, 999). '_'. $file->getClientOriginalName();
            $file->move(public_path('uploads/products'), $filename);
            // Insert image data
            $product->images()->create([
                'src' => 'uploads/products/' . $filename,
                'alt' => $file->getClientOriginalName(),
                'status' => 1,
            ]);
        }
        return true;
    }

    public function product()
    {
        return $this->belongsTo(self::class);
    }
}
