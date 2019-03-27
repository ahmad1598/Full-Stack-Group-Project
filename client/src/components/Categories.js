import React, { Component } from 'react'
import AddCategoryForm from './AddCategoryForm.js'
import { withListData } from '../context/BigDataProvider.js'
import DeleteCategoryForm from './DeleteCategoryForm.js'

class Categories extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main>
                <div className="center-crop">
                    <h2>Portfolio Categories</h2>
                    <hr />
                    <br />
                    <br />
                    <div id="categories-screen" className="center-crop">

                        <div>
                            <h2>Add a new Category</h2>
                            <AddCategoryForm btnText="Add" />
                        </div>

                        {/* DISPLAY BELOW ONLY IF CATEGORIES EXIST */}
                        <div>
                            <h2>Delete a Category</h2>
                            <DeleteCategoryForm />
                        </div>

                    </div>
                </div>
            </main>
        )
    }
}

export default withListData(Categories)