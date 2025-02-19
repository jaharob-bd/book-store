<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use App\Mail\TransactionalEmail;
use Inertia\Inertia;
// db connection
use Illuminate\Support\Facades\DB;
use App\Models\Setting\EmailSetup;
use Exception;

class EmailController extends Controller
{
    public function emailSetup()
    {
        $emails = DB::table('sa_email_setup')->first();
        // Convert the comma-separated string of emails into an array
        $ccEmails = explode(',', $emails->cc);
        $bccEmails = explode(',', $emails->bcc);

        // Map the emails into the required format
        $data['cc'] = array_map(function ($email) {
            return ['value' => $email, 'label' => $email];
        }, $ccEmails);

        $data['bcc'] = array_map(function ($email) {
            return ['value' => $email, 'label' => $email];
        }, $bccEmails);

        return Inertia::render('Setting/SendEmailForm', $data);
    }
    public function storeEmail(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'cc' => 'nullable',
            'bcc' => 'nullable',
        ]);
        // dd($request->all());
        // Start a database transaction
        DB::beginTransaction();

        try {
            // Retrieve existing setup or create a new instance
            $emailSetup = EmailSetup::firstOrNew();
            // dd($emailSetup);

            // Update the data
            $emailSetup->cc = $validatedData['cc'];
            $emailSetup->bcc = $validatedData['bcc'];

            // Save the changes
            $emailSetup->save();

            // Commit the transaction
            DB::commit();

            // Redirect back with success message
            return redirect()->back()->with('success', $emailSetup->wasRecentlyCreated
                ? 'Email setup created successfully!'
                : 'Email setup updated successfully!');
        } catch (\Exception $e) {
            // Rollback the transaction on failure
            DB::rollBack();

            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to save email setup: ' . $e->getMessage());
        }
    }
    public function sendEmailSetup(Request $request)
    {
        // dd($request->all());
        $to = $request->input('clientEmail');
        $cc = $request->input('cc');
        $bcc = $request->input('bcc');
        $content = $request->input('content'); // Get the content from the request
        $exit = DB::table('sa_email_setup')->first();

        if ($content) {
            // make array of email addresses
            $ccArray = explode(',', $exit->cc);
            $bccArray = explode(',', $exit->bcc);

            // Send the email
            // Mail::to('mdalibd511@gmail.com')
            //     ->cc(['mdalibd511@gmail.com', 'maabdullah511@gmail.com'])
            //     ->bcc(['khokanbdtask@gmail.com', 'maabdullahbd511@gmail.com'])
            //     ->send(new TransactionalEmail($content));

            // Send the email with dynamic cc and bcc
            Mail::to($to)
                ->cc($ccArray)
                ->bcc($bccArray)
                ->send(new TransactionalEmail($content, $ccArray, $bccArray));

            return redirect()->back()->with('success', 'Email sent successfully!');
        } else {
            $data = [
                'cc' => $cc,
                'bcc' => $bcc,
            ];
            // get data email setup
            if ($exit) {
                // update sa_email_setup table
                DB::table('sa_email_setup')
                    ->where('id', $exit->id)
                    ->update($data);
                return redirect()->back()->with('success', 'Email setup updated successfully!');
            } else {
                // insert sa_email_setup table
                DB::table('sa_email_setup')->insert($data);
                return redirect()->back()->with('success', 'Email setup created successfully!');
            }
        }
    }
    public function sendEmail(Request $request)
    {
        try {
            // Validate the recipient email
            $to = filter_var(trim($request->input('clientEmail')), FILTER_VALIDATE_EMAIL);
            if (!$to) {
                return redirect()->back()->with('failed', 'Invalid client email address!');
            }

            // Fetch email setup data
            $emailSetup = DB::table('sa_email_setup')->first();

            // Check if email setup exists
            if (!$emailSetup) {
                return redirect()->back()->with('failed', 'Email setup not found!');
            }

            // Ensure cc and bcc values are not null before exploding
            $ccEmails = isset($emailSetup->cc) ? explode(',', $emailSetup->cc) : [];
            $bccEmails = isset($emailSetup->bcc) ? explode(',', $emailSetup->bcc) : [];

            // Remove empty values and validate emails
            $ccArray = $this->filterValidEmails($ccEmails);
            $bccArray = $this->filterValidEmails($bccEmails);

            // Email Content
            $content = 'This is the email content. Modify as needed.';

            // Send the email
            Mail::to($to)
                ->cc($ccArray)
                ->bcc($bccArray)
                ->send(new TransactionalEmail($content, $ccArray, $bccArray));

            return redirect()->back()->with('success', 'Email sent successfully!');
        } catch (Exception $e) {
            \Log::error('Email Sending Error: ' . $e->getMessage());
            return redirect()->back()->with('failed', 'Failed to send email. Please try again.');
        }
    }

    /**
     * Helper function to filter valid email addresses
     */
    private function filterValidEmails($emails)
    {
        return array_filter(array_map(
            function ($email) {
                $email = trim($email);
                return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
            },
            is_array($emails) ? $emails : [] // Ensure it's an array
        ));
    }
}
