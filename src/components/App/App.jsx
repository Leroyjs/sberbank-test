import React from 'react';
import Сhange from '../Сhange';
import Main from '../Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Main />} />
                <Route path="/change" render={() => <Сhange />} />
                <Route render={() => <Main />} />
            </Switch>
        </BrowserRouter>
    );
}
