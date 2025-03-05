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
        // Find the product by ID
        $product = Product::findOrFail($id);
        dd($images);
        if ($images) {
            foreach ($images as $file) {
                $name = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $name);

                // Insert image data
                $product->images()->create([
                    'src' => 'uploads/' . $name,
                    'alt' => $file->getClientOriginalName(),
                    'status' => 1,
                ]);
                dd($product);
            }
        }
        exit;
        // Check if images exist
        if (!empty($images)) {
            foreach ($images as $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) { // Ensure it's a valid uploaded file
                    $name = time() . '_' . $file->getClientOriginalName();
                    $file->move(public_path('uploads'), $name);

                    // Insert image data into the product_images table
                    $product->images()->create([
                        'src' => 'uploads/' . $name,
                        'alt' => $file->getClientOriginalName(),
                        'status' => 1,
                    ]);
                    dd($product);
                }
            }
        }
        return true;
    }

    public function product()
    {
        return $this->belongsTo(self::class);
    }
}
