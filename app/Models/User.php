<?php

namespace App\Models;



use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;





class User extends Model
{
use HasFactory;
  use HasApiTokens;

     protected $table='users';
        protected $fillable = [
        'name',
        'email',

    ];
    public function tasks(){
        return $this->hasMany(Task::class);
    }
}
