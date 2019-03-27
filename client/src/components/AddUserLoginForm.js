import React from 'react'
import { withListData} from '../context/BigDataProvider.js'

const AddUserLoginForm = (props) => {
    return(
        <form className="add-user-form" onSubmit={props.handleSignupSubmit}>
            <input
                type="text"
                name="newUsername"
                value={props.newUsername}
                onChange={props.handleChange}
                placeholder="username"
                required />
            <button>Go</button>
        </form>
    )
}

export default withListData(AddUserLoginForm)