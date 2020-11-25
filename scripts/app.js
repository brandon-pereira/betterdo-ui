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
// import UserSettingsModal from './containers/userSettingsModal';

const App = () => (
    <Container>
        <Logo />
        <Header />
        <Navigation />
        <Body />
        <AddListModal />
        <EditListModal />
        <EditTaskModal />
        {/* <UserSettingsModal /> */}
    </Container>
);

export default App;
