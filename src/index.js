import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const app = (
	<App/>
);

ReactDOM.render(app, document.querySelector('#root'));
