import TasksStore from "../../store/TasksStore";
import {I_TASK} from "../../interfaces/TasksInterfaces";
import {sendHTTPRequest} from "./HTTPWorker";
import {BACKEND_DOMAIN_URL} from "../../constants/BasicConstants";

export function updateTasks() {
    getAllTasks().then(tasks => {TasksStore.setTasks(tasks)});
}

export function completedChangeTask(taskId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            id: taskId
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/note/change/completed",
            data: preparedBody
        })
            .then(response => {
                let task: I_TASK = prepareTask(response.data);
                TasksStore.updateTask(task);
                resolve();
            })
            .catch(response => {
                reject();
                console.log("Ошибка изменения статуса задачи");
            });
    });
}

export function stopChangeTask(taskId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            id: taskId
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/note/change/stop",
            data: preparedBody
        })
            .then(response => {
                let task: I_TASK = prepareTask(response.data);
                TasksStore.updateTask(task);
                resolve();
            })
            .catch(response => {
                reject();
                console.log("Ошибка старта изменения задачи");
            });
    });
}

export function startChangeTask(taskId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            id: taskId
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/note/change/start",
            data: preparedBody
        })
            .then(response => {
                let task: I_TASK = prepareTask(response.data);
                TasksStore.updateTask(task);
                resolve();
            })
            .catch(response => {
                reject();
                console.log("Ошибка старта изменения задачи");
            });
    });
}

export function changeTask(taskId: number, text: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            body: text,
            id: taskId
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/note/change/change",
            data: preparedBody
        })
            .then(response => {
                let task: I_TASK = prepareTask(response.data);
                TasksStore.updateTask(task);
                resolve();
            })
            .catch(response => {
                reject();
                console.log("Ошибка изменения задачи");
            });
    });
}

export function createTask(text: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            body: text
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/note/create",
            data: preparedBody
        })
            .then(response => {
                let task: I_TASK = prepareTask(response.data);
                TasksStore.addTasks(task);
                resolve();
            })
            .catch(response => {
                reject();
                console.log("Ошибка создания задачи");
            });
    });
}

export function deleteTask(idTask: number) {
    return new Promise<void>((resolve, reject) => {
        let preparedBody: object = {
            id: idTask
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/note/delete",
            data: preparedBody
        })
            .then(response => {
                TasksStore.deleteTask(idTask);
                resolve();
            })
            .catch(response => {
                reject();
                console.log("Ошибка создания задачи");
            });
    });
}

export function getAllTasks(): Promise<I_TASK[]> {
    return new Promise<I_TASK[]>((resolve, reject) => {
        sendHTTPRequest({
            method: "GET",
            url: BACKEND_DOMAIN_URL + "/api/note/getAll"
        })
            .then(response => {
                resolve(response.data.map((task: any) => (prepareTask(task))));
            })
            .catch(response => {
                reject();
                console.log("Ошибка получения задач");
            });
    });
}

function prepareTask(inTask: any): I_TASK {
    return {
        id: parseInt(inTask.id),
        blocked: parseInt(inTask.blocked),
        text: inTask.body,
        status: inTask.status != 0,
        dateCreate: new Date(inTask.created_at).getTime()
    };
}
