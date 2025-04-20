<?php
namespace Modules\HRM\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Department extends Model
{
    use HasFactory;

    protected $table = 'hr_departments';
    protected $fillable = ['name', 'created_by', 'updated_by'];

}
