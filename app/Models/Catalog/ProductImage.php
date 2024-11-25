<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'img_src', 'img_alt', 'status'];

    public function product()
    {
        return $this->belongsTo(ProductImage::class);
    }
}
