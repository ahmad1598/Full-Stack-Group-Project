import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import { Link } from 'react-router-dom'

class PortfolioItem extends Component {

    render() {

        const { imgUrl, link } = this.props

        return (

            <div className="portfolio-item" style={{ backgroundImage: `url(${imgUrl}` }}>
                <Link to={`/${this.props.user.username}/cat/${link}`}></Link>
            </div>

        )
    }
}

export default withListData(PortfolioItem)