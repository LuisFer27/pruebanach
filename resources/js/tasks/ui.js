export function renderUsers(users) {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <h2>Usuarios</h2>

        <label for="userSelect">
            Selecciona un usuario:
        </label>

        <select id="userSelect">
            <option value="">-- Selecciona un usuario --</option>

            ${users
                .map(
                    (user) => `
                <option value="${user.id}">
                    ${user.name} - ${user.email}
                </option>
            `,
                )
                .join("")}
        </select>

        <div id="tasksContainer"></div>
    `;
}

export function renderTasks(tasks) {
    const container = document.querySelector("#tasksContainer");

    container.innerHTML = `
         <h2>Tareas</h2>

    <div>
        <label for="taskFilter">
            Filtrar tareas:
        </label>

        <select id="taskFilter">
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
        </select>
    </div>
<div>
    <label for="taskSort">
        Ordenar por:
    </label>

    <select id="taskSort">
        <option value="date_desc">Más recientes</option>
        <option value="date_asc">Más antiguas</option>
        <option value="title_asc">Título A-Z</option>
        <option value="title_desc">Título Z-A</option>
    </select>
</div>
        ${
            tasks.length === 0
                ? `<p>Este usuario no tiene tareas.</p>`
                : `
                    <ul>
                        ${tasks
                            .map(
                                (task) => `
<li>
    <strong>${task.title}</strong>

    <p>${task.description}</p>

    <span>
        ${task.completed ? "Completada" : "Pendiente"}
    </span>

    ${
        !task.completed
            ? `
                <button
                    type="button"
                    class="completeTaskButton"
                    data-task-id="${task.id}"
                >
                    Completar
                </button>
            `
            : ""
    }
    <button
    type="button"
    class="deleteTaskButton"
    data-task-id="${task.id}"
>
    Eliminar
</button>
</li>
                        `,
                            )
                            .join("")}
                    </ul>
                `
        }

        <form id="taskForm">
            <h3>Crear tarea</h3>

            <div>
                <label for="taskTitle">
                    Título
                </label>

                <input
                    type="text"
                    id="taskTitle"
                    name="title"
                    required
                >
            </div>

            <div>
                <label for="taskDescription">
                    Descripción
                </label>

                <textarea
                    id="taskDescription"
                    name="description"
                    required
                ></textarea>
            </div>

            <button type="submit">
                Crear tarea
            </button>
        </form>
    `;
}

