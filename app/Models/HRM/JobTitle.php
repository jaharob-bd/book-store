<?php

namespace App\Models\HRM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class JobTitle extends Model
{
    use HasFactory;

    protected $table = 'hr_job_titles';
    protected $fillable = ['title', 'created_by', 'updated_by'];

}
