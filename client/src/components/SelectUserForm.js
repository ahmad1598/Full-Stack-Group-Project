import React from 'react'
import { withListData} from '../context/BigDataProvider.js'

const SelectUserForm = (props) => {
    return(
        <form id="select-user-form" onSubmit={props.handleLoginSubmit}>
            
            <select name="currentUserId" onChange={props.handleChange} required>
                <option value="">Select user...</option>
                {
                    props.allUsers.map((user) => 
                        <option value={user._id} key={user._id + Math.random()}>{user.username}</option>
                    )
                }
            </select>
            <button>Login</button>
        </form>
    )
}

export default withListData(SelectUserForm)