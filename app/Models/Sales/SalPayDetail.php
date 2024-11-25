<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalPayDetail extends Model
{
    use HasFactory;

    protected $table = 'sale_payment_details';
    protected $fillable = [
        'payment_uid', 'sale_mst_id', 'payment_amt', 'payment_date', 'payment_details', 'status', 'created_by', 'updated_by'
    ];

    public function saleMst()
    {
        return $this->belongsTo(SaleMst::class, 'sale_mst_id');
    }
}
