import React, { Fragment } from 'react';
import { render } from 'react-dom';

// State
import Store from './services/store';
import { Provider } from 'mobx-react';
const store = new Store();

// Components
import Header from './components/header';
import Navigation from './components/navigation';
import Logo from './components/logo';
import Body from './components/Body';
import Modals from './components/Modals';

export default () => {
    render(
        <Provider state={store}>
            <Fragment>
                <Logo />
                <Header />
                <Navigation />
                <Body />
                <Modals />
            </Fragment>
        </Provider>,
        document.querySelector('.main-container')
    );
};
