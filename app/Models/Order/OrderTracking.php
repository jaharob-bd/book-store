<?php

namespace App\Models\Order;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTracking extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order_tracking';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'status',
        'tracking_number',
        'carrier_name',
        'status_updated_at',
        'estimated_delivery_date',
        'remarks',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    public static function orderTrackingSave($data)
    {
        // Validate required fields
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Required keys are missing: id');
        }
        $checkDuplicate = OrderTracking::where([
            ['order_id', '=', $data['id']],
            ['status', '=', $data['status']],
        ])->first();
        if ($checkDuplicate) {
            throw new \Exception('Order tracking with same status and order id already exists.');
        }
        // status log added or updated
        $orderTrackingData = [
            'order_id' => $data['id'], // Replace with the actual order ID
            'status' => $data['status'],
            'tracking_number' => $data['trackingNumber'], // TRK1234567890
            'carrier_name' => $data['carrierName'], // FedEx
            'status_updated_at' => now(),
            'estimated_delivery_date' => Carbon::now()->addDays(2)->toDateString(), // Now + 2 days
            'remarks' => $data['remarks'] ?? 'Shipped successfully.',
            'created_by' => auth()->id(), // Assuming the logged-in user
            'updated_by' => auth()->id(), // Assuming the logged-in user
        ];
        // Insert the data
        $orderTracking = OrderTracking::create($orderTrackingData);
        return $orderTracking->id;
    }
    /**
     * Define the relationship with the `orders` table.
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /**
     * Define the relationship for the user who created the record.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Define the relationship for the user who updated the record.
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
