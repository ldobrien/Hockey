import React from 'react';
import './App.css';
import NavbarComponent from './components/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TeamPicker from './components/TeamPicker'
import Teams from './components/Teams';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Scoreboard from './components/Scoreboard';
import Trade from './components/Trade';
import Draft from './components/Draft/Draft';
import DraftBoard from './components/Draft/DraftBoard';
import DraftedTeam from './components/Draft/DraftedTeam';
import Trades from "./components/Season/Trades"
import SeasonStats from "./components/Season/SeasonStats"
import DraftOrder from './components/Draft/DraftOrder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div className="App">
              <NavbarComponent/>
              <Switch>
                  {/* <Route exact path="/" component={TeamPicker}/> */}
                  <Route exact path="/Teams" component={Teams}/>
                  <Route exact path='/signin' component={SignIn}/>
                  <Route exact path='/signup' component={SignUp}/>
                  {/* <Route exact path='/scoreboard' component={Scoreboard}/> */}
                  <Route exact path="/trade" component={Trade}/>
                  <Route exact path="/draft" component={Draft}/>
                  <Route exact path="/draftboard" component={DraftBoard}/>
                  <Route exact path="/draftedTeams" component={DraftedTeam}/>
                  <Route exact path="/trades" component={Trades}/>
                  <Route exact path="/" component={SeasonStats}/>
                  <Route exact path="/DraftOrder" component={DraftOrder} />
              </Switch>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
