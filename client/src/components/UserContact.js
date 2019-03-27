import React from 'react'
import { withListData } from '../context/BigDataProvider.js'
const UserContact = (props) => {
    console.log(props)
    return(
        <main> 
            { props.user._id
            ?
                <div id="portfolio-contact-screen" className="center-crop">
                <h2>{props.user.firstName + " " + props.user.lastName}</h2>
                    <div className="card">
                        <div><img src = {props.user.imgUrl} alt="" width="300"/></div>
                        <div>
                            <div>
                                <h3>About Me:</h3>
                                <p>{props.user.aboutMe}</p>
                            </div>
                            <div>
                                <h3>Address:</h3>
                                <p>{props.user.address}</p>
                            </div>
                            <div>
                                <h3>Phone:</h3>
                                <p>{props.user.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            :
            null
            }
        </main>
    )
}

export default withListData(UserContact)
