import React from 'react';
import {  Button, IconButton, TextField, Typography } from '@material-ui/core';
import TasksStore from "../store/TasksStore";
import {createTask, updateTasks, deleteTask} from "../scripts/Models/TasksModel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {observer} from "mobx-react";
import {Block, Delete, Create, NoteAdd} from "@material-ui/icons";
import {I_TASK} from "../interfaces/TasksInterfaces";

interface IProps {
}

interface IState {
    currentTextForNewTask: string
    errorStatusCreatedTask: boolean;
}

class MyTasksComponent extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
        this.state = {
            currentTextForNewTask: "",
            errorStatusCreatedTask: false
        };
    }

    componentDidMount(): void {
        updateTasks();
    }

    handleCreateNewTask()
    {
        this.setState({errorStatusCreatedTask: false});
        createTask(this.state.currentTextForNewTask)
            .then(() => {
                this.setState({currentTextForNewTask: ""});
            })
            .catch(() => {
               this.setState({errorStatusCreatedTask: true});
            });
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
                        <TableRow style={{backgroundColor: this.state.errorStatusCreatedTask ? "gold" : "none"}}>
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
                        {tasks.map((task: I_TASK) => (
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
