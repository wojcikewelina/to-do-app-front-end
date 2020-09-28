import React, { Component } from "react";
import "../style/Login.scss"

const API_URL =
    "https://localhost:44350/api/user/";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "your not logged in"

        };
    }


    handleLogInSubmit = event => {
        event.preventDefault();

        let email = event.target.userEmailLog.value;
        let password = event.target.userPasswordLog.value;

        fetch(API_URL + email + "/" + password)
            .then(resp => {
                if (resp.status === 200) {
                    alert("You have been logged in!");
                    this.setState({ status: "user with email: " + email + " is logged" })
                } else {
                    alert("Logowanie nie powiodło się");
                }
            })
            .catch(err => console.warn("nie działa", err));
        event.target.userEmailLog.value = "";
        event.target.userPasswordLog.value = "";
    };

    handleRegisterSubmit = event => {

        function clearInputs() {
            event.target.userEmailReg.value = "";
            event.target.userPasswordReg.value = "";
            event.target.userPasswordToConfirm.value = "";
        }

        event.preventDefault();

        let password = event.target.userPasswordReg.value;
        let passwordToConfirm = event.target.userPasswordToConfirm.value;

        if (password !== passwordToConfirm) {
            alert("Passwords are not the same!");
            clearInputs();
        } else if (password.length < 6) {
            alert("Password must have at least 6 letters");
            clearInputs();
        } else {
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    Email: event.target.userEmailReg.value,
                    Password: password,
                })
            })
                .then(resp => {
                    if (resp.status === 200) {
                        alert("You have been registered!");
                    } else {
                        alert("Rejestracja nie powiodła się");
                        console.log(resp.status);
                    }
                })
                .catch(err => console.warn("nie działa", err));
            clearInputs();


        }
    };

    render() {
        return (
            <section id="loginSection">
                <div>Status: {this.state.status}</div>
                <form onSubmit={this.handleLogInSubmit}>
                    <input type="text" placeholder="Email" id="userEmailLog" />
                    <input type="password" placeholder="Password" id="userPasswordLog" />
                    <button>Log in</button>
                </form>
                <form onSubmit={this.handleRegisterSubmit}>
                    <input type="text" placeholder="Email" id="userEmailReg" />
                    <input type="password" placeholder="Password" id="userPasswordReg" />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        id="userPasswordToConfirm"
                    />
                    <button>Register</button>
                </form>
            </section>
        );
    }
}
