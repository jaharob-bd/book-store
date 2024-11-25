<?php

namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurPayDetail extends Model
{
    use HasFactory;

    protected $table = 'purchase_payment_details';
    protected $fillable = [
        'payment_uid', 'purchase_mst_id', 'payment_amt', 'payment_date', 'payment_details', 'status', 'created_by', 'updated_by'
    ];

    public function purchaseMst()
    {
        return $this->belongsTo(PurchaseMst::class, 'purchase_mst_id');
    }
}
