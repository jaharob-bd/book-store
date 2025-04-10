<?php

namespace App\Models\HRM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
// position 


class Position extends Model
{
    use HasFactory;

    protected $table = 'hr_positions';
    protected $fillable = ['name', 'created_by', 'updated_by'];

}
