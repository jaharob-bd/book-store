<?php

namespace App\Models\Inventory\HRM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Position extends Model
{
    use HasFactory;

    protected $table = 'hr_positions';
    protected $fillable = ['name', 'created_by', 'updated_by'];

}
