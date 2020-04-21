import {action, decorate, observable} from "mobx";
import {I_TASK} from "../interfaces/TasksInterfaces";
import {getTasks} from "../scripts/TasksModel";

class TasksStore
{
    tasks: I_TASK[];
    constructor(inTasks: I_TASK[]) {
        this.tasks = inTasks;
    }

    addTasks(inTask: I_TASK): void {
        this.tasks.push(inTask);
    }
}

// @ts-ignore
TasksStore = decorate(TasksStore, {
    tasks: observable,
    addTasks: action
});

export default new TasksStore(getTasks());
