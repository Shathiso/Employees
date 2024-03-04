<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'contact_number',
        'email_address',
        'birth_date',
        'street_address',
        'city',
        'postal_code',
        'country'
    ];

    public function skills()
    {
        return $this->hasMany(Skills::class)->withTimestamps();
    }

    public function employees_skills(): HasMany
    {
        return $this->hasMany(Employees_skills::class);
    }
}
