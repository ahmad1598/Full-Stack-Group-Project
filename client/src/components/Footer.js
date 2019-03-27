import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className="center-crop">
                <p>{(new Date().getFullYear())} &copy; Attaché by <a href="https://github.com/ahmad1598">Ahmad Rasoulpour</a>, <a href="https://github.com/yummywakame">Olivia Meiring</a> &amp; <a href="https://github.com/AniTurner">Ani Turner</a></p>
            </div>
        )
    }
}
export default Footer