import {action, decorate, observable} from "mobx";
import {I_TASK} from "../interfaces/TasksInterfaces";

class TasksStore
{
    tasks: I_TASK[];
    constructor() {
        this.tasks = [];
    }

    setTasks(payload: I_TASK[]) {
        this.tasks = payload;
    }

    addTasks(inTask: I_TASK): void {
        let newTasks = this.tasks;
        newTasks.unshift(inTask);
        this.setTasks(newTasks);
    }

    deleteTask(inId: number): void {
        this.setTasks(this.tasks.filter(task => (task.id !== inId || task.blocked > 0)));
    }
}

// @ts-ignore
TasksStore = decorate(TasksStore, {
    tasks: observable,
    addTasks: action,
    getTasks: action,
    deleteTask: action
});

export default new TasksStore();
