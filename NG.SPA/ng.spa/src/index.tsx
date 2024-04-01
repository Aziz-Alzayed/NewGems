import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals';
import './index.css'
import 'antd/dist/reset.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const NODE_ENV = process.env.NODE_ENV;
console.log('Application mode:' + NODE_ENV + ' mode');
if (NODE_ENV === 'development') {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    root.render(
        <App />
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
