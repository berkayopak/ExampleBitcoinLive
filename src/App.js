import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Counter from './components/counter';
import BitcoinPrices from "./components/bitcoin-prices";

function App() {
    const start_time = new Date();
    let end_time = new Date(start_time).setHours(start_time.getHours() + 10);

    return (
        <div className="app-container">
            <Counter endTime={end_time} className="counter"/>
            <BitcoinPrices className="bitcoin-prices"/>
        </div>
    );
}

export default App;
