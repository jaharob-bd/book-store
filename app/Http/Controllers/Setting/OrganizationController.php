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

class OrganizationController extends Controller
{
    public function index() {

    }
}
