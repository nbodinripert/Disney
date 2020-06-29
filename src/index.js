import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NotFound from "./components/NotFound"
import CompanyCatalog from "./components/CompanyCatalog"
import MovieDetails from "./components/MovieDetails"

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/company/:id" component={CompanyCatalog}/>
                <Route path="/movie/:id" component={MovieDetails}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
