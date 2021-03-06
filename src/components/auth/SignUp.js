import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        displayName: '',
        error: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.displayName === ''){
            this.setState({
                error: "You need to enter a display name"
            })
            return
        }
        this.props.signUp(this.state)
    }

    render() {
        if(this.props.auth.uid) return <Redirect to='/'/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="displayName">Display Name</label>
                        <input type="text" id="displayName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink-lighten-1 z-depth-0">Sign Up</button>
                    </div>
                    <div className="red-text center">{this.props.authError ? this.props.authError : null}</div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = {
    signUp
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
