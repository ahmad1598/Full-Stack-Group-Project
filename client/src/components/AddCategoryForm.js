import React from 'react'
import { withListData } from '../context/BigDataProvider.js'

const AddCategoryForm = (props) => {
    console.log(props)
    return (
        <form className="add-category-form" onSubmit={props.handleCategorySubmit}>
        
            <input
                type="text"
                value={props.newCategory}
                onChange={props.handleChange}
                name="newCategory"
                placeholder="New Category"
                required />
            <button>{props.btnText}</button>
        </form>
    )
}

export default withListData(AddCategoryForm)