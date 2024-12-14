<?php

namespace App\Models\Order;

use App\Models\Consumer\Customer;
use App\Models\Order\OrderDetail;
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
        'order_no',
    ];

    function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    // orderdetails 
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public static function saveOrder($data)
    {
        // return $this->belongsTo(Brand::class);
    }

    public function categories()
    {
        // return $this->belongsToMany(Category::class, 'product_categories');
    }

    // Boot method to generate `order_no`
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            $dateTime = now()->format('dmYHis'); // Current date and time in DDMMYYYYHHMMSS format
            $order->order_no = sprintf('%s0%d', $dateTime, $order->customer_id);
        });
    }
}
