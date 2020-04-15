import React from 'react';
import {  Button, TextField, Typography } from '@material-ui/core';
import {AddCircleOutline, LockOpenOutlined} from "@material-ui/icons";
import '../sass/Authenticate.scss';

interface IProps {
}

interface IState {
    login: string
    password: string
    modeLogin: boolean
    errorLogin: boolean
    errorTextLogin: string
    errorPassword: boolean
    errorTextPassword: string
}

export default class Authenticate extends  React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);

        this.state = {
            login: "",
            password: "",
            modeLogin: true,
            errorLogin: false,
            errorPassword: false,
            errorTextLogin: "",
            errorTextPassword: ""
        };
    }

    render() {
        return (
            <div className="auth_main_container">
                <Typography variant="h4" className="auth_text_typography">
                    {this.state.modeLogin ?
                        "Авторизация"
                        :
                        "Регистрация"
                    }
                </Typography>
                <div className="auth_text_fields_container">
                    <TextField
                        className="auth_text_fields"
                        label="Логин"
                        error={this.state.errorLogin}
                        helperText={this.state.errorTextLogin}
                        onChange={(event) => {this.setState({login: event.target.value});}}
                    />
                    <TextField
                        className="auth_text_fields"
                        label="Пароль"
                        error={this.state.errorPassword}
                        helperText={this.state.errorTextPassword}
                        onChange={(event) => {this.setState({login: event.target.value});}}
                    />
                </div>
                <Button variant="contained" color="primary" className="auth_button">
                    <LockOpenOutlined className="auth_button_icon"/>
                    Войти
                </Button>
                <Button variant="contained" color="secondary" className="auth_button">
                    <AddCircleOutline className="auth_button_icon"/>
                    Зарегистрироваться
                </Button>
            </div>
        );
    }
}
