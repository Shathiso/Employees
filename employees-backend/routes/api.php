<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('employees', [\App\Http\Controllers\EmployeeController::class, 'index']);
Route::post('employees', [\App\Http\Controllers\EmployeeController::class, 'store']);
Route::get('employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'show']);
Route::post('employees/{id}/update', [\App\Http\Controllers\EmployeeController::class, 'update']);
Route::post('employees/{id}/delete', [\App\Http\Controllers\EmployeeController::class, 'delete']);
