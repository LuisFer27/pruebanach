import {
    getUsers,
    getUserTasks,
    createTask,
    completeTask,
    deleteTask,
} from "./api";
import { renderUsers, renderTasks } from "./ui";
console.log("Modulo de tareas cargado correctamente");
const token = document.querySelector('meta[name="api-token"]')?.content;

console.log("¿Existe token?", !!token);
console.log("Longitud del token:", token?.length);
async function loadUsers() {
    try {
        const users = await getUsers(token);

        renderUsers(users);

        const userSelect = document.querySelector("#userSelect");
        userSelect.addEventListener("change", async (event) => {
            const userId = event.target.value;
            if (!userId) {
                return;
            }
            try {
                const tasks = await getUserTasks(userId, token);

                console.log("Tareas obtenidas", tasks);

                currentTasks = tasks;
                currentUserId = userId;

                applyTaskFilter();

            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

let currentTasks = [];
let currentUserId = null;
let currentSort = "date_desc";
function applyTaskFilter(filter = null) {
    const taskFilter = document.querySelector("#taskFilter");

    if (filter === null) {
        filter = taskFilter?.value || "all";
    }

    let filteredTasks = [...currentTasks];

    if (filter === "pending") {
        filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
        filteredTasks = filteredTasks.filter((task) => task.completed);
    }

    if (currentSort === "date_desc") {
        filteredTasks.sort(
            (a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
        );
    }

    if (currentSort === "date_asc") {
        filteredTasks.sort(
            (a, b) =>
                new Date(a.created_at) - new Date(b.created_at)
        );
    }

    if (currentSort === "title_asc") {
        filteredTasks.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (currentSort === "title_desc") {
        filteredTasks.sort((a, b) =>
            b.title.localeCompare(a.title)
        );
    }

    renderTasks(filteredTasks);

    const newTaskFilter = document.querySelector("#taskFilter");

    if (newTaskFilter) {
        newTaskFilter.value = filter;
    }

    const taskSort = document.querySelector("#taskSort");

    if (taskSort) {
        taskSort.value = currentSort;
    }
}
document.querySelector("#app").addEventListener("change", (event) => {
    if (event.target.id !== "taskFilter") {
        return;
    }

    applyTaskFilter(event.target.value);
});
document.querySelector("#app").addEventListener("change", (event) => {
    if (event.target.id !== "taskSort") {
        return;
    }

    currentSort = event.target.value;

    applyTaskFilter();
});
document.querySelector("#app").addEventListener("click", async (event) => {
    const completeButton = event.target.closest(".completeTaskButton");
    const deleteButton = event.target.closest(".deleteTaskButton");
    if (!completeButton && !deleteButton) {
        return;
    }
    const button = completeButton || deleteButton;
    const taskId = button.dataset.taskId;
    const userId = document.querySelector("#userSelect").value;
    try {
        if (completeButton) {
            await completeTask(taskId, token);
        }
        if (deleteButton) {
            const confirmed = confirm("¿Estás seguro de eliminar esta tarea ?");
            if (!confirmed) {
                return;
            }
            await deleteTask(taskId, token);
        }

        const updatedTasks = await getUserTasks(userId, token);
        currentTasks=updatedTasks;
        applyTaskFilter();
    } catch (error) {
        console.error("Error al completar tarea:", error);
        alert(error.message);
    }
});
document.querySelector("#app").addEventListener("submit", async (event) => {
    if (event.target.id !== "taskForm") {
        return;
    }

    event.preventDefault();

    const form = event.target;
    const userId = document.querySelector("#userSelect").value;

    const title = form.querySelector("#taskTitle").value;
    const description = form.querySelector("#taskDescription").value;

    try {
        const task = await createTask(
            userId,
            {
                title,
                description
            },
            token
        );

        console.log("Tarea creada:", task);

        currentTasks = await getUserTasks(userId, token);

        applyTaskFilter();

    } catch (error) {
        console.error("Error al crear tarea:", error);
        alert(error.message);
    }
});

loadUsers();
