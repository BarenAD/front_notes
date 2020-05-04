import React from 'react';
import UserStore from "../store/UserStore";
import PrintAPI from "./APIComponent";

export default function MainComponent() {

    return (
        <div>
            <h1>
                Добро пожаловать {UserStore.user.toUpperCase()}!
            </h1>
            <h2>
                Это главная страница проекта!
            </h2>
            <br/>
            <br/>
            <PrintAPI />
        </div>
    );
}
