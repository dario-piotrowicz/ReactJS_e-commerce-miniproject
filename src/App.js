import React from 'react';
import './App.css';
import Homepage from './pages/homepage/hompage.component';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';


class App extends React.Component {
  unsubscribeFromAuthStateChanged = null;

  constructor(){
    super();

    this.state = { currentUser: null };
  }

  componentDidMount(){
    this.unsubscribeFromAuthStateChanged = auth.onAuthStateChanged( user => {
      this.setState({ currentUser: user });
    })
  }

  componentWillUnmount(){
    if(this.unsubscribeFromAuthStateChanged)
      this.unsubscribeFromAuthStateChanged();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
          <Route exact path='/hats' component={ () => (<h1>HATS PAGE</h1>)} />
          <Route exact path='/jackets' component={ () => (<h1>JACKETS PAGE</h1>)} />
          <Route exact path='/sneakers' component={ () => (<h1>SNEAKERS PAGE</h1>)} />
          <Route exact path='/womens' component={ () => (<h1>WOMENS PAGE</h1>)} />
          <Route exact path='/mens' component={ () => (<h1>MENS PAGE</h1>)} />
          <Route component={() => (<h1>404 PAGE</h1>)} />
        </Switch>
      </div>
    );
  }
}

export default App;
