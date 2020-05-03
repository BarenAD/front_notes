import * as React from "react";
import "../sass/ChangeTask.scss";
import {Cancel, SaveOutlined} from "@material-ui/icons";
import {IconButton, TextField, Button} from "@material-ui/core";
import {useState} from "react";
import {changeTask, stopChangeTask} from "../scripts/Models/TasksModel";

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
                <Cancel className={"ico"}/>
            </IconButton>
            <TextField
                style={{width: "90%"}}
                label="новый текст"
                value={newTextTask}
                onChange={(event) => {setTextTask(event.target.value)}}
            />
            <Button
                className={"button_save"}
                title={"сохранить"}
                onClick={() => {handleSave({
                    idTask: inProps.idTask,
                    newTextTask: newTextTask,
                    handleCloseModal: inProps.handleCloseModal
                })}}
            >
                <SaveOutlined className={"ico"}/>
                сохранить
            </Button>
        </div>
    );
}

function handleSave(inProps: I_changeInputHandleSave) {
    stopChangeTask(inProps.idTask).then(() => {
        changeTask(inProps.idTask, inProps.newTextTask)
            .then(() => {
                inProps.handleCloseModal();
            })
            .catch(() => {
                alert("Произошла ошибка при сохранении");
            })
    });
}
