import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import { TimelineLite } from 'gsap'
import '../styles-admin.css'
class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: props.user.username,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            aboutMe: props.user.aboutMe,
            address: props.user.address,
            phone: props.user.phone,
            imgUrl: props.user.imgUrl,
            email: props.user.email
        }

        this.modalElement = null
        this.tl = new TimelineLite({ paused: true })
    }

    toggleModal = () => {
        const { modalToggle } = this.state
        if (!modalToggle) {
            this.tl.to(this.modalElement, 0.3, { autoAlpha: 1 })
                .to(this.modalElement, 0.5, { top: 50, scale: 1 }, "-=0.3")
                .play()
        } else {
            this.tl.to(this.modalElement, 0.3, { autoAlpha: 0 })
                .to(this.modalElement, 0.5, { top: 0, scale: 0.75 }, "-=0.3")
                .play()
        }
        this.setState(pervState => ({ modalToggle: !pervState.modalToggle }))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const userUpdate = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            aboutMe: this.state.aboutMe,
            address: this.state.address,
            phone: this.state.phone,
            imgUrl: this.state.imgUrl,
            email: this.state.email
        }

        this.props.updateUser(this.props.user._id , userUpdate)
        console.log('hi')

    }
    render() {
        console.log(this.props.user)
        return (
            <main>
                <div id="user-info-edit-screen" className="center-crop">

                    <h2>User Info</h2>
                    <hr />
                    <h1>{`${this.state.username}`}</h1>

                    <form id="user-info-form" onSubmit={this.handleSubmit}>
                        <div>
                            <img src={this.state.imgUrl ? this.state.imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJlZBm6kPxbsgHqvL2GNBMrLY_Ns4mhJFiOa4L1Sgkz1u-J2gtg"} alt={this.state.username} />
                            <input type="text" name="imgUrl" value={this.state.imgUrl} placeholder="Profile Image URL" onChange={this.handleChange} />
                        </div>
                        <div>
                            {/* <label>User Name:</label> */}
                            <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} disabled />
                            {/* <label>First Name:</label> */}
                            <input type="text" name="firstName" value={this.state.firstName ? this.state.firstName : ""} placeholder="First Name" onChange={this.handleChange} />
                            {/* <label>Last Name:</label> */}
                            <input type="text" name="lastName" value={this.state.lastName ? this.state.lastName : ""} placeholder="Last Name" onChange={this.handleChange} />
                            {/* <label>About Me:</label> */}
                            <input type="text" name="aboutMe" value={this.state.aboutMe ? this.state.aboutMe : ""} placeholder="About Me..." onChange={this.handleChange} />
                            {/* <label>Address:</label> */}
                            <input type="text" name="address" value={this.state.address ? this.state.address : ""} placeholder="Address" onChange={this.handleChange} />
                            {/* <label>Phone Number:</label> */}
                            <input type="number" name="phone" value={this.state.phone ? this.state.phone : ""} placeholder="Phone" onChange={this.handleChange} />
                            <input type="email" name="email" value={this.state.email ? this.state.email : ""} placeholder="Email Address" onChange={this.handleChange} />

                        </div>
                        <div>
                            <button>Save</button>
                        </div>

                    </form>

                    <div ref={div => this.modalElement = div} className="modal">
                        <p>Your Update has been saved</p>
                        <button onClick={this.toggleModal}>Close</button>
                    </div>

                </div>
            </main>
        )
    }
}

export default withListData(UserInfo)