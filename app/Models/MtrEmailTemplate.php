<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MtrEmailTemplate extends Model
{
    use HasFactory;

    protected $connection;
    public function __construct() { $this->connection = config('database.default'); } 
    protected $table= 'mtr_email_template';

    protected $fillable = [
        'template_name', 'subject', 'body', 'sender_email', 'cc'
    ];

    protected $casts = [
        'cc' => 'array',
    ];
}
