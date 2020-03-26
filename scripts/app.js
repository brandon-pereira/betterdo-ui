import React from 'react';
import { render } from 'react-dom';

// State
import Store from './store';
import { Provider } from 'mobx-react';
const store = new Store();

// Theme
import { ThemeProvider } from 'styled-components';
import { createTheme, GlobalStyles } from './utilities/style-utils';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

// Components
import Container from './containers/container';
import Header from './containers/header';
import Navigation from './containers/navigation';
import Logo from './components/logo';
import Body from './containers/body';
import AddListModal from './containers/addListModal';
import EditListModal from './containers/editListModal';
import EditTaskModal from './containers/editTaskModal';
import UserSettingsModal from './containers/userSettingsModal';

export default () => {
    render(
        <ThemeProvider theme={createTheme()}>
            <BrowserRouter>
                <GlobalStyles />
                <Provider store={store}>
                    <Switch>
                        <Route path="/:listd">
                            <Container>
                                <Logo />
                                <Header />
                                <Navigation />
                                <Body />
                                <AddListModal />
                                <EditListModal />
                                <EditTaskModal />
                                <UserSettingsModal />
                            </Container>
                        </Route>
                        <Redirect from="/" to="/inbox" />
                    </Switch>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>,
        document.querySelector('.main-container')
    );

    import('./utilities/webfontloader').then(webfontloader =>
        webfontloader.default()
    );
};
