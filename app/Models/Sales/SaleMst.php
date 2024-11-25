<?php
namespace App\Models\Sales;

use App\Models\Consumer\Customer;
use App\Models\Supplier\Supplier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleMst extends Model
{
    use HasFactory;

    protected $table = 'sale_msts';
    protected $fillable = [
        'sale_uid', 'batch_no', 'customer_id', 'sale_date', 'sub_total','discount_type', 'discount_amt','VAT_type','VAT_amt', 'status','grand_total', 'paid_amt', 'change_amt', 'due_amt', 'created_by', 'updated_by', 'canceled_remarks', 'canceled_by', 'canceled_at'
    ];

    public function saleChds()
    {
        return $this->hasMany(SaleChd::class, 'sale_mst_id');
    }

    public function salPayDetails()
    {
        return $this->hasMany(salPayDetail::class, 'sale_mst_id');
    }
    
    // supplier information
    public function customer(){
        return $this->belongsTo(Customer::class,'customer_id');
    }
}
