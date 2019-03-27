import React, { Component } from 'react'
import AddEditPortfolioItemForm from './AddEditPortfolioItemForm.js'
import { withListData } from '../context/BigDataProvider.js'

class PortfolioItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editToggle: false,
            title: props.title,
            imgTitle: props.imgTitle,
            imgUrl: props.imgUrl,
            description: props.description ,
            link: props.link ,
            isFeatured: props.isFeatured 
        }
    }

    toggler = () => {
        this.props.getPortfolioItem(this.props._id)
        this.setState(prevState => ({
            editToggle: !prevState.editToggle
        }))

    }

    handleChange = e => {
        // const {name, type} = e.target
        const value = e.target.type === "checkbox" ? e.target.checked:
                        e.target.value
        this.setState(({
            [e.target.name]: value
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        const PortfolioUpdate = {
            title: this.state.title,
            imgTitle: this.state.imgTitle,
            imgUrl: this.state.imgUrl,
            description: this.state.description || '',
            link: this.state.link || '',
            isFeatured: this.state.isFeatured || false
        }
        this.props.updatePortfolioItem(this.props._id,PortfolioUpdate)
        this.toggler()
    }

    render() {
        const { title, imgTitle, imgUrl, description, link, _id, isFeatured , userId} = this.props
        return (
            <div key={_id} className="portfolio-item">
                {!this.state.editToggle ?
                    <div className="card">
                        <div>
                            <div>
                                <img src={imgUrl} alt={imgTitle} width={300} />
                            </div>
                            <div>
                                <div className="bottom-buttons">
                                    <div>
                                        <h3>{title}</h3>
                                    </div>
                                    <div>
                                        {(description) ? <p><span className="text-italic">{description}</span></p> : ""}
                                        <p>Image alt text: {imgTitle}</p>
                                        {(link) ? <p>Links to: <a href={link}>{link}</a></p> : ""}
                                        <p>{(isFeatured) ? "Featured on the home page" : "Not featured"}</p>
                                    </div>
                                    <div>
                                        <button className="delete" onClick={() => this.props.deletePortfolioItem(_id)}>Delete</button>
                                        <button className="edit" onClick={this.toggler}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <AddEditPortfolioItemForm
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            toggler={this.toggler}
                            btnText="Submit Edit"
                            {...this.state}
                        />
                    </>
                }
            </div>
        )
    }
}

export default withListData(PortfolioItem)