import React, { Component, Fragment } from 'react'
import PortfolioItem from './PortfolioItem.js'
import AddEditPortfolioItemForm from './AddEditPortfolioItemForm.js'
import { withListData } from '../context/BigDataProvider.js'

class PortfolioItems extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
        this.state = {
            title: "",
            imgTitle: "",
            imgUrl: "",
            description: "",
            link: "",
            isFeatured: false
        }
    }
    
    componentDidMount = () => {
        this.props.getPortfolioItems()
    }


    handleChange = (event) => {
        // handleChange now caters for checkboxes
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        const PortfolioObj = {
            title: this.state.title,
            imgTitle: this.state.imgTitle,
            imgUrl: this.state.imgUrl,
            description: this.state.description || '',
            link: this.state.link || '',
            isFeatured: this.state.isFeatured || false
        }

        this.props.addPortfolioItems(PortfolioObj)
    }
    
    render() {
        return(
            <main>
                <div id="portfolio-edit-screen" className="center-crop">
                    <h2>Portfolio</h2>
                    <h3>Add a Portfolio Piece</h3>
                    <div className="add-form">
                        <AddEditPortfolioItemForm 
                            btnText="Save"
                            handleCategoryChange={this.props.handleCategoryChange} 
                            allCategories={this.props.allCategories}
                            handleChange={this.handleChange} 
                            handleSubmit ={this.handleSubmit}
                        />
                    </div>
                    
                    <hr /><br />

                    <h3>Edit Portfolio</h3>
                    {/* DISPLAY DIV ONLY IF PORTFOLIO ITEMS EXIST */}
                    <div id="portfolio-list">
                    {/* Map over here */}
                    { this.props.allPortfolioItems.map(item => 
                    <Fragment key={item._id}>
                            {(item.userId === this.props.user._id) 
                            ?
                                <PortfolioItem 
                                
                                {...item} 
                                deletePortfolioItem ={this.props.deletePortfolioItem}
                                updatePortfolioItem = {this.props.updatePortfolioItem}
                                />
                            : 
                            null
                            }
                            </Fragment>
                        )
                    }
                    </div>
                </div>
            </main>
        )
    }
}

export default withListData(PortfolioItems)