<?php

namespace App\Models\Setting;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $table = 'sa_organizations'; // Explicitly define the table name

    protected $fillable = [
        'org_name',
        'parent_id',
        'org_type_id',
        'slogan',
        'abbr',
        'dscp',
        'estb_dt',
        'addr1',
        'addr2',
        'zip_code',
        'tel',
        'phone',
        'fax',
        'email',
        'website',
        'logo',
        'user_type',
        'active_status'
    ];

    protected $dates = ['estb_dt', 'created_at', 'updated_at'];

    /**
     * Relationship: Parent Organization
     */
    public function parent()
    {
        return $this->belongsTo(Organization::class, 'parent_id');
    }

    /**
     * Relationship: Child Organizations
     */
    public function children()
    {
        return $this->hasMany(Organization::class, 'parent_id');
    }
}
