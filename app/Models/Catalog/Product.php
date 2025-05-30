<?php

namespace App\Models\Catalog;

use App\Models\Inventory\Stock\Stock;
use App\Models\Catalog\ProductTag;
use App\Models\Catalog\Tag;
use App\Models\Catalog\Attribute;
use App\Models\Catalog\AttributeValue;
use App\Models\Catalog\ProductSpecification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'short_description',
        'status',
        'new_product',
        'featured',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'product_url',
        'product_type',
        'regular_price',
        'sale_price',
        'mrp_price',
        'tax_status',
        'tax_class',
        'tax_included',
        'expiry_date',
        'sku',
        'stock_quantity',
        'manage_stock',
        'stock_status',
        'published_at',
        'visible_individually'
    ];

    // update product 
    public static function updateProduct(array $data, int $id)
    {
        $product = Product::find($id);

        if ($product) {
            // Update main fields
            $product->name = $data['name'];
            $product->description = $data['description'];
            $product->short_description = $data['shortDescription'];
            $product->status = 1; // $data['status'];
            $product->new_product = $data['newProduct'];
            $product->featured = $data['featured'];

            // Update meta fields
            $product->meta_title = $data['meta']['metaTitle'];
            $product->meta_description = $data['meta']['metaDescription'];
            $product->meta_keywords = $data['meta']['metaKeywords'];

            // Update general fields
            $product->product_url = $data['general']['productUrl'];
            $product->product_type = 'physical'; // $data['general']['productType'];
            $product->regular_price = $data['general']['regularPrice'] ?? 0;
            $product->sale_price = $data['general']['salePrice'] ?? 0;
            $product->mrp_price = $data['general']['mrpPrice'] ?? 0;

            $product->tax_status = $data['general']['taxStatus'];
            $product->tax_class = $data['general']['taxClass'];
            $product->tax_included = $data['general']['taxIncluded'] ?? 0;
            $product->expiry_date = date('Y-m-d', strtotime($data['general']['expiryDate']));
            // Update inventory fields
            $product->sku = $data['inventory']['sku'];
            $product->stock_quantity = $data['inventory']['stockQuantity'] ?? 0;
            $product->manage_stock = $data['inventory']['manageStock'] ?? 0;
            $product->stock_status = $data['inventory']['stockStatus'];

            // Update publish fields
            $product->published_at         = date('Y-m-d', strtotime($data['publish']['publishedAt'] ?? date('Y-m-d')));
            $product->visible_individually = $data['publish']['visibleIndividually'] ?? 0;
            $product->published_status     = $data['publish']['publishedStatus'] ?? 0;

            // Save the updated product
            $product->save();

            return ["status" => true, "message" => "Product updated successfully"];
        } else {
            return ["status" => false, "message" => "Product not found"];
        }
    }
    public function stock()
    {
        return $this->hasOne(Stock::class, 'product_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    // category name
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories', 'product_id', 'category_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags', 'product_id', 'tag_id');
        // ->withPivot('tag_id') // If you want the tag_id in the pivot table
        // ->addSelect(['tags.name as tag_name']) // Adding the name from the tags table
        // ->withTimestamps(); // Optionally, include timestamps if needed
    }


    // specifications 
    public function specifications()
    {
        return $this->belongsToMany(Specification::class, 'product_specifications', 'product_id', 'specification_id')->withPivot('value');
    }

    // attributes
    // public function attributes(){
    //     return $this->belongsToMany(Attribute::class, 'product_attributes', 'product_id', 'attribute_value_id');
    // }

    // public function attributes()
    // {
    //     return $this->belongsToMany(Attribute::class, 'product_attributes', 'product_id', 'attribute_value_id')
    //         ->withPivot('attribute_value_id')
    //         ->join('attribute_values', 'attribute_values.id', '=', 'product_attributes.attribute_value_id')
    //         ->addSelect(['attribute_values.value as attribute_value']);
    // }

    public function attributes()
    {
        return $this->belongsToMany(AttributeValue::class, 'product_attributes', 'product_id', 'attribute_value_id')
            ->join('attributes', 'attributes.id', '=', 'attribute_values.attribute_id')
            ->addSelect([
                'attributes.name as attribute_name',
                'attribute_values.value as pivot_attribute_value' // Rename to avoid conflicts
            ])
            ->withPivot(['product_id', 'attribute_value_id'])
            ->as('pivot'); // Ensures pivot fields are correctly grouped
    }

    public function variantPrices()
    {
        return $this->hasMany(ProductVariantPrice::class, 'product_id');
    }

    public function groupPrices()
    {
        return $this->hasMany(ProductGroupPrice::class, 'product_id');
    }
}
