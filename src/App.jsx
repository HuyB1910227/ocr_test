import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './index.css';
import 'antd/dist/reset.css';
import Router from './routes/route';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Router />
        </>
    );
}

export default App;
