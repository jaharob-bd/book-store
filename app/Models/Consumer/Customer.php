<?php

namespace App\Models\Consumer;

use App\Models\Order\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phone', 'gender', 'dob', 'customer_group_id', 'status', 'user_id', 'city', 'district', 'street_address'];

    // all orders user_id
    public function orders(){
        return $this->hasMany(Order::class, 'customer_id');
    }
}
