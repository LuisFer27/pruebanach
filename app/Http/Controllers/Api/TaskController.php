<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Services\TaskManager;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function __construct(private TaskManager $taskManager) {}

    public function index(User $user): JsonResponse
    {
        $tasks = $user->tasks()->latest()->get();
        return response()->json(
            ['message' => 'Tareas obtenidas correctamente.', 'data' => $tasks],
            200
        );
    }

    public function store(TaskRequest $request,User $user): JsonResponse{
        $validated= $request->validated();
          $task=$this->taskManager->createTask(
           $user,
            $validated['title'],
            $validated['description']
        );
        return response()->json(
            ['message' => 'Tarea creada correctamente.', 'data' => $task],
            201
        );

    }
public function complete(Task $task):JsonResponse{
$task=$this->taskManager->completeTask($task);
        return response()->json(
            ['message' => 'Tarea completada correctamente.', 'data' => $task],
            200
        );
}
public function delete(Task $task):JsonResponse{
    $task->delete();
           return response()->json(
            ['message' => 'Tarea eliminada correctamente.', 'data' => $task],
            200
        );
}
}
