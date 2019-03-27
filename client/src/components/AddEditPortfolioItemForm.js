import React, { Component } from 'react'
// import { withListData } from '../context/BigDataProvider.js'
import CategoryDropdown from './CategoryDropdown.js'

class AddEditPortfolioItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <form className="portfolio-form" onSubmit={this.props.handleSubmit}>
                <div className="close-button" onClick={this.props.toggler}><span className="hidden">Close</span></div>
                <div>

                    <div>
                        {(!this.props.imgUrl) 
                        ? <img src='https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder.png' alt='placeholder' width={300} />
                        : <img src={this.props.imgUrl} alt="" width={300} />
                        }
                        
                    </div>

                    <div className="form-fields">
                        <input
                            type="text"
                            value={this.props.title}
                            onChange={this.props.handleChange}
                            name="title"
                            placeholder="Title"
                            required />
                        <input
                            type="text"
                            value={this.props.imgUrl}
                            onChange={this.props.handleChange}
                            name="imgUrl"
                            placeholder="Image URL"
                            required />
                        <input
                            type="text"
                            value={this.props.imgTitle}
                            onChange={this.props.handleChange}
                            name="imgTitle"
                            placeholder="Image Title"
                            required />
                        <input
                            type="text"
                            value={this.props.description}
                            onChange={this.props.handleChange}
                            name="description"
                            placeholder="Description"
                            required />
                        <input
                            type="text"
                            value={this.props.link}
                            onChange={this.props.handleChange}
                            name="link"
                            placeholder="Link URL"
                            required />

                        < CategoryDropdown />

                        <button>{this.props.btnText}</button>
                        
                        <div>
                            <input
                                type="checkbox"
                                // value={this.props.isFeatured}
                                onChange={this.props.handleChange}
                                name="isFeatured"
                                checked={this.props.isFeatured}
                            />
                            <label>Featured on home page</label>
                        </div>
                        
                    </div>


                </div>
            </form>
        )
    }
}

export default AddEditPortfolioItemForm