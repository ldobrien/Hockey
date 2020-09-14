import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import './styles.css'
import 'materialize-css/dist/css/materialize.min.css';

class Navbar extends Component {
    state ={
    }
    render() {
        return (
            <div className="App">
            <nav>
              <div className="container">
                 <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link className="linkTitle" to="/">Home</Link></li>
                    <li><Link className="linkTitle" to="/Teams">Teams</Link></li>
                 </ul>
              </div>
            </nav>
         </div>

        )
    }
}

export default Navbar;
