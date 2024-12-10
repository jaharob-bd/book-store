<?php

namespace App\Models\Catalog;

use App\Models\Inventory\Stock\Stock;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'url_key', 'sku', 'product_code', 'short_description', 'description', 'brand_id', 'status', 'released_on'];

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
