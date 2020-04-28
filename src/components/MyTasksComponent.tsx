import React from 'react';
import {  Button, IconButton, TextField, Typography } from '@material-ui/core';
import TasksStore from "../store/TasksStore";
import {addTask, updateTasks, deleteTask} from "../scripts/TasksModel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {observer} from "mobx-react";
import {Block, Delete, Create, NoteAdd} from "@material-ui/icons";

interface IProps {
}

interface IState {
    currentTextForNewTask: string
}

class MyTasksComponent extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
        this.state = {
            currentTextForNewTask: ""
        };
    }

    componentDidMount(): void {
        updateTasks();
    }

    handleCreateNewTask()
    {
        addTask(this.state.currentTextForNewTask);
        this.setState({currentTextForNewTask: ""});
    }

    render()
    {
        const {tasks} = TasksStore;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Заметка</TableCell>
                            <TableCell align="right">Дата создания</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <TextField
                                    style={{width: "100%"}}
                                    label="текст"
                                    value={this.state.currentTextForNewTask}
                                    onChange={(event) => {this.setState({currentTextForNewTask: event.target.value});}}
                                />
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="center">
                                <IconButton
                                    title={"создать новую"}
                                    onClick={() => {this.handleCreateNewTask()}}
                                >
                                    <NoteAdd/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {tasks.map((task) => (
                            <TableRow
                                key={"TasksListID_" + task.id}
                                style={{backgroundColor: task.blocked === 0 ? "none" : "rgba(255,231,0,0.5)"}}
                            >
                                <TableCell component="th" scope="row">
                                    {task.text}
                                </TableCell>
                                <TableCell align="right">{new Date(task.dateCreate).toUTCString()}</TableCell>
                                <TableCell align="center">
                                    {task.blocked === 0 ?
                                        <div>
                                            <IconButton
                                                title={"редактировать"}
                                                onClick={() => {}}
                                            >
                                                <Create/>
                                            </IconButton>
                                            <IconButton
                                                title={"удалить"}
                                                onClick={() => {deleteTask(task.id)}}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </div>
                                        :
                                        <Block/>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default observer(MyTasksComponent);
