import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TeamPicker from './components/TeamPicker'
import Teams from './components/Teams';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Scoreboard from './components/Scoreboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div className="App">
              <Navbar/>
              <Switch>
                  <Route exact path="/" component={TeamPicker}/>
                  <Route exact path="/Teams" component={Teams}/>
                  <Route exact path='/signin' component={SignIn}/>
                  <Route exact path='/signup' component={SignUp}/>
                  <Route exact path='/scoreboard' component={Scoreboard}/>
              </Switch>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
