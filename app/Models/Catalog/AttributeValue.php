<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    use HasFactory;

    protected $table = 'attribute_values';

    protected $fillable = [
        'attribute_id',
        'value',
        'created_by',
        'updated_by',
    ];

    public function attributeValues()
    {
        return $this->hasOne(AttributeValue::class, 'id', 'attribute_value_id');
    }
}
