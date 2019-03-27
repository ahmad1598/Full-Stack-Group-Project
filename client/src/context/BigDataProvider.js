import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const dataAxios = axios.create()

dataAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const BigDataContext = React.createContext()

class BigDataProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUsername: '',
            newCategory: '',
            // currentUser: {},
            // currentUserId: "",
            currentCategory: {},
            currentPortfolioId: "",
            currentPortfolioItem: {
                title: "",
                _id: "",
                imgTitle: "",
                imgUrl: "",
                description: "",
                link: "",
                isFeatured: false
            },
            allUsers: [],
            allCategories: [],
            allPortfolioItems: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            isLoggedIn: ((localStorage.getItem('isLoggedIn')) === "true") || false,
            isPreview: false
        }
    }

    signup = (userInfo) => {
        return axios.post("/auth/signup", userInfo).then(response => {
            const { user, token } = response.data
            localStorage.setItem('token', token);
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({
                user,
                token,
                
            }, () => this.getCategories())
            this.toggleLogin()
            this.togglePreview()
            return response;
        })
    }

    login = (credentials) => {
        return axios.post('auth/login', credentials).then(response => {
            const { token, user } = response.data
            localStorage.setItem("token", token)
            console.log(user)
            localStorage.setItem("user", JSON.stringify(user))
            this.setState({
            //     currentCategory: response.data[0]
            // })
                user,
                token
            }, () => this.getCategories())

            this.toggleLogin()
            // this.togglePreview()
            return response;

        })

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

    // By choosing any category on dropdown list, will put current category inside currentCategory object
    handleCategoryChange = event => {
        console.log(event.target)
        const currentCategoryId = event.target.value
        dataAxios.get(`/api/category/v1/bycatid/${currentCategoryId}`).then(response => {
            this.setState({
                currentCategory: response.data[0]
            })
        })
    }

    // Get current user
    handleLoginSubmit = (event) => {
        event.preventDefault()
        this.getAllUserData()
    }

    // Get current user
    handleSignupSubmit = (event) => {
        event.preventDefault()
        const UserObj = {
            "username": this.state.newUsername
        }
        axios.post("/user/v1", UserObj).then(response => {
            this.setState(prevState => ({
                user: response.data,
                user_id: response.data._id,
                isLoggedIn: true,
                allUsers: [...prevState.allUsers, response.data]
            }), () => this.getAllUserData()
            )
        })
    }

    handlePortfolioChange = (event) => {
        // handlePortfolioChange now caters for checkboxes
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => (
            {
                currentPortfolioItem: {
                    ...prevState.currentPortfolioItem,
                    [name]: value
                }
            }))
    }

    // Add edit portfolio item
    addPortfolioItems = (PortfolioObj) => {
        dataAxios.post(`/api/portfolio/v1/${this.state.user._id}/${this.state.currentCategory._id}`, PortfolioObj).then(response => {
            this.setState(prevState => ({
                currentPortfolioItem: response.data,
                currentPortfolioId: response.data._id,
                allPortfolioItems: [...prevState.allPortfolioItems, response.data]
            })
                // , () => this.getAllUserData()
            )
        })
    }
    getPortfolioItems = () => {
        dataAxios.get("/api/portfolio/v1").then(response => {
            this.setState({
                allPortfolioItems: response.data
            })
        })
    }

    getPortfolioItem = (_id) => {
        dataAxios.get(`/api/portfolio/v1/${_id}`).then(response => {
            this.setState({
                currentPortfolioItem: response.data
            })
        })
    }

    deletePortfolioItem = (_id) => {
        dataAxios.delete(`/api/portfolio/v1/${_id}`).then(response => {
            this.setState(prevState => ({
                allPortfolioItems: prevState.allPortfolioItems.filter(item => item._id !== _id)
            }))
        })
    }

    updatePortfolioItem = (_id, updates) => {
        dataAxios.put(`/api/portfolio/v1/${_id}`, updates).then(response => {
            this.setState(prevState => ({
                allPortfolioItems: prevState.allPortfolioItems.map(item => item._id === _id ? response.data : item)
            }))
        })
    }

    // Requires UserID and category ID to get all user info
    getAllUserData = () => {
        // get all user's data
        //MIGHT NOT NEED DATAAXIOS IN FRONT OF GET
        dataAxios.get("/api/user/v1/" + this.state.user._id).then(response => {
            console.log("getAllUserData: get by current user id firing")
            this.setState({
                user: response.data,
                isLoggedIn: true
            })
        })

        // get all user's categories
        dataAxios.get("/api/category/v1/byuserid/" + this.state.user._id).then(response => {
            console.log("firing")
            this.setState({
                allCategories: response.data
            },
                () => {
                    // redirect to the users admin page
                    this.props.history.push(`/${this.state.user.username}/userinfo`)
                    // Save users id and logged in status to localStorage
                    // localStorage.setItem('currentUserID', this.state.currentUser._id)
                    localStorage.setItem('isLoggedIn', this.state.isLoggedIn)
                })
        })
    }

    // handleSubmit for Category
    handleCategorySubmit = event => {
        event.preventDefault()
        const newCategoryObj = {
            "title": this.state.newCategory,
            "userId": this.state.user._id
        }

        dataAxios.post(`/api/category/v1`, newCategoryObj).then(response => {
            console.log(response.data)
            this.setState(prevState => ({
                allCategories: [...prevState.allCategories, response.data]
            }))
        })

        console.log(this.state.newCategory)
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.isLoggedIn = false
        localStorage.isPreview = false
        this.setState({
            user: {},
            token: '', 
            isLoggedIn: false,
            isPreview: false
        })
        // this.toggleLogin()
        // this.togglePreview()
    }

    //delete category
    deleteCategory = _id => {
        if(window.confirm(`Are you sure you want to delete ${this.state.currentCategory.title} ? `)){
        // if (answer) {
            dataAxios.delete("/api/category/v1/" + _id).then(response => {
                console.log(response.data._id)
                this.setState(prevState => ({
                    allCategories: prevState.allCategories.filter(category => category._id !== _id)
                }))
            })
        } 
    }

    toggleLogin = () => {
        console.log('login')
        // set state logged in to opposite of before
        // set theme to opposite of previous theme
        localStorage.setItem("isLoggedIn", !this.state.isLoggedIn)
        this.setState(prevState => ({
            isLoggedIn: (prevState.isLoggedIn === true) ? false : true
        }))

        // set localStorage theme to new theme
        // localStorage.setItem("isLoggedIn", prevState => ({
        //     isLoggedIn: (prevState.isLoggedIn === true) ? true : false
        // }))

    }

    togglePreview = () => {
        console.log('preview')
        // set preview mode to opposite of previous preview mode
        // set theme to opposite of previous theme
        localStorage.setItem("isPreview", !this.state.isPreview)
        this.setState(prevState => ({
            isPreview: (prevState.isPreview === true) ? false : true
        }))

        // set localStorage theme to new theme
        // localStorage.setItem("isPreview", prevState => ({
        //     isPreview: (prevState.isPreview === true) ? true : false
        // }))
    }

    // Get all users
    getUsers = () => {
        dataAxios.get("/api/user/v1").then(response => {
            this.setState({
                allUsers: response.data
            })
        })
    }

    // Get current user
    getUser = (_id) => {
        dataAxios.get("/api/user/v1/" + _id).then(response => {
            this.setState({
                currentUser: response.data
            })
        })
    }

    // add new user
    addUser = (newUsername) => {
        dataAxios.post("/api/user/v1", newUsername).then(response => {
            this.setState(prevState => ({
                allUsers: [...prevState.allUsers, response.data]

            }))
        })
    }

    // delete user
    deleteUser = _id => {
        dataAxios.delete(`/api/user/v1/${_id}`).then(response => {
            this.setState(prevState => ({
                allUsers: prevState.allUsers.filter(user => user._id !== _id)
            }))
        })
    }

    // update user
    updateUser = (_id, updates) => {
        dataAxios.put(`/api/user/v1/${_id}`, updates).then(response => {
            localStorage.user = JSON.stringify(response.data)
            this.setState(prevState => ({
                // allUsers: prevState.allUsers.map(user => user._id === _id ? response.data : user)
                // user: prevState.user.forEach(item => item._id === _id ? response.data : item)
                user:{
                    ...prevState.user,
                    // imgUrl: "https://i.pinimg.com/originals/7f/49/f8/7f49f8bf001a533cc5c421a366395711.jpg"
                }

            }))
        })
    }

    // Get All categories per specific user
    getCategories = () => {
        console.log(this.state.currentUserId)
        dataAxios.get(`/api/category/v1/byuserid/${this.state.user._id}`).then(response => {
            this.setState({
                allCategories: response.data
            })
        })
    }

    render() {
        return (
            <BigDataContext.Provider
                value={{
                    newUsername: this.state.newUsername,
                    allUsers: this.state.allUsers,
                    allCategories: this.state.allCategories,
                    allPortfolioItems: this.state.allPortfolioItems,
                    currentUser: this.state.currentUser,
                    currentUserId: this.state.currentUserId,
                    currentCategory: this.state.currentCategory,
                    currentPortfolioItem: this.state.currentPortfolioItem,
                    handleChange: this.handleChange,
                    handleLoginSubmit: this.handleLoginSubmit,
                    handleCategoryChange: this.handleCategoryChange,
                    handleCategorySubmit: this.handleCategorySubmit,
                    handlePortfolioChange: this.handlePortfolioChange,
                    handlePortfolioSubmit: this.handlePortfolioSubmit,
                    handleSignupSubmit: this.handleSignupSubmit,
                    toggleLogin: this.toggleLogin,
                    togglePreview: this.togglePreview,
                    getUser: this.getUser,
                    getUsers: this.getUsers,
                    getCategories: this.getCategories,
                    addUser: this.addUser,
                    deleteUser: this.deleteUser,
                    deleteCategory: this.deleteCategory,
                    updateUser: this.updateUser,
                    addPortfolioItems: this.addPortfolioItems,
                    getPortfolioItems: this.getPortfolioItems,
                    getPortfolioItem: this.getPortfolioItem,
                    updatePortfolioItem: this.updatePortfolioItem,
                    deletePortfolioItem: this.deletePortfolioItem,
                    isLoggedIn: this.state.isLoggedIn,
                    isPreview: this.state.isPreview,
                    user: this.state.user,
                    token: this.state.token,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                }}>
                {this.props.children}
            </BigDataContext.Provider>
        )
    }
}

export default withRouter(BigDataProvider)

export const withListData = C => props => (
    <BigDataContext.Consumer>
        {value => <C {...props} {...value} />}
    </BigDataContext.Consumer>
)