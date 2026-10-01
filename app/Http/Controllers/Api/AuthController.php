<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
public function token (Request $request):JsonResponse{
 $request->validate([
    'user_id'=>['required','integer','exists:users,id']
 ]);
 $user=User::findOrFail($request->user_id);
 $token =$user->createToken('api-token')->plainTextToken;
         return response()->json(
            ['message' => 'Token generado correctamente.', 'token' => $token],
            201
        );
}
}
