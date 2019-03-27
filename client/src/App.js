import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom' 
import { withListData } from './context/BigDataProvider.js'
import ProtectedRoute from "./components/ProtectedRoute";

import './styles.css'
import './styles-portfolio.css'

import Login from './components/Login.js'
import MenuAdmin from './components/MenuAdmin.js'
import MenuPortfolio from './components/MenuPortfolio.js'
import Footer from './components/Footer.js'

import Welcome from './components/Welcome.js'
import Categories from './components/Categories.js'
import PortfolioItems from './components/PortfolioItems.js'
import UserInfo from './components/UserInfo.js'

import UserHomePage from './components/UserHomePage.js'
import UserCategory from './components/UserCategory.js'
import UserContact from './components/UserContact.js'

class App extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        // console.log(this.props.user._id)
        this.props.token && this.props.getUsers()
        this.props.token && this.props.getCategories()
    }

    render() {
        return (
            <article>
            <header>
                {/* display only if logged in */}
                {(this.props.token) ? <MenuAdmin /> : ``}
                {/* display when (NOT logged in) || (when logged in AND previewMode===true) */}
                {(this.props.isPreview === true) ? <MenuPortfolio /> : ``}
            </header>

            <Switch>
                {/* Admin Routes */}
                <Route exact path='/' render={rprops => !this.props.token ? <Welcome {...rprops} /> : <Redirect to={`/${this.props.user.username}/userinfo`} />} />
                <ProtectedRoute path="/:_username/categories" component={Categories} />
                <ProtectedRoute path='/:_username/portfolio' component={PortfolioItems} />
                <ProtectedRoute path='/:_username/userinfo' component={UserInfo} />

                {/* Portfolio Routes */}
                <Route exact path='/:_username' component={UserHomePage} />
                <Route exact path='/:_username/contact' component={UserContact} />
                <Route path='/:_username/cat/:_categoryid' component={UserCategory} />
               

            </Switch>

            <footer>
                <Footer />
            </footer>

        </article>
        )
    }
}

export default withRouter(withListData(App))