<?php

namespace App\Models\Consumer;

use App\Models\Order\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phone', 'gender', 'dob', 'customer_group_id', 'status', 'user_id', 'city', 'district', 'street_address'];

    public static function saveCustomerFromOrder(array $data, bool $panel): ?int
    {
        // dd($data['phone']);
        try {
            // If order is from the website, retrieve customer ID based on authenticated user
            if (!$panel) {
                return Customer::where('user_id', Auth::id())->value('id');
            }
    
            // If an existing customer ID is provided from the admin panel
            if (!empty($data['id'])) {
                return $data['id'];
            }
    
            // If phone number is provided, check if the customer already exists
            if (!empty($data['phone'])) {
                $customer = Customer::firstOrCreate(
                    ['phone' => $data['phone']],
                    ['name' => $data['name'] ?? $data['phone'], 'status' => 1]
                );
                return $customer->id;
            }
    
            // Return null if no valid customer data is provided
            return 31; // walking customer here.
    
        } catch (\Exception $e) {
            \Log::error("Error saving customer from order: " . $e->getMessage());
            return null;
        }
    }
    
    // all orders user_id
    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }
}
