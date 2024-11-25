<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariantPrice extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'variant_name', 'buy_price', 'sale_price', 'mrp_price', 'status'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
