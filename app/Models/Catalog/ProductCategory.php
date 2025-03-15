<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\Category;

class ProductCategory extends Model
{
    use HasFactory;

    protected $table = 'product_categories';

    protected $fillable = [
        'product_id',
        'category_id',
        'created_by',
        'updated_by',
    ];

    public static function updateCategory($data, $product_id)
    {
        $requestCategoryArray = isset($data['categories']) ? $data['categories'] : array();
        $currentCategoryArray = self::where('product_id', $product_id)
            ->pluck('category_id')
            ->values()
            ->toArray();
        // insert product category table
        $productCategoryArray = array_map(function ($item) {
            return $item['id'];
        }, array_filter($requestCategoryArray, function ($item) {
            return isset($item['id']);
        }));
        $newProductCategoryArray = array_diff($productCategoryArray, $currentCategoryArray);
        // insert product category table
        if ($newProductCategoryArray) {
            // insert new categories
            $insertProductCategoryData = array();
            foreach ($newProductCategoryArray as $categoryId) {
                $insertProductCategoryData[] = [
                    'product_id' => $product_id,
                    'category_id' => $categoryId,
                    'created_by' => auth()->user()->id,
                    'updated_by' => auth()->user()->id,
                ];
            }
            self::insert($insertProductCategoryData);
        }
        // delete category and product category table
        $deleteCateIdInArray = array_filter($currentCategoryArray, function ($item) use ($requestCategoryArray) {
            return !in_array($item, array_column($requestCategoryArray, 'id'));
        });
        if ($deleteCateIdInArray) {
            self::whereIn('category_id', $deleteCateIdInArray)->where('product_id', $product_id)->delete();
        }
        /*
        // new category insert category and product category table
        $newCategoryArray = array_filter($requestCategoryArray, function ($item) {
            return !isset($item['id']);
        });
        if ($newCategoryArray) {
            // Insert new categories
            foreach ($newCategoryArray as $category) {
                // insert category
                $categoryName = trim($category['name']); // স্পেস সরানো
                $checkCategoryName = Category::whereRaw('BINARY TRIM(name) = ?', [$categoryName])->first();
                // dd($checkCategoryName);
                if (!$checkCategoryName) {
                    $categoryId = Category::insertGetId([
                        'name' => $category['name'],
                        'created_by'  => auth()->id() ?? null,
                        'updated_by'  => auth()->id() ?? null,
                    ]);
                    // Insert product_category
                    self::create([
                        'product_id'  => $product_id,
                        'category_id' => $categoryId,
                        'created_by'  => auth()->id() ?? null,
                        'updated_by'  => auth()->id() ?? null,
                    ]);
                }
            }
        }
        */
        return true;
    }
}
