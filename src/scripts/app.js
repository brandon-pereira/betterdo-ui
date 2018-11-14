import React from 'react';
import { render } from 'react-dom';

// State
import Store from './services/store';
import { Provider } from 'mobx-react';
const store = new Store();

// Components
import Container from './containers/container';
import Header from './containers/header';
import Navigation from './containers/navigation';
import Logo from './components/logo';
import Body from './containers/body';

export default () => {
    render(
        <Provider store={store}>
            <Container>
                <Logo />
                <Header />
                <Navigation />
                <Body />
            </Container>
        </Provider>,
        document.querySelector('.main-container')
    );
};
