import {action, decorate, observable} from "mobx";
import {I_TASK} from "../interfaces/TasksInterfaces";
import {getTasks} from "../scripts/TasksModel";

class TasksStore
{
    tasks: I_TASK[];
    constructor() {
        this.tasks = [];
    }

    updateTasks() {
        this.tasks = getTasks();
    }

    addTasks(inTask: I_TASK): void {
        this.tasks.unshift(inTask);
    }
}

// @ts-ignore
TasksStore = decorate(TasksStore, {
    tasks: observable,
    addTasks: action,
    getTasks: action
});

export default new TasksStore();
