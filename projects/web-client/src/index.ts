import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ts/components/App';

const root = document.getElementById("react-root");
ReactDOM.render(React.createElement(App,{}), root);
