const API_TASKS = "https://localhost:44350/api/task";

export function getAllTasksApi() {
  return fetch(API_TASKS).then(response => {
    return response.json();
  })
}

export function addNewTask(onAddInputChange, doStatus) {
  return fetch(API_TASKS, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      name: onAddInputChange,
      status: doStatus
    })
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        Promise.reject("http code: ", resp.status);
      }
      console.log("response: ", resp);
    })
    .then(data => console.log("dane od serwera", data))
    .catch(err => console.warn("nie działa", err))
    
}

export function editTask(id, onEditInputValue, status) {
  return fetch(API_TASKS + "/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      id: id,
      name: onEditInputValue,
      status: status
    })
  }).then(resp => {
    if (resp.ok) {
      console.log("http code: ", resp.status)
    } else {
      Promise.reject("http code: ", resp.status);
    }
})

}

export function removeTask(id){
  return  fetch(API_TASKS + "/" + id, {
    method: "DELETE"
  }).then(resp => {
    if (resp.ok) {
      console.log("http code: ", resp.status)
    } else {
      Promise.reject("http code: ", resp.status);
    }
})
}



