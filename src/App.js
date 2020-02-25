import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import OneDayControl from './components/OneDayControl/OneDayControl';
import TotalAllDays from './components/TotalAllDays/TotalAllDays'
import Layaut from './components/Layaut/Layaut';
import Auth from './components/Auth/Auth';
import WICreator from './components/WasteItemCreator/WICreator'
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';

class App extends React.Component {
    render(){
      let routs = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path='/creator' component={WICreator} />
          <Route path="/" component={OneDayControl}/>
          <Redirect to='/' />
        </Switch>
      )
      if(this.props.isAuthenticated){
        routs = (
          <Switch>
            <Route path="/alldays" component={TotalAllDays}/>
            <Route path='/creator' component={WICreator} />
            <Route path='/logout' component={Logout} />
            <Route path="/" component={OneDayControl}/>
            <Redirect to='/' />
          </Switch>
        )
      }
          return (
            <Layaut>
              {routs}
            </Layaut>
          )
    }
  
}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(App);
