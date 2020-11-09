import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {signOut} from '../store/actions/authActions';
// import './styles.css'
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux'

class Navbar extends Component {
    
    render() {
        console.log("NAVBAR:", this.props.auth)
        const authentication = this.props.auth
        return (
            <div className="App">
            <nav>
              <div className="container">
                 <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link className="linkTitle" to="/">Home</Link></li>
                    <li><Link className="linkTitle" to="/Teams">Teams</Link></li>
                    {!authentication && <li><Link className="linkTitle" to="/SignUp">Sign Up</Link></li>}
                    {!authentication && <li><Link className="linkTitle" to="/SignIn">Sign In</Link></li>}
                    <li><Link className="linkTitle" to="/scoreboard">Scoreboard</Link></li>
                    {authentication && <li><Link onClick={this.props.signOut} to="/SignIn" className="linkTitle">Log Out</Link></li>}
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
