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

    updateTask(inNewTaskInfo: I_TASK): boolean {
        let index: number = this.tasks.findIndex((task: I_TASK) => (task.id === inNewTaskInfo.id));
        if (index > -1) {
            this.tasks[index] = inNewTaskInfo;
            return true;
        }
        return false;
    }

    addTasks(inTask: I_TASK): void {
        let newTasks = this.tasks;
        newTasks.unshift(inTask);
        this.setTasks(newTasks);
    }

    deleteTask(inId: number): void {
        this.setTasks(this.tasks.filter(task => (task.id !== inId || task.blocked > 0)));
    }

    getTaskById(inId: number): I_TASK | undefined {
        return this.tasks.find((task: I_TASK) => (task.id === inId));
    }
}

// @ts-ignore
TasksStore = decorate(TasksStore, {
    tasks: observable,
    addTasks: action,
    deleteTask: action,
    getTaskById: action,
    updateTask: action,
});

export default new TasksStore();
