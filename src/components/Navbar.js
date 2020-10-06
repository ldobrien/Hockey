import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {signOut} from '../store/actions/authActions';
// import './styles.css'
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux'

class Navbar extends Component {
    
    render() {
        const authentication = this.props.auth.email 
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
                    {authentication && <li><Link onClick={this.props.signOut} className="linkTitle">Log Out</Link></li>}
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
    console.log(state)
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Navbar);
