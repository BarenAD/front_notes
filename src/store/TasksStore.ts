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

    getTasks(isCompleted: boolean, isBlocked: boolean, sortColumn: string, isDesk: boolean): I_TASK[] {
        let newTasks: I_TASK[] = this.tasks.slice();
        if (newTasks.length > 0) {
            // @ts-ignore
            switch (typeof newTasks[0][sortColumn]) {
                case "number":
                    newTasks = isDesk ?
                        newTasks.sort((a: any, b: any) => compareNumbers(a[sortColumn], b[sortColumn]))
                        :
                        newTasks.sort((b: any, a: any) => compareNumbers(a[sortColumn], b[sortColumn]));
                    break;

                case "string":
                    newTasks = isDesk ?
                        newTasks.sort((a: any, b: any) => compareString(a[sortColumn], b[sortColumn]))
                        :
                        newTasks.sort((b: any, a: any) => compareString(a[sortColumn], b[sortColumn]));
                    break;

                case "boolean":
                    newTasks = isDesk ?
                        newTasks.sort((a: any, b: any) => compareBoolean(a[sortColumn], b[sortColumn]))
                        :
                        newTasks.sort((b: any, a: any) => compareBoolean(a[sortColumn], b[sortColumn]));
                    break;
            }

            return newTasks.filter((task: I_TASK) => (
                (isCompleted ? true : !task.status)
                &&
                (isBlocked ? true : task.blocked === 0)
            ));
        }
        return [];
    }

    searchByText(isCompleted: boolean, isBlocked: boolean, inText: string, sortColumn: string, isDesk: boolean): I_TASK[] {
        return this.getTasks(isCompleted, isBlocked, sortColumn, isDesk)
            .filter(task => task.text.toLowerCase().includes(inText.toLowerCase()));
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
    setTasks: action,
    addTasks: action,
    deleteTask: action,
    updateTask: action,
});

export default new TasksStore();

function compareString(a: string, b: string) {
    if (a.length > b.length) {
        return 1;
    } else if (a.length < b.length) {
        return -1;
    }
    return 0;
}

function compareNumbers(a: number, b: number) {
    return a - b;
}

function compareBoolean(a: boolean, b: boolean) {
    if (a && !b) {
        return 1;
    } else if (!a && b) {
        return -1;
    }
    return 0;
}
