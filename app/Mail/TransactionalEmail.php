<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class TransactionalEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $content;
    public $ccArray;
    public $bccArray;

    public function __construct($content, $ccArray, $bccArray)
    {
        // dd($content, 'abdullah');
        $this->content = $content;
        $this->ccArray = $ccArray;
        $this->bccArray = $bccArray;
    }

    public function build()
    {
        return $this->view('emails.transactional')
            ->with(['content' => $this->content])
            ->attach(storage_path('app/public/invoice.pdf'), [
                'as' => 'YourAttachment.pdf',
                'mime' => 'application/pdf',
            ])
            ->cc($this->ccArray)
            ->bcc($this->bccArray);
    }
}
