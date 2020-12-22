import React from 'react';

// Components
import Container from './containers/Container';
import Header from './containers/Header';
import Navigation from './containers/Navigation';
import Logo from './containers/Logo';
import Body from './containers/Body';
import AddListModal from './containers/AddListModal';
import EditListModal from './containers/EditListModal';
import EditTaskModal from './containers/EditTaskModal';
import { Route } from 'react-router-dom';
import UserSettingsModal from './containers/userSettingsModal';

const App = () => (
    <>
        <Container>
            <Logo />
            <Header />
            <Navigation />
            <Body />
            {/* <UserSettingsModal /> */}
        </Container>
        <>
            <Route
                // eslint-disable-next-line react/no-children-prop
                children={({ match }) => (
                    <AddListModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/create-list"
            />
            <Route
                // eslint-disable-next-line react/no-children-prop
                children={({ match }) => (
                    <EditListModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/edit-list"
            />
            <Route
                // eslint-disable-next-line react/no-children-prop
                children={({ match }) => (
                    <EditTaskModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/edit-task/:currentTaskId"
            />
            <Route
                // eslint-disable-next-line react/no-children-prop
                children={({ match }) => (
                    <UserSettingsModal isOpen={Boolean(match)} />
                )}
                path="/:currentListId/account-settings/:subroute?"
            />
        </>
    </>
);

export default App;
