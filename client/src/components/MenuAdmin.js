import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withListData } from '../context/BigDataProvider.js'

class MenuAdmin extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        // this.props.getUser(this.props.currentUserId)
    }

    render() {
        const { user, logout, togglePreview } = this.props

        return (
            <div className="center-crop">
                <div role="navigation" id="admin-nav">
                    <li id="logo"><Link to="/admin" className="title">Attaché Admin:</Link></li>
                    <li className="tab"><Link to={`/${user.username}/categories`}><div></div>Categories</Link></li>
                    <li className="tab"><Link to={`/${user.username}/portfolio`}><div></div>Portfolio</Link></li>
                    <li className="tab"><Link to={`/${user.username}/userinfo`}><div></div>User Info</Link></li>
                    <li className="tab"><Link to={`/${user.username}`} onClick={togglePreview}><div></div>Preview</Link></li>
                    {this.props.token && <li className="tab"><Link to={"/"} onClick={logout}><div></div>Log Out</Link></li>}
                </div>
            </div>
        )
    }
}

// {this.props.token && <button onClick={logout}>Logout</button>}
export default withListData(MenuAdmin)