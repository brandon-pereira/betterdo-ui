import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Container from './containers/Container';
import Header from './containers/Header';
import Navigation from './containers/Navigation';
import Logo from './containers/Logo';
import Body from './containers/Body';
import AddListModal from './containers/AddListModal';
import EditListModal from './containers/EditListModal';
import EditTaskModal from './containers/EditTaskModal';
import UserSettingsModal from './containers/UserSettingsModal';

import Helmet from '@components/Helmet';

const App = () => {
    useEffect(() => {
        document.body.classList.add('loaded');
        document.querySelector('#critical-css')?.remove();
    }, []);

    return (
        <>
            <Helmet />
            <Container>
                <Logo />
                <Navigation />
                <Header />
                <Body />
            </Container>
            <AnimatePresence>
                {/* 
                    We can get unmount animations once this open issue is resolved:
                    I've previously added   <Routes location={location} key={location.pathname}>
                    which works but causes app to error when you change lists. No good.
                    https://github.com/remix-run/react-router/issues/7117 
                */}
                <Routes>
                    <Route
                        element={<AddListModal isOpen={true} />}
                        path="create-list"
                        key="create-list"
                    />
                    <Route
                        element={<EditListModal isOpen={true} />}
                        path="edit-list/:section"
                    />
                    <Route
                        element={<EditTaskModal isOpen={true} />}
                        path="edit-task/:currentTaskId"
                    />
                    <Route
                        element={<UserSettingsModal isOpen={true} />}
                        path="profile-settings/:section"
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
