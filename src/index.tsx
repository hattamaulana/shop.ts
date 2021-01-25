import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Route from './Routes';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import './index.css';
import configutreStore, { IApplicationState } from './Store';

interface IProps {
  store: Store<IApplicationState>;
}

const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <Route />
    </Provider>
  );
}

const store = configutreStore();
ReactDOM.render(<Root store={store} />, document.getElementById('root') as HTMLElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
