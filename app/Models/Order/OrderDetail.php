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

    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id',  'id');
    }
    // Accessor for product name
    public function getProductNameAttribute()
    {
        return $this->products ? $this->products->name : null;
    }

    // save order details static function
    public static function saveOrderDetails(array $data, int $id)
    {
        $createOrder = OrderDetail::create([
            'order_id'   => $id,
            'product_id' => $data['id'],
            'quantity'   => $data['quantity'],
            'price'      => $data['price'],
        ]);

        if ($createOrder) {
            return $createOrder;
        } else {
            return false;
        }
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
}
