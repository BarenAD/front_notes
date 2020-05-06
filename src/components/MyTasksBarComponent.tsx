import {TextField, Checkbox, Card, InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";
import {ArrowDownward} from "@material-ui/icons";
import React from "react";

interface IState {

}

interface IProps {
    checkboxViewBlocked: boolean;
    checkboxViewCompleted: boolean;
    handleUpdateSearchQuery: any;
    handleUpdateCheckbox: any;
    selectedSortColumn: string;
    isSortDesk: boolean;
    handleChangeSelectedColumnSort: any;
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
            handleUpdateCheckbox,
            selectedSortColumn,
            isSortDesk,
            handleChangeSelectedColumnSort
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
                <div style={{display: "flex",alignItems: "center"}}>
                    <FormControl style={{width: "150px"}}>
                        <InputLabel id="selectSortedColumn">Сортировка</InputLabel>
                        <Select
                            labelId="selectSortedColumn"
                            value={selectedSortColumn}
                            id={"IDselectSortedColumn"}
                            onChange={(event) => {handleChangeSelectedColumnSort(event.target.value)}}
                        >
                            <MenuItem value={"id"}>ID</MenuItem>
                            <MenuItem value={"text"}>Текст(длина)</MenuItem>
                            <MenuItem value={"blocked"}>Заблокированные</MenuItem>
                            <MenuItem value={"status"}>Статус</MenuItem>
                            <MenuItem value={"dateCreate"}>Дата создания</MenuItem>
                        </Select>
                    </FormControl>
                    <div title={isSortDesk ? "Сортировать по убыванию" : "Сортировать по возрастанию"}>
                        <ArrowDownward
                            onClick={() => {handleUpdateCheckbox("isSortDesk", !isSortDesk)}}
                            style={{
                                marginLeft: "10px",
                                cursor: "pointer",
                                transform:  isSortDesk ? "" : "rotate(180deg)",
                                transition: "transform 0.5s"
                            }}
                        />
                    </div>
                </div>
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
