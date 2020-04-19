import React from 'react';
import './App.css';
import Homepage from './pages/homepage/hompage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, firestoreUtils } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {
  unsubscribeFromAuthStateChanged = null;
  unsubscribeFromUserRefOnSnap = null;

  updateCurrentUser = currentUser => {
    this.props.setCurrentUser(currentUser);
  }

  componentDidMount(){
    this.unsubscribeFromAuthStateChanged = auth.onAuthStateChanged(
      async userAuth => {
        if(!userAuth){
          this.updateCurrentUser(null);
          return;
        }
        const userRef = await firestoreUtils.createUserDoc(userAuth);
        if(!userRef){
          this.updateCurrentUser(null);
          return;
        }
        this.unsubscribeFromUserRefOnSnap = userRef.onSnapshot( userSnap => {
          this.updateCurrentUser({
              id: userSnap.id,
              ...userSnap.data()
          });
        });
      }
    );
  }

  componentWillUnmount(){
    if(this.unsubscribeFromAuthStateChanged)
      this.unsubscribeFromAuthStateChanged();

    if(this.unsubscribeFromUserRefOnSnap)
      this.unsubscribeFromUserRefOnSnap();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin'
                       render={ () => this.props.currentUser ?
                                            <Redirect to='/'/>
                                           : <SignInAndSignUpPage /> }
          />
          <Route exact path='/checkout' component={CheckoutPage} />
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
