<?php

namespace Modules\Purchase\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Catalog\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Consumer\Customer;
use App\Models\Order\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Modules\Purchase\Models\Purchase;
use Modules\Purchase\Models\PurchaseDetail;
// use App\Models\Purchase\PurchaseMst;
// use App\Models\Purchase\PurchaseChd;
use App\Models\Inventory\Stock\StockChd;
use App\Models\Inventory\Stock\StockMst;
use App\Models\Order\Payment;
use App\Models\Purchase\PurPayDetail;
use App\Models\Supplier\Supplier;
use Carbon\Carbon;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return 555;
        exit;
        $data['purchases'] = Purchase::all();
        return Inertia::render('Purchase/PurchaseLists', $data);
    }

    public function create()
    {
        // return 555; exit;
        $data['lastOrderNo'] = Order::orderBy('created_at', 'desc')->get()->value('order_no');
        $data['products'] = Product::get();
        $data['customers'] = Customer::all();
        // 
        // return $data;
        $data['supplierLists'] = Supplier::all();
        return Inertia::render('Purchase/PurchaseCreate', $data);
    }

    public function store(Request $request)
    {
        // request data from server
        $data = $request->all();
        $validated = $request->validate([
            'supplierId'                 => 'required|numeric|min:0',
            'purchaseDate'               => 'required|date',
            'subAmount'                  => 'required|numeric|min:0',
            'discountAmount'             => 'nullable|numeric|min:0',
            'vatAmount'                  => 'nullable|numeric|min:0',
            'shippingFee'                => 'nullable|numeric|min:0',
            'totalAmount'                => 'required|numeric|min:0',
            'purchaseDetails'            => 'required|array',
            'purchaseDetails.*.id'       => 'required|exists:products,id',   // product id
            'purchaseDetails.*.price'    => 'required|numeric|min:0',
            'purchaseDetails.*.quantity' => 'required|integer|min:1',
        ]);
        // db transaction
        try {
            // Start transaction
            DB::beginTransaction();
            $purchase = Purchase::savePurchase($validated);
            $purchaseId = $purchase->id;
            // dd($purchaseId);
            PurchaseDetail::savePurchaseDetails($validated, $purchaseId);
            if (isset($data['paymentMethods'])) {
                Payment::savePayment($data['paymentMethods'], purchaseId: $purchaseId);
            }

            DB::commit();
            // Session::flash('success', 'Purchase successfully!');
            echo json_encode(['status' => true, 'message' => 'Purchase successfully', 'purchaseNo' => $purchase->purchase_no], 200);
            // return redirect()->route('purchase.create');
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }

    public function list()
    {
        $data['purchases'] = PurchaseMst::all();
        return Inertia::render('Purchase/List', $data);
    }

    public function view($id)
    {
        $purchase = PurchaseMst::with(['purchaseChds.productVariantPrice.product', 'purPayDetails'])->find($id);

        $data['purchases'] = [
            'id' => $purchase->id,
            'purchase_uid' => $purchase->purchase_uid,
            'batch_no' => $purchase->batch_no,
            'purchase_date' => $purchase->purchase_date,
            'sub_total' => $purchase->sub_total,
            'discount_type' => $purchase->discount_type,
            'discount_amt' => $purchase->discount_amt,
            'VAT_type' => $purchase->VAT_type,
            'VAT_amt' => $purchase->VAT_amt,
            'grand_total' => $purchase->grand_total,
            'paid_amt' => $purchase->paid_amt,
            'change_amt' => $purchase->change_amt,
            'due_amt' => $purchase->due_amt,
            'store_id' => $purchase->store_id,
            'status' => $purchase->status,
            'created_by' => $purchase->created_by,
            'updated_by' => $purchase->updated_by,
            'created_at' => $purchase->created_at,
            'updated_at' => $purchase->updated_at,
            'supplier_details' => $purchase->supplier,
            'purchase_details' => $purchase->purchaseChds->map(function ($chd) {
                return [
                    'id' => $chd->id,
                    'purchase_mst_id' => $chd->purchase_mst_id,
                    'product_name' => $chd->product_name,
                    'product_v_id' => $chd->product_v_id,
                    'variant_name' => $chd->variant_name,
                    'price' => $chd->price,
                    'quantity' => $chd->quantity,
                    'total_price' => $chd->total_price,
                    'purchase_date' => $chd->purchase_date,
                    'status' => $chd->status,
                    'created_by' => $chd->created_by,
                    'updated_by' => $chd->updated_by,
                    'created_at' => $chd->created_at,
                    'updated_at' => $chd->updated_at,

                ];
            }),
            'payment_details' => $purchase->purPayDetails
        ];
        return Inertia::render('Purchase/View', $data);
    }
    public function edit($id)
    {
        $data['purchase'] = PurchaseMst::find($id);
        $data['products'] = Product::with('variantPrices')->get();
        $data['suppliers'] = Supplier::all();
        return Inertia::render('Purchase/Edit', $data);
    }
    public function test()
    {
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
