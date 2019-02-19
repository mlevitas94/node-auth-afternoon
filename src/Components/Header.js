import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            isAdmin: false,
        }
        this.handleUsernameInput=this.handleUsernameInput.bind(this)
        this.handlePasswordInput=this.handlePasswordInput.bind(this)
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
        // this.props.updateUser=this.props.updateUser.bind(this)

    }
    handleUsernameInput(e){
        // should update this.state.username  based on user input. Do not mutate state, use setState.
        this.setState({
            username:e.target.value
        })
    }
    handlePasswordInput(e){
        // should update this.state.password based on user input. Do not mutate state, use setState.
        this.setState({
            password:e.target.value
        })
    }

    toggleAdmin = () => {
        // should toggle the value of isAdmin on state, by setting it to the value of it's opposite. (!this.state.isAdmin)
    this.setState({
        isAdmin:!this.state.isAdmin
    })
    }

    login= ()=> {
        // create POST request to login endpoint
        let {username,password,isAdmin} = this.state
        let user = {username,password}
        axios.post(`/auth/login`,user).then(()=>{
            this.props.updateUser({username,isAdmin})
            this.setState({
                username:'',
                password:''
            })
        })
    }

    register= ()=> {
        // create POST request to register new user
        let {username,password,isAdmin} = this.state
        let user = {username,password,isAdmin}
        let user1={username,isAdmin}
        axios.post(`/auth/register`,user).then(()=>{
            this.props.updateUser(
                user1
            )
            this.setState({
                username:'',
                password:''
            })
        })
    }

    logout = ()=>{
        // GET request to logout
        axios.get(`/auth/logout`).then(()=>{
            this.props.updateUser({})
        })
    }

    render() {
        const { username, password } = this.state
        const { user } = this.props
        return (
            <div className='Header'>
                <div className="title">Dragon's Lair</div>
                {
                    user.username ?
                    (<div className='welcomeMessage'>
                            <h4>{user.username}, welcome to the dragon's lair</h4>
                            <button type="submit" onClick={this.logout}>Logout</button>
                        </div>
                        )
                        :
                        <div className="loginContainer">

                            <input type="text"
                                placeholder="Username"
                                value={username}
                                onChange={this.handleUsernameInput}                                
                            />
                            <input type="password"
                                placeholder="Password"
                                value={password}
                                onChange={this.handlePasswordInput}                                
                            />
                            <div className='adminCheck' >
                                <input type="checkbox" id='adminCheckbox' onChange={()=>this.toggleAdmin()} /> <span> Admin </span>
                            </div>
                            <button onClick={this.login}>Log In</button>
                            <button onClick={this.register} id='reg' >Register</button>

                        </div>}
            </div>
        )
    }
}