<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGroupPrice extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'customer_group_id', 'qty', 'discount_type', 'amount', 'status'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
