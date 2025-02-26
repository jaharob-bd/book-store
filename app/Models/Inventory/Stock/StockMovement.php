<?php

namespace App\Models\Inventory\Stock;

use App\Models\Catalog\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockMovement extends Model
{
    use HasFactory, SoftDeletes;

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
        $stockMovement = StockMovement::create([
            'product_id' => $data['id'],
            'quantity'   => $data['quantity'],
            'type'       => 'In',
            'add_id'     => $addIn,
            'created_by' => $data['created_by'] ?? auth()->id(),
        ]);
        return $stockMovement;
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
