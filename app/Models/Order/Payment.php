<?php

namespace App\Models\Order;

use App\Models\Order\Order;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Dflydev\DotAccessData\Data;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_id',
        'order_id',
        'purchase_id',
        'payment_date',
        'payment_method',
        'amount',
        'bank_name',
        'account_number',
        'mobile_number',
        'card_number',
        'card_expiry_date',
        'card_cvv',
        'mobile_number',
        'status',
        'created_by',
        'updated_by'
    ];

    public static function paymentUpdate($data)
    {
        if ($data['status'] == 'Payment') {
            $totalAmount = $data['totalAmount'];
            $previousPaidAmount = Payment::where('order_id', $data['id'])->sum('amount');
            $totalPaidAmout = $previousPaidAmount + $data['amount'];
            if ($totalAmount < $totalPaidAmout) {
                throw new \Exception('You payment extra amount from your order amount.');
            }
            // create new payment object
            $payment                   = new Payment();
            $payment->order_id         = $data['id'];
            $payment->payment_date     = Carbon::now();
            $payment->transaction_id   = $data['paymentMethod'] == 'Mobile' ? $data['transactionId'] : date('YmdHis');
            $payment->payment_method   = $data['paymentMethod'];
            $payment->amount           = $data['amount'];
            $payment->bank_name        = $data['paymentMethod'] == 'Bank' ? $data['bankName'] : '';
            $payment->account_number   = $data['paymentMethod'] == 'Bank' ? $data['accountNumber'] : '';
            $payment->mobile_number    = $data['mobileNumber'];
            $payment->card_number      = $data['paymentMethod'] == 'Card' ? $data['cardNumber'] : '';
            $payment->card_expiry_date = $data['paymentMethod'] == 'Card' ? $data['cardExpiryDate'] : null;
            $payment->card_cvv         = $data['paymentMethod'] == 'Card' ? $data['cardCVV'] : '';
            $payment->status           = 1;
            $payment->created_by       = auth()->id();
            $insert = $payment->save();
            if ($insert) {
                $updateData = [
                    'paid_amount' => $totalPaidAmout,
                ];
                Order::where('id', $data['id'])->update($updateData);
            }
        }
        return true;
    }
    public static function paymentSave1($paymentMethods, $order_id)
    {
        $payments = array_map(function ($key, $value) {
            return [$key => ($value)];
        }, array_keys($paymentMethods), $paymentMethods);
        $totalPaidAmout = array_sum(array_merge(...$payments));
        // dd($totalPaidAmout);
        // dd(array_merge(...$payments));
        foreach (array_merge(...$payments) as $method => $amount) {
            $payment                   = new Payment();
            $payment->order_id         = $order_id;
            $payment->payment_date     = Carbon::now();
            $payment->transaction_id   = date('YmdHis');
            $payment->payment_method   = ucfirst($method);
            $payment->amount           = old($method, $amount);
            $payment->status           = 1;
            $payment->created_by       = auth()->id();
            $insert = $payment->save();
        }
        $updateOrder = false;
        if ($insert) {
            $updateData = [
                'paid_amount' => $totalPaidAmout,
            ];
            $updateOrder = Order::where('id', $order_id)->update($updateData);
        }
        return $updateOrder ? true : false;
    }

    public static function savePayment(array $paymentMethods, $orderId = null, $purchaseId = null): bool
    {
        try {
            DB::beginTransaction();
    
            if (is_null($orderId) && is_null($purchaseId)) {
                throw new \Exception('Either order_id or purchase_id must be provided.');
            }
    
            $totalPaidAmount = array_sum($paymentMethods);
            $paymentsData = [];
    
            foreach ($paymentMethods as $method => $amount) {
                if ($amount > 0) {
                    $paymentsData[] = [
                        'order_id'       => $orderId,
                        'purchase_id'    => $purchaseId,
                        'payment_date'   => now(),
                        'transaction_id' => now()->format('YmdHis'),
                        'payment_method' => ucfirst($method),
                        'amount'         => $amount,
                        'status'         => 1,
                        'created_by'     => auth()->id(),
                        'created_at'     => now(),
                        'updated_at'     => now(),
                    ];
                }
            }
    
            if (count($paymentsData) > 0) {
                Payment::insert($paymentsData);
    
                if ($order_id) {
                    Order::where('id', $order_id)->increment('paid_amount', $totalPaidAmount);
                } elseif ($purchase_id) {
                    Purchase::where('id', $purchase_id)->increment('paid_amount', $totalPaidAmount);
                }
            }
    
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Payment save failed: ' . $e->getMessage());
            return false;
        }
    }
    
}
