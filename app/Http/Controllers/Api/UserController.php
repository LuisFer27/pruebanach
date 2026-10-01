<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::query()->select('id', 'name', 'email')->orderBy('name','asc')->get();

        return response()->json(
            ['message' => 'Usuarios obtenidos correctamente', 'data' => $users],
            200
        );
    }
    public function store(UserRequest $request): JsonResponse
    {

        $user = User::create($request->validated());
        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'data' => $user
        ], 201);
    }
}
