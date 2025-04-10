<?php

namespace App\Models\HRM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\HRM\Department;
use App\Models\HRM\JobTitle;
use App\Models\HRM\Position;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'hr_employees';
    protected $fillable = ['full_name', 'email', 'nationality', 'department_id', 'job_title_id', 'position_id', 'mobile_number', 'gender', 'blood_group', 'date_of_birth', 'marital_status', 'date_of_joining', 'created_by', 'updated_by'];

    // relationship
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function jobtitle()
    {
        return $this->belongsTo(JobTitle::class);
    }
    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}
