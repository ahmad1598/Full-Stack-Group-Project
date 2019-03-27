import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import Login from '../components/Login.js'
import Modal from 'react-modal';
import { PageFade } from '../transitions/transition.js'

import './transitionstyles.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'whitesmoke',
        overflow: 'none',
        height: '550px'
    }
};


class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,

        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        localStorage.setItem('isLoggedIn', "false")
        localStorage.setItem('isPreview', "false")
    }

    componentDidMount() {
        setTimeout(() => this.setState({ modalIsOpen: true }), 4000);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        console.log('close')
        this.setState({ modalIsOpen: false });
    }

    render() {

        return (
            <div id="welcome-screen">
                <div className="outer-div">
                    <div className="inner-div"></div>
                </div>
                <div className="z-content">
                    <div className="vertical-align-parent">
                        <PageFade location={this.location}>
                            <div className="vertical-align-child">
                                
                                {(this.state.modalIsOpen === true)
                                    ?
                                    <Modal
                                        ariaHideApp={false}
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="Login/Signup"
                                    >
                                        <Login />
                                        <div className="close-button" onClick={() => this.closeModal()}><span className="hidden">Close</span></div>
                                    </Modal>
                                    :
                                    <>
                                        <h1>&lt;tt&gt;ché</h1>

                                        <button onClick={() => { this.openModal() }}>Login / Signup</button>
                                    </>
                                }

                                {/* <Login />  */}
                            </div>
                        </PageFade>
                    </div>
                </div>
            </div>
        )
    }
}

export default withListData(Welcome)