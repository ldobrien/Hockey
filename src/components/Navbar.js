import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {signOut} from '../store/actions/authActions';
import './styles.css'
import {Navbar, NavItem, Icon} from 'react-materialize'
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux'
import logo from "../logo.png"

class NavbarComponent extends Component {
    
    render() {
        const teamSelector = this.props.auth ? <NavItem className="black-text" href="/">Select Team</NavItem> : null
        const signUpLink = this.props.auth ? null : <NavItem className="black-text" href="/SignUp">Sign Up</NavItem>
        const signInLink = this.props.auth 
            ? <NavItem className="black-text" onClick={this.props.signOut} href="/SignIn">Log Out</NavItem> 
            : <NavItem className="black-text" href="/SignIn">Sign In</NavItem>
        return (
            <div className="App">
                <Navbar
                    className="cyan lighten-3"
                    alignLinks="right"
                    brand={<img className="logo" src={logo}></img>}
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
                    <NavItem href="/scoreboard" className="black-text">Scoreboard</NavItem>
                    {signUpLink}
                    {signInLink}
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
