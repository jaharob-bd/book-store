<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'src', 'alt', 'status'];

    public static function updateImages($images, $data, $product_id)
    {
        $requestIdArray = isset($data['imageIds']) ? $data['imageIds'] : array();
        $currentImageArray = self::where('product_id', $product_id)
            ->select('id', 'src')
            ->get()
            ->toArray();

        $deleteFilterArray = array_values(array_filter($currentImageArray, function ($item) use ($requestIdArray) {
            return !in_array($item['id'], $requestIdArray);
        }));

        // Delete old images
        if (!empty($deleteFilterArray)) {
            $deletedIn = [];
            foreach ($deleteFilterArray as $item) {
                $deletedIn[] = $item['id'];
                if (file_exists(public_path($item['src']))) {
                    unlink(public_path($item['src']));
                }
            }
            self::destroy($deletedIn);
        }

        // Insert new images
        if (!empty($images)) { // Ensure images are not empty
            $product = Product::findOrFail($product_id);
            foreach ($images as $file) { // Fixed the double dollar sign issue
                if ($file instanceof \Illuminate\Http\UploadedFile) { // Ensure it's a valid file
                    $filename = time() . '_' . rand(99, 999) . '_' . $file->getClientOriginalName();
                    $file->move(public_path('uploads/products'), $filename);

                    $product->images()->create([
                        'src'    => 'uploads/products/' . $filename,
                        'alt'    => $file->getClientOriginalName(),
                        'status' => 1,
                    ]);
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
