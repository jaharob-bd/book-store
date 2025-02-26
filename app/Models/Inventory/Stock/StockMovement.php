<?php

namespace App\Models\Inventory\Stock;

use App\Models\Catalog\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    use HasFactory;

    protected $table = 'stock_movements';
    protected $fillable = [
        'product_id',
        'quantity',
        'type',
        'add_id',
        'out_id',
        'created_by',
        'updated_by'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public static function saveStockMovement($data, $addIn = null)
    {
        foreach ($data as $chd) {
            StockMovement::create([
                'product_id' => $chd['variant_id'],
                'quantity'   => $chd['quantity'],
                'type'       => 'In',
                'add_id'     => $addIn,
                'created_by' => $chd['created_by'] ?? auth()->id(),
                'updated_by' => $chd['updated_by'] ?? auth()->id(),
            ]);
        }
    }

    // public function productVariantPrice()
    // {
    //     return $this->belongsTo(Product::class, 'product_id');
    // }
    // public function getProductNameAttribute()
    // {
    //     return $this->productVariantPrice->product->name;
    // }
    // // only product name can be joined
    // public function getProductIdAttribute()
    // {
    //     return $this->productVariantPrice->product->id;
    // }
    // // only variant name can be joined
    // public function getVariantNameAttribute()
    // {
    //     return $this->productVariantPrice->variant_name;
    // }

    public function productVariantPrice()
    {
        return $this->belongsTo(Product::class, 'product_id');
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
