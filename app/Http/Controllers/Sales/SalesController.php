<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Catalog\Product;
use App\Models\Consumer\Customer;
use App\Models\Inventory\Stock\StockChd;
use App\Models\Inventory\Stock\StockMst;
use App\Models\Purchase\PurchaseMst;
use App\Models\Sales\SalPayDetail;
use App\Models\Supplier\Supplier;
use App\Models\Sales\SaleMst;
use App\Models\Sales\SaleChd;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class SalesController extends Controller
{
    function index()
    {
        // return SaleMst::all();
        $data['sales'] = SaleMst::with('customer')->orderBy('id', 'desc')->get();
        return Inertia::render('Sales/OrderLists', $data);
    }
    function create()
    {
        $data['products'] = Product::with('variantPrices')->get();
        // return $data['products'];
        $data['customers'] = Customer::all();
        return Inertia::render('Sales/OrderCreate', $data);
    }
    public function store(Request $request)
    {
        // request data from server
        $data = $request->all()[0];
        // db transaction
        try {
            // Start transaction
            DB::beginTransaction();
            // insert sale_msts table
            $saleMst = self::save_sale_msts($data);
            // insert sale_chds table
            self::save_sale_chds($data, $saleMst->id);
            // insert payment_msts table
            self::save_payment_msts($data, $saleMst->id);
            // insert stock_msts table
            self::save_stock_msts($data);
            // insert stock_chds table
            self::save_stock_chds($data, $saleMst->id);
            // Commit transaction
            DB::commit();
            Session::flash('success', 'sale successfully!');
            return redirect()->route('order.create');
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }
    public static function save_sale_msts($data)
    {
        // Now you can use $uniqueUid as needed
        $mstData = [
            'sale_uid'      => generateUniqueId('INV'),
            'customer_id'   => $data['customer_id'],
            'sale_date'     => Carbon::now(),
            'sub_total'     => $data['sub_total'],
            'discount_type' => $data['discount_type'],
            'discount_amt'  => $data['discount'],
            'VAT_type'      => $data['vat_type'],
            'VAT_amt'       => $data['vat'],
            'grand_total'   => $data['grand_total'],
            'paid_amt'      => $data['cash_in_hand'] ?? 0 + $data['online_banking'] ?? 0 + $data['card_in_bank'] ?? 0,
            'change_amt'    => $data['change_amount'],
            'due_amt'       => $data['due_amount'],
            'store_id'      => 1,
            'status'        => 'invoiced',
            'created_by'    => auth()->id(), // or some other valid user ID
            'updated_by'    => $data['updated_by'] ?? auth()->id(), // or some other valid user ID
        ];
        return SaleMst::create($mstData);
    }
    private static function save_sale_chds($data, $saleMstId)
    {
        foreach ($data['items'] as $chd) {
            SaleChd::create([
                'sale_mst_id'  => $saleMstId,
                'product_v_id' => $chd['variant_id'], // corrected the key
                'price'        => $chd['variant_price'], // corrected the key
                'quantity'     => $chd['quantity'],
                'sale_date'    => Carbon::now(),
                'status'       => 1,
                'created_by'   => auth()->id(), // or some other valid user ID
                'updated_by'   => $chd['updated_by'] ?? auth()->id(), // or some other valid user ID
            ]);
        }
    }
    // PAYMENT SALES
    private static function save_payment_msts($data, $saleMstId)
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
            SalPayDetail::create([
                'payment_uid'     => generateUniqueId('PAY'),
                'sale_mst_id'     => $saleMstId,
                'payment_amt'     => $paymentAmount,
                'payment_date'    => Carbon::now(),
                'payment_details' => json_encode($paymentDetails),
                'status'          => 1,
                'created_by'      => auth()->id(),
                'updated_by'      => auth()->id(),
            ]);
        }
    }
    private static function save_stock_msts($data)
    {
        foreach ($data['items'] as $stock) {
            $productId = $stock['variant_id'];
            $quantityToMinus = $stock['quantity'];
            $currentTimestamp = Carbon::now();

            StockMst::updateOrInsert(
                ['product_v_id' => $productId],
                [
                    'quantity'     => DB::raw("quantity - $quantityToMinus"),
                    'last_updated' => $currentTimestamp,
                    'created_by'   => $stock['created_by'] ?? auth()->id(),
                    'updated_by'   => $stock['updated_by'] ?? auth()->id(),
                    'created_at'   => $currentTimestamp,  // Only set when inserting a new record
                    'updated_at'   => $currentTimestamp
                ]
            );
        }
    }
    private static function save_stock_chds($data, $saleMstId = null)
    {
        foreach ($data['items'] as $chd) {
            StockChd::create([
                'product_v_id'    => $chd['variant_id'],
                'quantity'        => $chd['quantity'],
                'movement_type'   => 'Out',
                'movement_out_id' => $saleMstId,
                'created_by'      => $chd['created_by'] ?? auth()->id(),
                'updated_by'      => $chd['updated_by'] ?? auth()->id(),
            ]);
        }
    }
    public function list()
    {
        $data['sales'] = SaleMst::all();
        return Inertia::render('sale/List', $data);
    }

    public function view($id)
    {
        $sale = SaleMst::with(['saleChds.productVariantPrice.product', 'SalPayDetails'])->find($id);
        $data['sales'] = [
            'id' => $sale->id,
            'sale_uid' => $sale->sale_uid,
            'batch_no' => $sale->batch_no,
            'sale_date' => $sale->sale_date,
            'sub_total' => $sale->sub_total,
            'discount_type' => $sale->discount_type,
            'discount_amt' => $sale->discount_amt,
            'VAT_type' => $sale->VAT_type,
            'VAT_amt' => $sale->VAT_amt,
            'grand_total' => $sale->grand_total,
            'paid_amt' => $sale->paid_amt,
            'change_amt' => $sale->change_amt,
            'due_amt' => $sale->due_amt,
            'store_id' => $sale->store_id,
            'status' => $sale->status,
            'created_by' => $sale->created_by,
            'updated_by' => $sale->updated_by,
            'created_at' => $sale->created_at,
            'updated_at' => $sale->updated_at,
            'supplier_details' => $sale->supplier,
            'sale_details' => $sale->saleChds->map(function ($chd) {
                return [
                    'id' => $chd->id,
                    'sale_mst_id' => $chd->sale_mst_id,
                    'product_name' => $chd->product_name,
                    'product_v_id' => $chd->product_v_id,
                    'variant_name' => $chd->variant_name,
                    'price' => $chd->price,
                    'quantity' => $chd->quantity,
                    'total_price' => $chd->total_price,
                    'sale_date' => $chd->sale_date,
                    'status' => $chd->status,
                    'created_by' => $chd->created_by,
                    'updated_by' => $chd->updated_by,
                    'created_at' => $chd->created_at,
                    'updated_at' => $chd->updated_at,

                ];
            }),
            'payment_details' => $sale->SalPayDetails
        ];
        return Inertia::render('sale/View', $data);
        // return response()->json($data['sales']);
    }
    public function edit($id)
    {
        $data['sale'] = SaleMst::find($id);
        $data['products'] = Product::with('variantPrices')->get();
        $data['suppliers'] = Supplier::all();
        return Inertia::render('sale/Edit', $data);
    }

    // view 
    function show($id)
    {
        $sale = SaleMst::with(['saleChds.productVariantPrice.product', 'salPayDetails'])->find($id);

        $data['sales'] = [
            'id' => $sale->id,
            'sale_uid' => $sale->sale_uid,
            'sale_date' => $sale->sale_date,
            'sub_total' => $sale->sub_total,
            'discount_type' => $sale->discount_type,
            'discount_amt' => $sale->discount_amt,
            'VAT_type' => $sale->VAT_type,
            'VAT_amt' => $sale->VAT_amt,
            'grand_total' => $sale->grand_total,
            'paid_amt' => $sale->paid_amt,
            'change_amt' => $sale->change_amt,
            'due_amt' => $sale->due_amt,
            'store_id' => $sale->store_id,
            'status' => $sale->status,
            'created_by' => $sale->created_by,
            'updated_by' => $sale->updated_by,
            'created_at' => $sale->created_at,
            'updated_at' => $sale->updated_at,
            'customer_details' => [
                'name' => $sale->customer->name,
                'email' => $sale->customer->email,
                'phone' => $sale->customer->phone,
                'created_at' => $sale->customer->created_at,
                'customer_group_name' => $sale->customer->group ? $sale->customer->group->name : '',
            ],
            'sale_details' => $sale->saleChds->map(function ($chd) {
                return [
                    'id' => $chd->id,
                    'sale_mst_id' => $chd->sale_mst_id,
                    'product_name' => $chd->product_name,
                    'product_v_id' => $chd->product_v_id,
                    'variant_name' => $chd->variant_name,
                    'price' => $chd->price,
                    'quantity' => $chd->quantity,
                    'total_price' => $chd->total_price,
                    'sale_date' => $chd->sale_date,
                    'status' => $chd->status,
                    'created_by' => $chd->created_by,
                    'updated_by' => $chd->updated_by,
                    'created_at' => $chd->created_at,
                    'updated_at' => $chd->updated_at,
                ];
            }),
            'payment_details' => $sale->SalPayDetails
        ];
        return Inertia::render('Sales/OrderView', $data);
    }
    function canceled(Request $request)
    {
        $data = $request->all();
        // dd($data);
        try {
            DB::beginTransaction();
            // update saleMst with requested
            $updateData =  [
                'status' => 'canceled',
                'canceled_remarks' => $data['remarks'],
                'canceled_at' => Carbon::now(),
                'canceled_by' => Auth::id(),
                'updated_at' => Carbon::now() // explicitly setting the updated_at timestamp
            ];
            // dd($updateData);
            $updateMst = SaleMst::where('id', $data['id'])->update($updateData);
            // dd($updateMst);
            // update stockMst with increased quantity
            foreach ($data['items'] as $item) {
                StockMst::where('product_v_id', $item['product_v_id'])->increment('quantity', $item['quantity']);
            }
            // create stockChd with negative quantity
            foreach ($data['items'] as $item) {
                StockChd::create([
                    'product_v_id' => $item['product_v_id'],
                    'quantity' => $item['quantity'],
                    'movement_type' => 'Sales Return',
                    'movement_in_id' => $item['sale_mst_id'],
                ]);
            }
            // create saleReturn with requested
            // SaleReturn::create([
            //    'sale_mst_id' => $data['sale_mst_id'],
            //     'customer_id' => $data['customer_id'],
            //     'total_price' => $data['total_price'],
            //     'created_by' => auth()->id(),
            //     'updated_by' => auth()->id(),
            // ]);
            // send mail to customer
            // send mail to admin

            DB::commit();
            Session::flash('success', 'Order Cancel successfully!');
            return redirect()->route('order.view', $data['id']);
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }
}
