<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $title
 * @property string $description
 * @property string $url
 */
class Ad extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'url'
    ];
}
