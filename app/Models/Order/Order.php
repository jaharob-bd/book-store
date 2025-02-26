<?php

namespace App\Models\Order;

use App\Models\Consumer\Customer;
use App\Models\Order\OrderDetail;
use App\Models\Order\Payment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

    public static function saveOrder(array $data, string $panel)
    {
        $customerInfo = ($panel == false) ? Customer::where('user_id', Auth::user()->id)->first() : '';
        $shippingInfo = self::shippingValidation($data, $panel, $customerInfo);
        $order = Order::create([
            'customer_id'      => $panel ? 31 : $customerInfo->id,
            'order_date'       => now(),
            'shipping_address' => $shippingInfo,
            'sub_amount'       => $data['subAmount'],
            'discount_amount'  => $data['discountAmount'] ?? 0.00,
            'tax_amount'       => $data['vatAmount'] ?? 0.00,
            'shipping_fee'     => $data['shippingFee'] ?? 0.00,
            'total_amount'     => $data['totalAmount'],
            'status'           => $panel ? 'Delivered' : 'Pending',
            'invoice_status'   => $panel ? '2' : '1',
            'created_by'       => Auth::user()->id,
        ]);
        return $order;
    }

    public static function shippingValidation(array $data, string $panel, $customerInfo)
    {
        $shippingInfo = null;
        if (
            $panel == false &&
            !empty($data['shippingAddress']['city']) ||
            !empty($data['shippingAddress']['district']) ||
            !empty($data['shippingAddress']['address'])
        ) {
            $shippingAddress = [
                'city'           => $data['shippingAddress']['city'] ?? '',
                'district'       => $data['shippingAddress']['district'] ?? '',
                'street_address' => $data['shippingAddress']['address'] ?? ''
            ];

            // Check if customer exists before updating
            if ($customerInfo) {
                $customerInfo->update($shippingAddress);
            }

            $shippingInfo = ($data['shippingAddress']['district'] ?? '') . '@' .
                ($data['shippingAddress']['city'] ?? '') . '@' .
                ($data['shippingAddress']['address'] ?? '');
        }
        return $shippingInfo;
    }

    public static function orderStatusUpdate($data)
    {
        // Validate that 'status' and 'id' keys are present
        if (!isset($data['status']) || !isset($data['id'])) {
            // redirect to view controller
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
    public function paymentDetails()
    {
        return $this->hasMany(Payment::class);
    }
    // public static function saveOrder($data)
    // {
    //     // return $this->belongsTo(Brand::class);
    // }

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
