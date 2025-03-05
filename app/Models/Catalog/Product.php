<?php

namespace App\Models\Catalog;

use App\Models\Inventory\Stock\Stock;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'short_description',
        'status',
        'new_product',
        'featured',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'product_url',
        'product_type',
        'regular_price',
        'sale_price',
        'mrp_price',
        'tax_status',
        'tax_class',
        'tax_included',
        'expiry_date',
        'sku',
        'stock_quantity',
        'manage_stock',
        'stock_status',
        'published_at',
        'visible_individually'
    ];

    // update product 
    public static function updateProduct(array $data, int $id)
    {
        $product = Product::find($id);

        if ($product) {
            // Update main fields
            $product->name = $data['name'];
            $product->description = $data['description'];
            $product->short_description = $data['shortDescription'];
            $product->status = 1; // $data['status'];
            $product->new_product = $data['newProduct'];
            $product->featured = $data['featured'];

            // Update meta fields
            $product->meta_title = $data['meta']['metaTitle'];
            $product->meta_description = $data['meta']['metaDescription'];
            $product->meta_keywords = $data['meta']['metaKeywords'];

            // Update general fields
            $product->product_url = $data['general']['productUrl'];
            $product->product_type = 'physical'; // $data['general']['productType'];
            $product->regular_price = $data['general']['regularPrice'];
            $product->sale_price = $data['general']['salePrice'];
            $product->mrp_price = $data['general']['mrpPrice'];
            $product->tax_status = $data['general']['taxStatus'];
            $product->tax_class = $data['general']['taxClass'];
            $product->tax_included = $data['general']['taxIncluded'];
            // $product->expiry_date = $data['general']['expiryDate'];

            // Update inventory fields
            $product->sku = $data['inventory']['sku'];
            $product->stock_quantity = $data['inventory']['stockQuantity'];
            $product->manage_stock = $data['inventory']['manageStock'];
            $product->stock_status = 'in_stock'; // $data['inventory']['stockStatus'];

            // Update publish fields
            $product->published_at = $data['publish']['publishedAt'];
            $product->visible_individually = $data['publish']['visibleIndividually'];

            // Save the updated product
            $product->save();

            return ["status" => true, "message" => "Product updated successfully"];
        } else {
            return ["status" => false, "message" => "Product not found"];
        }
    }
    public function stock()
    {
        return $this->hasOne(Stock::class, 'product_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }
    public function productCategory()
    {
        return $this->hasMany(productCategory::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function variantPrices()
    {
        return $this->hasMany(ProductVariantPrice::class);
    }

    public function groupPrices()
    {
        return $this->hasMany(ProductGroupPrice::class);
    }
}
