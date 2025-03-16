<?php

namespace App\Models\Catalog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\AttributeValue;

class Attribute extends Model
{
    use HasFactory;

    protected $table = 'attributes';

    protected $fillable = [
        'name',
        'created_by',
        'updated_by',
    ];
    // attribute value
    public function attributeValues(){
        return $this->hasMany(AttributeValue::class,'attribute_id','id');
    }
}
