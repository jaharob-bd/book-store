<?php

namespace App\Models\Order;

use App\Models\Order\Order;
use Carbon\Carbon;
use Dflydev\DotAccessData\Data;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_id',
        'order_id',
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
            $payment->transaction_id   = '55555555';
            $payment->payment_method   = $data['paymentMethod'];
            $payment->amount           = $data['amount'];
            $payment->bank_name        = $data['bankName'];
            $payment->account_number   = $data['accountNumber'];
            $payment->mobile_number    = $data['mobileNumber'];
            $payment->card_number      = $data['cardNumber'];
            $payment->card_expiry_date = $data['cardExpiryDate'];
            $payment->card_cvv         = $data['cardCVV'];
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
}
