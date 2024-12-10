<?php

namespace App\Models\Order;

use App\Models\Catalog\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'variant_id',
        'quantity',
        'price',
    ];

    /**
     * Get the order that owns the detail.
     */

    // save order details static function
    public static function saveOrderDetails($data)
    {

        // // for loop order details
        // foreach ($variant_ids as $variant_id) {
        //     self::saveOrderDetail($order_id, $product_id, $variant_id, $quantity, $price);
        // }
        // // return;  // return immediately if no variants are provided.

        // // single variant order detail

        // $orderDetail = new OrderDetail();
        // $orderDetail->order_id = $order_id;
        // $orderDetail->product_id = $product_id;
        // // $orderDetail->variant_id = $variant_id;
        // $orderDetail->quantity = $quantity;
        // $orderDetail->price = $price;
        // $orderDetail->save();

        return $orderDetail;  // return the saved order detail model instance for further operations.
    }


    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product associated with the detail.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the variant associated with the detail.
     */

    // public function variant()
    // {
    //     return $this->belongsTo(Variant::class);
    // }
}
