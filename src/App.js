import React, { useEffect, lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { requestUserUpdatesFromFirebase } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from './components/error-boundary/error-boundry.component';
import { withRouter } from 'react-router-dom';

const Homepage = lazy( () => import('./pages/homepage/hompage.component') );
const ShopPage = lazy( () => import('./pages/shop/shop.component') );
const SignInAndSignUpPage = lazy( () => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component') );
const CheckoutPage = lazy( () => import('./pages/checkout/checkout.component') );

const renderSingInIfNoCurrentUser = currentUser => (
  currentUser ? <Redirect to='/'/> : <SignInAndSignUpPage/>
);

const App = ({ history, requestUserUpdatesFromFirebase, currentUser }) => {

    useEffect(() => {
      const unlisten = history.listen( () => {
        window.scrollTo(0, 0);
      });
      return () => unlisten();
    }, [history]);

  useEffect( () => {
    requestUserUpdatesFromFirebase();
  },[requestUserUpdatesFromFirebase]);

  return (
    <div>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div/>}>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin' render={() => renderSingInIfNoCurrentUser(currentUser)} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route component={() => (<h1>404 PAGE</h1>)} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  requestUserUpdatesFromFirebase: () => dispatch(requestUserUpdatesFromFirebase())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
