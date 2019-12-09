import React from 'react';
import { render } from 'react-dom';

// State
import Store from './services/store';
import { Provider } from 'mobx-react';
const store = new Store();

// Theme
import { ThemeProvider } from 'styled-components';
import { createTheme, GlobalStyles } from './utils/style-utils';

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
            <GlobalStyles />
            <Provider store={store}>
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
            </Provider>
        </ThemeProvider>,
        document.querySelector('.main-container')
    );

    import('./services/webfontloader').then(webfontloader =>
        webfontloader.default()
    );
};
