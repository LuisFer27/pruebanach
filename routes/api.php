<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
//rutas de usuarios
Route::get('/users',[UserController::class,'index'])->middleware('auth:sanctum');
Route::post('/users',[UserController::class,'store']);
//rutas de tareas asignadas
Route::middleware('auth:sanctum')->group(function(){
Route::get('/users/{user}/tasks',[TaskController::class,'index']);
Route::post('/users/{user}/tasks',[TaskController::class,'store']);
Route::patch('/tasks/{task}/complete', [TaskController::class, 'complete']);
Route::delete('/tasks/{task}',[TaskController::class,'delete']);
Route::post('/auth/token',[AuthController::class,'token']);
});

