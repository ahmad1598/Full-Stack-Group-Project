import React, { Component, Fragment } from 'react'
import UserHomePageItem from './UserHomePageItem.js'
import { withListData } from '../context/BigDataProvider.js'

class UserHomePage extends Component {
    componentDidMount = () => {
        this.props.getPortfolioItems()
    }
    
    render() {

        return (
            <main>
                <div id="portfolio-background">
                    <div className="portflio-cols-3">

                        {this.props.allPortfolioItems.map(item =>
                            <Fragment key={item._id}>
                                {(item.userId === this.props.user._id && item.isFeatured)
                                    ?
                                    <UserHomePageItem
                                        {...item}
                                    />
                                    :
                                    null
                                } 
                            </Fragment>
                        )
                        }

                    </div>
                </div>
                <div id="portfolio-home" className="center-crop">
                    <div><div className="cutout-text">Portfolio</div></div>
                    <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
                </div>
            </main>
        )
    }
}

export default withListData(UserHomePage)