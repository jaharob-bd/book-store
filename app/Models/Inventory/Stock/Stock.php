<?php

namespace App\Models\Inventory\Stock;

use App\Models\Catalog\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Stock extends Model
{
    use HasFactory;

    protected $table = 'stocks';
    protected $fillable = ['product_id', 'quantity', 'last_updated', 'created_by', 'updated_by'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public static function saveStock($data)
    {
        foreach ($data['items'] as $stock) {
            $productId = $stock['product_id'];
            $quantityToPlus = $stock['quantity'];
            $currentTimestamp = Carbon::now();
            // update or insert stock mst record for the given product id and update the quantity accordingly
            Stock::updateOrInsert(
                ['product_id' => $productId],
                [
                    'quantity'     => \DB::raw("quantity + $quantityToPlus"),
                    'last_updated' => $currentTimestamp,
                    'created_by'   => $stock['created_by'] ?? auth()->id(),
                    'updated_by'   => $stock['updated_by'] ?? auth()->id(),
                    'created_at'   => $currentTimestamp,  // Only set when inserting a new record
                    'updated_at'   => $currentTimestamp
                ]
            );
        }
    }
    
}
