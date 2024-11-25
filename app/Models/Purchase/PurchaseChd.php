<?php

namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\ProductVariantPrice;

class PurchaseChd extends Model
{
    use HasFactory;

    protected $table = 'purchase_chds';
    protected $fillable = [
        'purchase_mst_id', 'product_v_id', 'quantity', 'price', 'purchase_date', 'status', 'created_by', 'updated_by'
    ];

    public function purchaseMst()
    {
        return $this->belongsTo(PurchaseMst::class, 'purchase_mst_id');
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
