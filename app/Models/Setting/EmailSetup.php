<?php

namespace App\Models\Setting;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailSetup extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'sa_email_setup';

    // Specify the columns that are mass assignable
    protected $fillable = [
        'cc',
        'bcc',
        'created_by',
        'updated_by'
    ];

    // Define any relationships (if necessary)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}