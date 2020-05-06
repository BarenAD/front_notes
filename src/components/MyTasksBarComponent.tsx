import {TextField, Checkbox, Card} from "@material-ui/core";
import React from "react";

interface IState {

}

interface IProps {
    checkboxViewBlocked: boolean;
    checkboxViewCompleted: boolean;
    handleUpdateSearchQuery: any;
    handleUpdateCheckbox: any;
}

export default class MyTasksBarComponent extends React.Component<IProps, IState>
{
    LinkOnTimerUpdateSearchQuery: any;

    constructor(props: IProps) {
        super(props);
        this.LinkOnTimerUpdateSearchQuery = null;
    }

    handleChangeSearch(newText: string)
    {
        if (this.LinkOnTimerUpdateSearchQuery) {
            clearTimeout(this.LinkOnTimerUpdateSearchQuery);
        }
        this.LinkOnTimerUpdateSearchQuery = setTimeout((newText) => {
            this.LinkOnTimerUpdateSearchQuery = null;
            this.props.handleUpdateSearchQuery(newText);
        },500, newText);
    }

    render()
    {
        const {
            checkboxViewCompleted,
            checkboxViewBlocked,
            handleUpdateCheckbox
        } = this.props;
        return (
            <Card
                style={{
                    padding: "15px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <TextField
                    style={{width: "300px"}}
                    label="поиск"
                    onChange={(event) => this.handleChangeSearch(event.target.value)}
                />
                <div>
                    <Checkbox
                        checked={checkboxViewCompleted}
                        onChange={(event) => {handleUpdateCheckbox("viewCompleted", event.target.checked)}}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    показывать выполненные
                </div>
                <div>
                    <Checkbox
                        checked={checkboxViewBlocked}
                        onChange={(event) => {handleUpdateCheckbox("viewBlocked", event.target.checked)}}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    показывать заблокированные
                </div>
            </Card>
        );
    }
}
