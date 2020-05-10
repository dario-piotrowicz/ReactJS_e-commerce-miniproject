import React, { useEffect } from 'react';
import './App.scss';
import Homepage from './pages/homepage/hompage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { connect } from 'react-redux';
import { requestUserUpdatesFromFirebase } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

const App = ({ requestUserUpdatesFromFirebase, currentUser }) => {

  useEffect( () => {
    requestUserUpdatesFromFirebase();
  },[requestUserUpdatesFromFirebase]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin'
                      render={ () => currentUser ?
                                          <Redirect to='/'/>
                                          : <SignInAndSignUpPage /> }
        />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route component={() => (<h1>404 PAGE</h1>)} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  requestUserUpdatesFromFirebase: () => dispatch(requestUserUpdatesFromFirebase())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
