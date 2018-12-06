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
import AddListModal from './containers/addListModal';
import EditListModal from './containers/editListModal';
import EditTaskModal from './containers/editTaskModal';

export default () => {
    render(
        <Provider store={store}>
            <Container>
                <Logo />
                <Header />
                <Navigation />
                <Body />
                <AddListModal />
                <EditListModal />
                <EditTaskModal />
            </Container>
        </Provider>,
        document.querySelector('.main-container')
    );

    import('./services/webfontloader').then(webfontloader =>
        webfontloader.default()
    );
};
