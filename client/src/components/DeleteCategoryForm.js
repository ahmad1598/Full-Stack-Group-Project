import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import CategoryDropdown from './CategoryDropdown.js'
class DeleteCategoryForm extends Component {
    
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
    
        return (
            <form className="delete-category-form">
                <CategoryDropdown {...this.props} />
                <button onClick={ () => this.props.deleteCategory(this.props.currentCategory._id)}>Delete</button>
            </form>
        )
    }
}

export default withListData(DeleteCategoryForm)