<?php

namespace App\Models\Purchase;

use App\Models\Catalog\ProductVariantPrice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockChd extends Model
{
    use HasFactory;

    protected $table = 'stock_chds';
    protected $fillable = [
        'product_v_id', 'quantity', 'movement_type', 'movement_add_id', 'movement_remove_id', 'created_by', 'updated_by'
    ];

    public function productVariantPrice()
    {
        return $this->belongsTo(ProductVariantPrice::class, 'product_v_id');
    }
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
