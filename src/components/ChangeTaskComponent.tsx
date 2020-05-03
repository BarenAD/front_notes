import * as React from "react";
import "../sass/ChangeTask.scss";
import {Cancel, Done, SaveOutlined} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";
import {useState} from "react";
import {changeTask} from "../scripts/Models/TasksModel";

interface I_ChangeTaskComponent {
    idTask: number;
    textTask: string;
    handleCloseModal: any;
}

interface I_changeInputHandleSave {
    idTask: number;
    newTextTask: string;
    handleCloseModal: any;
}

export default function ChangeTaskComponent(inProps: I_ChangeTaskComponent) {
    const [newTextTask, setTextTask] = useState(inProps.textTask);
    return (
        <div className={"change_task_main_container"}>
            <IconButton
                className={"button_cancel"}
                title={"закрыть"}
                onClick={() => {inProps.handleCloseModal()}}
            >
                <Cancel style={{color: "red", width: "50px", height: "50px"}}/>
            </IconButton>
            <TextField
                style={{width: "90%"}}
                label="новый текст"
                value={newTextTask}
                onChange={(event) => {setTextTask(event.target.value)}}
            />
            <IconButton
                title={"сохранить"}
                onClick={() => {handleSave({
                    idTask: inProps.idTask,
                    newTextTask: newTextTask,
                    handleCloseModal: inProps.handleCloseModal
                })}}
            >
                <SaveOutlined  style={{color: "green", width: "50px", height: "50px"}}/>
            </IconButton>
        </div>
    );
}

function handleSave(inProps: I_changeInputHandleSave) {
    changeTask(inProps.idTask, inProps.newTextTask)
        .then(() => {
            inProps.handleCloseModal();
        })
        .catch(() => {
            alert("Произошла ошибка при сохранении");
        })
}
