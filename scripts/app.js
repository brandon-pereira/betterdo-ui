import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';

// Components
import Container from './containers/Container';
import Header from './containers/Header/index';
// import Navigation from './containers/navigation';
import Logo from '@components/Logo';
// import Body from './containers/body';
// import AddListModal from './containers/addListModal';
import EditListModal from './containers/editListModal';
// import EditTaskModal from './containers/editTaskModal';
// import UserSettingsModal from './containers/userSettingsModal';

const App = () => (
    <Switch>
        <Route path="/:listd">
            <Container>
                <Logo />
                <Header />
                <EditListModal />
                {/*
                <Navigation />
                <Body />
                <AddListModal />
                <EditListModal />
                <EditTaskModal />
                <UserSettingsModal /> */}
            </Container>
        </Route>
        <Redirect from="/" to="/inbox" />
    </Switch>
);

export default App;
