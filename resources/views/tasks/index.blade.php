<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="api-token" content="{{ $token }}">
    <title>Gestor de tareas</title>
</head>

<body>

    <h1>Gestor de tareas</h1>

    <div id="app">
        <p>Selecciona un usuario para consultar sus tareas.</p>
    </div>

    @vite('resources/js/tasks/tasks.js')
</body>
</html>
