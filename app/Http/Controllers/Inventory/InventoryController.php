<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
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
use App\Models\Purchase\PurPayDetail;
use App\Models\Supplier\Supplier;
use Carbon\Carbon;
use Dflydev\DotAccessData\Data;
use Illuminate\Support\Str;


class InventoryController extends Controller
{
    public function index()
    {
        $data['products'] = Product::with('variantPrices')->get();
        $data['suppliers'] = Supplier::all();
        return Inertia::render('Inventory/Index', $data);
    }

    public function store(Request $request)
    {
        // request data from server
        $data = $request->all()[0];
        // dd($data);
        // db transaction
        try {
            // Start transaction
            DB::beginTransaction();
            // insert purchase_msts table
            $purchaseMst = $this->save_purchase_msts($data);
            // insert purchase_chds table
            $this->save_purchase_chds($data, $purchaseMst->id);
            // insert payment_msts table
            $this->save_payment_msts($data, $purchaseMst->id);
            // insert stock_msts table
            $this->save_stock_msts($data);
            // insert stock_chds table
            $this->save_stock_chds($data, $purchaseMst->id);
            // Commit transaction
            DB::commit();
            Session::flash('success', 'Purchase successfully!');
            return redirect()->route('purchases');
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }

    public function save_purchase_msts($data)
    {
        // Now you can use $uniqueUid as needed
        return PurchaseMst::create([
            'purchase_uid'  => generateUniqueId('PUR'),
            'batch_no'      => $data['batch_no'],
            'supplier_id'   => $data['supplier_id'],
            'purchase_date' => Carbon::now(),
            'sub_total'     => $data['sub_total'],
            'discount_type' => $data['discount_type'],
            'discount_amt'  => $data['discount'],
            'VAT_type'      => $data['vat_type'],
            'VAT_amt'       => $data['vat'],
            'grand_total'   => $data['grand_total'],
            'paid_amt'      => $data['cash_in_hand'] ?? 0 + $data['online_banking'] ?? 0 + $data['card_in_bank'] ?? 0,
            'change_amt'    => $data['change_amount'],
            'due_amt'       => $data['due_amount'],
            'store_id'      => $data['store_id'],
            'status'        => 'ordered',
            'created_by'    => auth()->id(), // or some other valid user ID
            'updated_by'    => $data['updated_by'] ?? auth()->id(), // or some other valid user ID
        ]);
    }

    private function save_purchase_chds($data, $purchaseMstId)
    {
        foreach ($data['items'] as $chd) {
            PurchaseChd::create([
                'purchase_mst_id' => $purchaseMstId,
                'product_v_id'    => $chd['variant_id'], // corrected the key
                'price'           => $chd['variant_price'], // corrected the key
                'quantity'        => $chd['quantity'],
                'purchase_date'   => Carbon::now(),
                'status'          => 1,
                'created_by'      => auth()->id(), // or some other valid user ID
                'updated_by'      => $chd['updated_by'] ?? auth()->id(), // or some other valid user ID
            ]);
        }
    }

    private function save_stock_msts($data)
    {
        foreach ($data['items'] as $stock) {
            $productId = $stock['variant_id'];
            $quantityToAdd = $stock['quantity'];
            $currentTimestamp = Carbon::now();

            StockMst::updateOrInsert(
                ['product_v_id' => $productId],
                [
                    'quantity'     => \DB::raw("quantity + $quantityToAdd"),
                    'last_updated' => $currentTimestamp,
                    'created_by'   => $stock['created_by'] ?? auth()->id(),
                    'updated_by'   => $stock['updated_by'] ?? auth()->id(),
                    'created_at'   => $currentTimestamp,  // Only set when inserting a new record
                    'updated_at'   => $currentTimestamp
                ]
            );
        }
    }

    private function save_stock_chds($data, $purchaseMstId = null)
    {
        foreach ($data['items'] as $chd) {
            StockChd::create([
                'product_v_id'    => $chd['variant_id'],
                'quantity'        => $chd['quantity'],
                'movement_type'   => 'addition',
                'movement_add_id' => $purchaseMstId,
                'created_by'      => $chd['created_by'] ?? auth()->id(),
                'updated_by'      => $chd['updated_by'] ?? auth()->id(),
            ]);
        }
    }

    private function save_payment_msts($data, $purchaseMstId)
    {
        // Payment method keys
        $paymentMethods = [
            'cash_in_hand' => 1,
            'card_in_bank' => 2,
            'online_banking' => 3
        ];

        $paymentDetails = [];
        $paymentAmount = 0;

        foreach ($paymentMethods as $key => $methodId) {
            if (isset($data[$key]) && $data[$key] > 0) {
                $paymentDetails[] = [
                    'payment_method_id' => $methodId,
                    'amount' => $data[$key],
                    'trxID' => $data[$key . '_trxID'] ?? '' // Assuming transaction ID keys are like 'cash_in_hand_trxID'
                ];
                $paymentAmount += $data[$key];
            }
        }
        if ($paymentAmount > 0) {
            // Insert into payment_details table
            PurPayDetail::create([
                'payment_uid'     => generateUniqueId('PUR'),
                'purchase_mst_id' => $purchaseMstId,
                'payment_amt'     => $paymentAmount,
                'payment_date'    => Carbon::now(),
                'payment_details' => json_encode($paymentDetails),
                'status'          => 1,
                'created_by'      => auth()->id(),
                'updated_by'      => auth()->id(),
            ]);
        }
    }
    public function view()
    {
        $data['purchases'] = PurchaseMst::all();
        return Inertia::render('Purchase/List', $data);
    }

    public function edit($id){
        $data['purchase'] = PurchaseMst::find($id);
        $data['products'] = Product::with('variantPrices')->get();
        $data['suppliers'] = Supplier::all();
        return Inertia::render('Purchase/Edit', $data);
    }
    public function test(){
        $uniqueId = generateUniqueId('PUR');
        dd($uniqueId);
        // Use the $uniqueId as needed
        // $prefix = 'PUR-';
        // $dateTime = Carbon::now()->format('ymdHis'); // Format: YYMMDDHHMMSS

        $prefix = 'PUR-';
        $microtime = microtime(true);
        $dateTime = Carbon::createFromTimestamp($microtime)->format('dmyHisv'); // Format: YYMMDDHHMMSSu
        return substr($prefix . $dateTime, 0, 20);
    }
}
