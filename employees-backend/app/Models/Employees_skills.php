<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employees_skills extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'skill_id'
    ];

    public function employees(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function skills(): BelongsTo
    {
        return $this->belongsTo(Skills::class);
    }
}
