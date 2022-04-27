import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';

import App from './App';
import store from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import {Provider} from 'react-redux';

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.querySelector('#root'));
