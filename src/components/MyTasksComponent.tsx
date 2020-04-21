import React from 'react';
import TasksStore from "../store/TasksStore";

export default class MyTasksComponent extends React.Component
{
    constructor(props: any)
    {
        super(props);
    }

    render() {
        const {tasks} = TasksStore;
        return (
            <h1>
                Компонент - Мои заметки
            </h1>
        );
    }
}
