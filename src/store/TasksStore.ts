import {action, computed, decorate, observable} from "mobx";
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

    getTasks(isCompleted: boolean, isBlocked: boolean): I_TASK[] {
        return this.tasks.filter(task => (
            (isCompleted ? true : !task.status)
            &&
            (isBlocked ? true : task.blocked === 0)
        ));
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

    searchByText(isCompleted: boolean, isBlocked: boolean, inText: string): I_TASK[] {
        return this.getTasks(isCompleted, isBlocked)
                .filter(task => task.text.toLowerCase().includes(inText.toLowerCase()));
    }
}

// @ts-ignore
TasksStore = decorate(TasksStore, {
    tasks: observable,
    setTasks: action,
    addTasks: action,
    deleteTask: action,
    getTaskById: action,
    updateTask: action,
});

export default new TasksStore();
