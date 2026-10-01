
<?php

use Illuminate\Support\Facades\Route;

Route::get('/tasks', function () {
    return view('tasks.index', [
        'token' => config('app.tasks_api_token'),
    ]);
});
