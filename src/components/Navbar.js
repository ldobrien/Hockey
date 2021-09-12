import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {signOut} from '../store/actions/authActions';
import './styles.css'
import {Navbar, Icon} from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux'
import logo from "../logo.png"

class NavbarComponent extends Component {
    
    render() {
        const teamSelector = this.props.auth ? 
            <NavLink className="black-text" to="/">Select Team</NavLink>
            : null
        const tradeLinks = this.props.auth ? 
            <NavLink className="black-text" to="/trade">Trade</NavLink>
            : null
        const signUpLink = this.props.auth ? 
            null 
            : <NavLink className="black-text" to="/SignUp">Sign Up</NavLink>
        const signInLink = this.props.auth 
            ? <NavLink className="black-text" onClick={this.props.signOut} to="/SignIn">Log Out</NavLink>
            : <NavLink className="black-text" to="/SignIn">Sign In</NavLink>

        return (
            <div className="App">
                <Navbar
                    className="cyan lighten-3"
                    alignLinks="right"
                    brand={<img className="logo" src={logo} alt="logo"></img>}
                    id="mobile-nav"
                    menuIcon={<Icon>menu</Icon>}
                    options={{
                        draggable: true,
                        edge: 'left',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 200,
                        preventScrolling: true
                    }}
                >
                    {teamSelector}
                    {tradeLinks}                    
                    <NavLink className="black-text" to='/scoreboard'>Scoreboard</NavLink>
                    {signUpLink}
                    {signInLink}
                    <NavLink className="black-text" to='/draft'>Draft</NavLink>
                    <NavLink className="black-text" to='/draftboard'>Draft Board</NavLink>
                </Navbar>
            </div>

        )
    }
}
const mapDistpatchToProps = {
    signOut
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth.uid
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(NavbarComponent);
