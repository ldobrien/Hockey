import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {signOut} from '../store/actions/authActions';
// import './styles.css'
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux'

class Navbar extends Component {
    
    render() {
        const teamSelector = this.props.auth ? <li><Link className="linkTitle" to="/">Select Team</Link></li> : null
        const signUpLink = this.props.auth ? null : <li><Link className="linkTitle" to="/SignUp">Sign Up</Link></li>
        const signInLink = this.props.auth ? <li><Link onClick={this.props.signOut} to="/SignIn" className="linkTitle">Log Out</Link></li> : <li><Link className="linkTitle" to="/SignIn">Sign In</Link></li>
        return (
            <div className="App">
            <nav>
              <div className="container">
                 <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {teamSelector}
                    <li><Link className="linkTitle" to="/scoreboard">Scoreboard</Link></li>
                    {signInLink}
                    {signUpLink}
                 </ul>
              </div>
            </nav>
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

export default connect(mapStateToProps, mapDistpatchToProps)(Navbar);
