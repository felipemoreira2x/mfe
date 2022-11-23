import React,{lazy,Suspense,state, useState,useEffect} from 'react';



import Header from './components/Header';


const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));


import {Router, BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

const generateClassName = createGenerateClassName({
  productionPrefix:'co'
})

const history = createBrowserHistory();

export default () => {
  const [isSignedIn,setIsSignedIn] = useState(false);

  useEffect(() =>{
    if(isSignedIn){
      history.push('/dashboard');
    }
  },[isSignedIn])

  return (
  <Router history={history}>
    <StylesProvider generateClassName={generateClassName}>
    <div>
      <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth">
            <AuthLazy onSignIn={() => setIsSignedIn(true) } />
          </Route>
          <Route path="/dashboard"> 
            {!isSignedIn && <Redirect to={"/"} />}
            <DashboardLazy />
          </Route>
          <Route path="/" component={MarketingLazy} />
        </Switch>
      </Suspense>
    </div>
    </StylesProvider>
  </Router>
  )
};