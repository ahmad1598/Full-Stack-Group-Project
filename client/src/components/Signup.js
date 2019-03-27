import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            firstName: "",
            lastName: "",
            imgUrl: "",
            aboutMe: "",
            email: "",
            address: "",
            phone: "",
            errorMessage: ""

        }
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            imgUrl: "",
            aboutMe: "",
            email: "",
            address: "",
            phone: "",
            errorMessage: ""
        })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.signup(this.state)
            .then(() => '')
            .catch(err => {
                this.setState({ errorMessage: err.response.data.errMsg })
            })

    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>

                <input
                    type="text"
                    onChange={this.handleChange}
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                />

                <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    placeholder="password"
                />

                <input
                    type="text"
                    name="firstName"
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    placeholder="First Name"
                />

                <input
                    type="text"
                    name="lastName"
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    placeholder="Last Name"
                />

                {/* <input
                    type="text"
                    name="aboutMe"
                    onChange={this.handleChange}
                    value={this.state.aboutMe}
                    placeholder="About Me"
                />
                <input
                    type="text"
                    name="address"
                    onChange={this.handleChange}
                    value={this.state.address}
                    placeholder="address"
                />
                <input
                    type="text"
                    name="phone"
                    onChange={this.handleChange}
                    value={this.state.phone}
                    placeholder="phone"
                />
                <input
                    type="text"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    placeholder="email address"
                />
                <input
                    type="text"
                    name="imgUrl"
                    onChange={this.handleChange}
                    value={this.state.imgUrl}
                    placeholder="image"
                /> */}



                <button>Signup</button>
                
                {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p>}

            </form>

        )
    }
}

export default withListData(Signup) 