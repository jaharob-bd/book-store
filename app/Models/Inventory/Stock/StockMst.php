<?php

namespace App\Models\Inventory\Stock;

use App\Models\Catalog\Product;
use App\Models\Catalog\ProductVariantPrice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMst extends Model
{
    use HasFactory;

    protected $table = 'stock_msts';
    protected $fillable = [
        'product_v_id', 'quantity', 'last_updated', 'created_by', 'updated_by'
    ];

    public function productVariantPrice()
    {
        return $this->belongsTo(ProductVariantPrice::class, 'product_v_id');
    }
    // add all product data to join with stock
    // public function productName(){
    //     return $this->productVariantPrice->product();
    // }
    // only product name can be joined
    public function getProductNameAttribute()
    {
        return $this->productVariantPrice->product->name;
    }
    // only product name can be joined
    public function getProductIdAttribute()
    {
        return $this->productVariantPrice->product->id;
    }
    // only variant name can be joined
    public function getVariantNameAttribute()
    {
        return $this->productVariantPrice->variant_name;
    }
}
