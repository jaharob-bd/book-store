<?php

namespace Modules\Purchase\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\ProductVariantPrice;
use App\Models\Order\Payment;
use App\Models\Supplier\Supplier;
use Illuminate\Support\Facades\Auth;

class Purchase extends Model
{
    use HasFactory;

    protected $table = 'purchases';
    protected $guarded = [];

    public static function savePurchase(array $data)
    {
        try {
            $insertArray = [
                'purchase_no'     => generateUniqueId('PUR'),
                'supplier_id'     => $data['supplierId'],
                'purchase_date'   => $data['purchaseDate'],
                'sub_amount'      => $data['subAmount'],
                'discount_amount' => $data['discountAmount'] ?? 0.00,
                'tax_amount'      => $data['vatAmount'] ?? 0.00,
                'shipping_fee'    => $data['shippingFee'] ?? 0.00,
                'status'          => 'Pending',
                'created_by'      => auth()->id(),
            ];
    
            $order = self::create($insertArray);
            // dd($order);
            return $order;
        } catch (\Exception $e) {
            dd('Save failed:', $e->getMessage());
        }
    }
    
    public function purchaseDetails()
    {
        return $this->hasMany(PurchaseDetail::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function productVariantPrice()
    {
        return $this->belongsTo(ProductVariantPrice::class, 'product_v_id');
    }
    // product name
    public function getProductNameAttribute()
    {
        return $this->productVariantPrice->product->name;
    }
    // product variant name
    public function getVariantNameAttribute()
    {
        return $this->productVariantPrice->variant_name;
    }
}
