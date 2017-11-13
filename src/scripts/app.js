import Header from './components/header';
import Navigation from './components/navigation';
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
      </div>
    </Provider>,
    document.querySelector('.container')
  );
}
