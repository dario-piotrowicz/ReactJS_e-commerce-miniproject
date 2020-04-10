import React from 'react';
import './App.css';
import Homepage from './pages/homepage/hompage.component';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  return (
    <div>
      <Header />
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

export default App;
