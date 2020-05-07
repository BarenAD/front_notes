import React from 'react';
import {IconButton, TextField } from '@material-ui/core';
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
import TimeStore from "../store/TimeStore";
import MyTasksBarComponent from "./MyTasksBarComponent";

interface IProps {
}

interface IState {
    currentTextForNewTask: string;
    errorStatusCreatedTask: boolean;
    modalIsOpen: boolean;
    selectedChangeTaskId: number;
    selectedChangeTaskText: string;
    searchQuery: string;
    isEnableViewCompleted: boolean;
    isEnableViewBlocked: boolean;
    selectedSortColumn: string;
    isSortDesk: boolean;
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
            selectedChangeTaskText: "",
            searchQuery: "",
            isEnableViewCompleted: false,
            isEnableViewBlocked: false,
            selectedSortColumn: "id",
            isSortDesk: true
        };
    }

    componentDidMount(): void {
        updateTasks();
        window.onfocus = () => updateTasks();
    }

    componentWillUnmount(): void {
        window.onfocus = null;
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

    handleChangeSearchQuery(newQuery: string)
    {
        this.setState({searchQuery: newQuery});
    }

    handleChangeSelectedColumnSort(newColumn: string)
    {
        this.setState({selectedSortColumn: newColumn});
    }

    handleChangeCheckBox(key: string, newValue: boolean)
    {
        let isUpdate: object | null;
        switch (key) {
            case "viewCompleted": isUpdate = {isEnableViewCompleted: newValue}; break;
            case "viewBlocked": isUpdate = {isEnableViewBlocked: newValue}; break;
            case "isSortDesk": isUpdate = {isSortDesk: newValue}; break;
            default: isUpdate = null; break;
        }
        if (isUpdate) {
            this.setState(isUpdate);
        }
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
        const timeIntervalBlocked = 300; //Интервал блокировки с момента начала редактирования в секундах
        let tempTasks;
        const {
            isEnableViewCompleted,
            isEnableViewBlocked,
            searchQuery,
            selectedSortColumn,
            isSortDesk,
            selectedChangeTaskId,
            selectedChangeTaskText,
            modalIsOpen
        } = this.state;

        if (searchQuery.length > 0) {
            tempTasks = TasksStore.searchByText(
                isEnableViewCompleted,
                isEnableViewBlocked,
                searchQuery,
                selectedSortColumn,
                isSortDesk
            );
        } else {
            tempTasks = TasksStore.getTasks(
                isEnableViewCompleted,
                isEnableViewBlocked,
                selectedSortColumn,
                isSortDesk
            );
        }
        const tasks = tempTasks;
        const currentTime = TimeStore.getTimeAccordingToSyncDifference;
        return (
            <div style={{width: "100%", height:"100%"}}>
                <Modal
                    open={modalIsOpen}
                    onClose={() => {this.handleStopChangeTask()}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div>
                        <ChangeTaskComponent
                            idTask={selectedChangeTaskId}
                            textTask={selectedChangeTaskText}
                            handleCloseModal={() => {this.handleStopChangeTask()}}
                        />
                    </div>
                </Modal>
                <MyTasksBarComponent
                    selectedSortColumn={selectedSortColumn}
                    isSortDesk={isSortDesk}
                    checkboxViewCompleted={isEnableViewCompleted}
                    checkboxViewBlocked={isEnableViewBlocked}
                    handleUpdateSearchQuery={(text: string) => {this.handleChangeSearchQuery(text)}}
                    handleUpdateCheckbox={(key: string, newValue: boolean) => this.handleChangeCheckBox(key, newValue)}
                    handleChangeSelectedColumnSort={(column: string) => {this.handleChangeSelectedColumnSort(column)}}
                />
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
                            <TableRow style={{backgroundColor: this.state.errorStatusCreatedTask ? "gold" : "white"}}>
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
                                                (task.status ? "rgba(92,255,0,0.5)" : "white")
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
                                                        {(currentTime.timeServer - task.blocked) > timeIntervalBlocked ?
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
