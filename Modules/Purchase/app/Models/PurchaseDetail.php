<?php

namespace Modules\Purchase\Models;

use App\Models\Catalog\Product;
use App\Models\Supplier\Supplier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetail extends Model
{
    use HasFactory;

    protected $table = 'purchase_details';
    protected $guarded = [];

    public static function savePurchaseDetails(array $data, int $purchaseId): bool
    {
        if (empty($data['purchaseDetails']) || !is_array($data['purchaseDetails'])) {
            \Log::warning('Purchase details are missing or invalid.');
            return false;
        }

        $insertData = [];
        foreach ($data['purchaseDetails'] as $detail) {
            if (!isset($detail['id'], $detail['quantity'], $detail['price'])) {
                \Log::warning('Skipping invalid detail: ' . json_encode($detail));
                continue;
            }

            $insertData[] = [
                'purchase_id' => $purchaseId,
                'product_id'  => $detail['id'],
                'quantity'    => $detail['quantity'],
                'price'       => $detail['price'],
                'created_by'  => auth()->id(),
                'created_at'  => now(),
                'updated_at'  => now(),
            ];
        }
        if (!empty($insertData)) {
            try {
                return self::insert($insertData);
            } catch (\Exception $e) {
                \Log::error('Purchase details insert failed: ' . $e->getMessage());
                return false;
            }
        }

        \Log::info('No valid purchase details found to insert.');
        return false;
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}
