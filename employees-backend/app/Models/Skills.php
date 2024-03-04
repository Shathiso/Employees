<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    use HasFactory;

    protected $fillable = [
        'skill',
        'years_of_experience',
        'seniority_rating'
    ];

    public function employees()
    {
        return $this->belongsToMany(Employee::class)->withTimestamps();
    }

    public function employees_skills(): HasMany
    {
        return $this->hasMany(Employees_skills::class);
    }
}
