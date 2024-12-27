<?php

namespace App\Models\Order;

use App\Models\Consumer\Customer;
use App\Models\Order\OrderDetail;
use Carbon\Carbon;
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

    public static function orderStatusUpdate($data)
    {
        // Validate that 'status' and 'id' keys are present
        if (!isset($data['status']) || !isset($data['id'])) {
            throw new \InvalidArgumentException('Required keys "status" and "id" are missing from data array.');
        }

        $updateData = [
            'status' => $data['status'],
            'updated_at' => Carbon::now(), // explicitly setting the updated_at timestamp
        ];

        $updateOrder = Order::where('id', $data['id'])->update($updateData);

        // Check if the update was successful
        if (!$updateOrder) {
            throw new \Exception('Order update failed.');
        }

        return $data['id'];
    }

    function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    // orderdetails 
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function orderTracking()
    {
        return $this->hasMany(OrderTracking::class, 'order_id', 'id');
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
