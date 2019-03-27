import React, { Component } from 'react'
import AuthLogin from '../components/AuthLogin.js'
import Signup from '../components/Signup.js'

class Login extends Component {
    constructor() {
        super() 
        this.state = {
            userChoice: 'login'
        }
        localStorage.setItem('isLoggedIn', "false")
        localStorage.setItem('isPreview', "false")
    }

    setUserChoice = (str) => {
        this.setState ({
            userChoice: str
        })
    }
    render() {
       
        return (
            <div>
                <div id="login-screen">
                <div className="center-crop">
                    <h1>&lt;tt&gt;ché</h1>
                    <span><button className="tab" onClick={() => this.setUserChoice('login')}>Login</button></span>
                    <span><button className="tab" onClick={() => this.setUserChoice('signup')}>Sign Up</button></span>
                    {/* DISPLAY DIV ONLY IF USERS EXIST */}
                    {(this.state.userChoice === 'signup') 
                    ?
                    <div>
                        <Signup />
                    </div>
                    :
                    <div>
                        <AuthLogin />
                    </div>
                    }                    
                </div>    
                </div>
            </div>
        )
    }

}

export default Login