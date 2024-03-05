<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Employees_skills extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'skill_id'
    ];

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skills::class);
    }
}
