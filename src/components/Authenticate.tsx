import React from 'react';
import {  Button, TextField, Typography } from '@material-ui/core';
import {AddCircleOutline, LockOpenOutlined} from "@material-ui/icons";
import {registerUser, loginUser} from "../scripts/UsersModel";
import '../sass/Authenticate.scss';

interface IProps {
}

interface IState {
    login: string;
    password: string;
    errorLogin: boolean;
    errorTextLogin: string;
    errorPassword: boolean;
    errorTextPassword: string;
}

export default class Authenticate extends  React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);

        this.state = {
            login: "",
            password: "",
            errorLogin: false,
            errorPassword: false,
            errorTextLogin: "",
            errorTextPassword: ""
        };
    }

    stateReset()
    {
        this.setState({
            errorLogin: false,
            errorPassword: false,
            errorTextLogin: "",
            errorTextPassword: ""
        });
    }

    submitLogin(){
        this.stateReset();
        loginUser({
            login: this.state.login,
            password: this.state.password
        })
            .then(value => {
                if (value.type === "success") {
                    //редирект на главную страницу
                }
            })
            .catch(reason => {
                if (reason.type === "login") {
                    this.setState({
                        errorLogin: true,
                        errorTextLogin: reason.message
                    })
                } else if (reason.type === "password") {
                    this.setState({
                        errorPassword: true,
                        errorTextPassword: reason.message
                    })
                }
            });
    }

    submitRegister()
    {
        this.stateReset();
        registerUser({
            login: this.state.login,
            password: this.state.password
        })
            .then((status) => {
                if (status === "success") {
                    //редирект на главную страницу
                }
            })
            .catch(reason => {
                this.setState({
                    errorLogin: true,
                    errorTextLogin: reason
                });
            });
    }

    render() {
        return (
            <div className="auth_main_container">
                <Typography variant="h4" className="auth_text_typography">
                    Авторизация
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
                        onChange={(event) => {this.setState({password: event.target.value});}}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className="auth_button"
                    onClick={() => {this.submitLogin()}}
                >
                    <LockOpenOutlined className="auth_button_icon"/>
                    Войти
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className="auth_button"
                    onClick={() => {this.submitRegister()}}
                >
                    <AddCircleOutline className="auth_button_icon"/>
                    Зарегистрироваться
                </Button>
            </div>
        );
    }
}
