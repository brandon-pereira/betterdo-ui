/* eslint react/no-children-prop: off */
import React from 'react';

// Components
import { Route } from 'react-router-dom';

import Container from './containers/Container';
import Header from './containers/Header';
import Navigation from './containers/Navigation';
import Logo from './containers/Logo';
import Body from './containers/Body';
import AddListModal from './containers/AddListModal';
import EditListModal from './containers/EditListModal';
import EditTaskModal from './containers/EditTaskModal';
import UserSettingsModal from './containers/UserSettingsModal';
import InboxRedirect from './containers/Redirects/InboxRedirect';

import Helmet from '@components/Helmet';

const App = () => (
    <>
        <Helmet />
        <Container>
            <Logo />
            <Navigation />
            <Header />
            <Body />
        </Container>
        <>
            <InboxRedirect />
            <Route
                children={({ match }) => (
                    <AddListModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/create-list"
            />
            <Route
                children={({ match }) => (
                    <EditListModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/edit-list"
            />
            <Route
                children={({ match }) => (
                    <EditTaskModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/edit-task/:currentTaskId"
            />
            <Route
                children={({ match }) => (
                    <UserSettingsModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/account-settings/:subroute?"
            />
        </>
    </>
);

export default App;
