<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\ProductVariantPrice;

class SaleChd extends Model
{
    use HasFactory;

    protected $table = 'sale_chds';
    protected $fillable = [
        'sale_mst_id', 'product_v_id', 'quantity', 'price', 'sale_date', 'status', 'created_by', 'updated_by'
    ];

    public function saleMst()
    {
        return $this->belongsTo(SaleMst::class, 'sale_mst_id');
    }
    public function productVariantPrice()
    {
        return $this->belongsTo(ProductVariantPrice::class, 'product_v_id');
    }
    // product name
    public function getProductNameAttribute(){
        return $this->productVariantPrice->product->name;
    }
    // product variant name
    public function getVariantNameAttribute(){
        return $this->productVariantPrice->variant_name;
    }
}
