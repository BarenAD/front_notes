import React from 'react';
import {  Button, TextField, Typography } from '@material-ui/core';
import {AddCircleOutline, LockOpenOutlined} from "@material-ui/icons";
import {registerUser, loginUser} from "../scripts/Models/AuthorizationModel";
import '../sass/Authenticate.scss';

interface IProps {
}

interface IState {
    modeLogin: boolean;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    errorLogin: boolean;
    errorTextLogin: string;
    errorPassword: boolean;
    errorTextPassword: string;
}

export default class AuthenticateComponent extends  React.Component<IProps, IState>
{
    constructor(props: IProps)
    {
        super(props);

        this.state = {
            modeLogin: true,
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            errorLogin: false,
            errorPassword: false,
            errorTextLogin: "",
            errorTextPassword: ""
        };
    }

    stateFullReset()
    {
        this.stateReset();
        this.setState({
            firstName: "",
            lastName: "",
            login: "",
            password: ""
        });
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
        if (!this.state.modeLogin) {
            this.setState({modeLogin: true});
        } else {
            this.stateReset();
            loginUser({
                login: this.state.login,
                password: this.state.password
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
    }

    submitRegister()
    {
        if (this.state.modeLogin) {
            this.setState({modeLogin: false});
        } else {
            this.stateReset();
            registerUser({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                login: this.state.login,
                password: this.state.password
            })
                .then(() => {
                    this.stateFullReset();
                })
                .catch(reason => {
                    this.setState({
                        errorLogin: true,
                        errorTextLogin: reason.message
                    });
                });
        }
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
                    {!this.state.modeLogin &&
                        <div>
                            <TextField
                                className="auth_text_fields"
                                label="Имя"
                                onChange={(event) => {this.setState({firstName: event.target.value});}}
                            />
                            <TextField
                                className="auth_text_fields"
                                label="Фамилия"
                                onChange={(event) => {this.setState({lastName: event.target.value});}}
                            />
                        </div>
                    }
                    <TextField
                        className="auth_text_fields"
                        label="E-mail"
                        type={"email"}
                        error={this.state.errorLogin}
                        helperText={this.state.errorTextLogin}
                        onChange={(event) => {this.setState({login: event.target.value});}}
                    />
                    <TextField
                        className="auth_text_fields"
                        label="Пароль"
                        type={"password"}
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
