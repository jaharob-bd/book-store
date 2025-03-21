<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use App\Models\Inventory\Stock\StockMovement;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session;
use App\Models\Purchase\PurchaseMst;
use App\Models\Purchase\PurchaseChd;
use App\Models\Purchase\StockMst;
use App\Models\Purchase\StockChd;
use App\Models\Inventory\Stock\Stock;
use App\Models\Purchase\PurPayDetail;
use App\Models\Supplier\Supplier;
use Carbon\Carbon;
use Dflydev\DotAccessData\Data;
use Illuminate\Support\Str;


class StockController extends Controller
{
    public function index()
    {
        $stocks = Stock::with('product')->get();
        $data['stocks'] = $stocks->map(function ($purchase) {
            return [
                'id' => $purchase->id,
                'product_id' => $purchase->product_id,
                'product_name' => $purchase->product->name,
                'quantity' => $purchase->quantity,
                'last_updated' => $purchase->last_updated,
                'created_by' => $purchase->created_by,
                'updated_by' => $purchase->updated_by,
                'created_at' => $purchase->created_at,
                'updated_at' => $purchase->updated_at,
            ];
        });
        // return $data;
        return Inertia::render('Inventory/Stock/Stock', $data);
    }

    public function getStock()
    {
        // dd(777);
        $stocks = Stock::with('product')->get();
        $data['stocks'] = $stocks->map(function ($purchase) {
            return [
                'id' => $purchase->id,
                'product_id' => $purchase->product_id,
                'product_name' => $purchase->product->name,
                'quantity' => $purchase->quantity,
                'last_updated' => $purchase->last_updated,
                'created_by' => $purchase->created_by,
                'updated_by' => $purchase->updated_by,
                'created_at' => $purchase->created_at,
                'updated_at' => $purchase->updated_at,
            ];
        });
        return response()->json($data['stocks']);
    }

    public function stockMovement()
    {
        $stocks = StockMovement::with('product')->get();
        // return response()->json($stocks);
        $data['stock_movements'] = $stocks->map(function ($purchase) {
            return [
                'id'            => $purchase->id,
                'product_id'    => $purchase->product_id,
                'product_name'  => $purchase->product->name,
                'quantity'      => $purchase->quantity,
                'movement_type' => $purchase->type,
                'created_by'    => $purchase->created_by,
                'updated_by'    => $purchase->updated_by,
                'created_at'    => $purchase->created_at,
                'updated_at'    => $purchase->updated_at,
            ];
        });
        return Inertia::render('Inventory/Stock/StockMovement', $data);
    }
    public function getStockMovement()
    {
        $stocks = StockMovement::with('product')->get();
        $data['stock_movements'] = $stocks->map(function ($purchase) {
            return [
                'id'            => $purchase->id,
                'product_id'    => $purchase->product_id,
                'product_name'  => $purchase->product->name,
                'quantity'      => $purchase->quantity,
                'movement_type' => $purchase->type,
                'created_by'    => $purchase->created_by,
                'updated_by'    => $purchase->updated_by,
                'created_at'    => $purchase->created_at,
                'updated_at'    => $purchase->updated_at,
            ];
        });
        return response()->json($data['stock_movements']);
    }
}
