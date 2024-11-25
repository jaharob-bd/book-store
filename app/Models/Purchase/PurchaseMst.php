<?php
namespace App\Models\Purchase;

use App\Models\Supplier\Supplier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseMst extends Model
{
    use HasFactory;

    protected $table = 'purchase_msts';
    protected $fillable = [
        'purchase_uid', 'batch_no', 'supplier_id', 'purchase_date', 'sub_total','discount_type', 'discount_amt','VAT_type','VAT_amt', 'status','grand_total', 'paid_amt', 'change_amt', 'due_amt', 'created_by', 'updated_by'
    ];

    public function purchaseChds()
    {
        return $this->hasMany(PurchaseChd::class, 'purchase_mst_id');
    }

    public function purPayDetails()
    {
        return $this->hasMany(PurPayDetail::class, 'purchase_mst_id');
    }
    // supplier information
    public function supplier(){
        return $this->belongsTo(Supplier::class,'supplier_id');
    }
}
