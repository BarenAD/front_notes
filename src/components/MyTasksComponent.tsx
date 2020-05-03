import React from 'react';
import {IconButton, TextField, Typography } from '@material-ui/core';
import TasksStore from "../store/TasksStore";
import {
    createTask,
    updateTasks,
    deleteTask,
    startChangeTask,
    stopChangeTask,
    completedChangeTask
} from "../scripts/Models/TasksModel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {observer} from "mobx-react";
import {Block, Delete, Create, NoteAdd, Done, Schedule} from "@material-ui/icons";
import {I_TASK} from "../interfaces/TasksInterfaces";
import Modal from "@material-ui/core/Modal";
import ChangeTaskComponent from "./ChangeTaskComponent";

interface IProps {
}

interface IState {
    currentTextForNewTask: string;
    errorStatusCreatedTask: boolean;
    modalIsOpen: boolean;
    selectedChangeTaskId: number;
    selectedChangeTaskText: string;
}

class MyTasksComponent extends React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);
        this.state = {
            currentTextForNewTask: "",
            errorStatusCreatedTask: false,
            modalIsOpen: false,
            selectedChangeTaskId: -1,
            selectedChangeTaskText: ""
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

    handleStartChangeTask(idTask: number)
    {
        let task: I_TASK | undefined = TasksStore.getTaskById(idTask);
        if (task !== undefined) {
            let textTask: string = task.text;
            startChangeTask(task.id)
                .then(() => {
                    this.setState({
                        selectedChangeTaskId: idTask,
                        selectedChangeTaskText: textTask
                    }, () => {
                        this.setState({modalIsOpen: true});
                    });
                })
                .catch(() => {
                    alert("Произошла ошибка при попытке начать изменения в заметке");
                });
        }
    }

    handleStopChangeTask()
    {
        stopChangeTask(this.state.selectedChangeTaskId)
            .then(() => {
                this.setState({
                    selectedChangeTaskId: -1,
                    selectedChangeTaskText: ""
                }, () => {
                    this.setState({modalIsOpen: false});
                });
            })
            .catch(() => {
               alert("Произошла ошибка при попытке прекратить изменения в заметке");
            });
    }

    render()
    {
        const {tasks} = TasksStore;
        let currentTime = (new Date().getTime() / 1000);
        return (
            <div style={{width: "100%", height:"100%"}}>
                <Modal
                    open={this.state.modalIsOpen}
                    onClose={() => {this.handleStopChangeTask()}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <ChangeTaskComponent
                        idTask={this.state.selectedChangeTaskId}
                        textTask={this.state.selectedChangeTaskText}
                        handleCloseModal={() => {this.handleStopChangeTask()}}
                    />
                </Modal>
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
                                    style={{backgroundColor:
                                            task.blocked === 0 ?
                                                (task.status ? "rgba(92,255,0,0.5)" : "none")
                                            : "rgba(255,231,0,0.5)"}}
                                >
                                    <TableCell component="th" scope="row">
                                        {task.text}
                                    </TableCell>
                                    <TableCell align="right">{new Date(task.dateCreate).toUTCString()}</TableCell>
                                    <TableCell align="center">
                                        {task.status ?
                                            <Done/>
                                            :
                                            <div>
                                                {task.blocked <= 0 ?
                                                    <div>
                                                        <IconButton
                                                            title={"выполнена"}
                                                            onClick={() => {
                                                                completedChangeTask(task.id)
                                                            }}
                                                        >
                                                            <Done/>
                                                        </IconButton>
                                                        <IconButton
                                                            title={"редактировать"}
                                                            onClick={() => {
                                                                this.handleStartChangeTask(task.id)
                                                            }}
                                                        >
                                                            <Create/>
                                                        </IconButton>
                                                        <IconButton
                                                            title={"удалить"}
                                                            onClick={() => {
                                                                deleteTask(task.id)
                                                            }}
                                                        >
                                                            <Delete/>
                                                        </IconButton>
                                                    </div>
                                                    :
                                                    <div>
                                                        {(currentTime - task.blocked) > 300 ?
                                                            <IconButton
                                                                title={"сбросить блокировку"}
                                                                onClick={() => {
                                                                    stopChangeTask(task.id)
                                                                }}
                                                            >
                                                                <Schedule/>
                                                            </IconButton>
                                                            :
                                                            <Block/>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default observer(MyTasksComponent);
