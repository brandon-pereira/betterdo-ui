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

export default () => {
    render(
        <Provider state={store}>
            <div className="app">
                <Logo />
                <Header />
                <Navigation />
                <Fragment>
                    {/* <AddTask />
                    <Lists /> */}
                </Fragment>
            </div>
        </Provider>,
        document.querySelector('.main-container')
    );
};
