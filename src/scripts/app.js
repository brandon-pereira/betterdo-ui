import Header from './components/header';
import Navigation from './components/navigation';
import Modals from './components/modals';
import Logo from './components/logo';
import {Provider} from 'react-redux';
import store from './store';

export default (React, reactDOM) => {
  reactDOM.render(
    <Provider store={store}>
      <div className="app">
        <Logo />
        <Header />
        <Navigation />
        <Modals />
      </div>
    </Provider>,
    document.querySelector('.container')
  );
}
