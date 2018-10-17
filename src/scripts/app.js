import React, { Fragment } from 'react';
import { render } from 'react-dom';

// State
import Store from './services/store';
import { Provider } from 'mobx-react';
const store = new Store();

// Components
import Header from './containers/header';
import Navigation from './containers/navigation';
import Logo from './components/logo';
import Body from './containers/body';

export default () => {
    render(
        <Provider state={store}>
            <Fragment>
                <Logo />
                <Header />
                <Navigation />
                <Body />
            </Fragment>
        </Provider>,
        document.querySelector('.main-container')
    );
};
