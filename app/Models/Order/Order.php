<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'order_date',
        'shipping_address',
        'billing_address',
        'sub_amount',
        'discount_amount',
        'tax_amount',
        'shipping_fee',
        'status',
    ];

    public static function saveOrder($data)
    {
        // return $this->belongsTo(Brand::class);
    }

    public function categories()
    {
        // return $this->belongsToMany(Category::class, 'product_categories');
    }
}
