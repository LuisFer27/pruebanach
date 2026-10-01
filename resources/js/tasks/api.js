const API_URL = "/api";
export async function getUsers(token) {
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("No se pudieron obtener los usuarios.");
    }
    const result = await response.json();
    return result.data;
}

export async function getUserTasks(userId, token) {
    const response = await fetch(`${API_URL}/users/${userId}/tasks`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("No se pudieron obtener los tareas.");
    }
    const result = await response.json();
    return result.data;
}

export async function createTask(userId,taskData,token){
 const response = await fetch(`${API_URL}/users/${userId}/tasks`, {
        method:'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(taskData)
    });
    const result =await response.json();
      if (!response.ok) {
        throw new Error(result.message||"No se pudo crear la tarea.");
    }
    return result.data;
}

export async function completeTask(taskId,token){
     const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
        method:'PATCH',
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        },

    });
    const result =await response.json();
          if (!response.ok) {
        throw new Error(result.message||"No se pudo completar la tarea.");
    }
    return result.data;
}

export async function deleteTask(taskId,token){
         const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method:'DELETE',
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        },
    });
    const result =await response.json();
          if (!response.ok) {
        throw new Error(result.message||"No se pudo eliminar la tarea.");
    }
    return result.data;
}
