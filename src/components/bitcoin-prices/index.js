import React, {useState, useEffect} from 'react';
import './bitcoin-prices.scss';
import axios from 'axios';
import {AttentionSeeker} from "react-awesome-reveal";

function BitcoinPrices() {
    const apiEndPoint = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    const [data, setData] = useState();
    const [lastFetch, setLastFetch] = useState();

    useEffect(() => {
        fetchData();
        const invervalTime = 1000 * 30; // 30 Sec
        const interval = setInterval(() => fetchData(), invervalTime);

        return () => clearInterval(interval)
    }, []);

    async function fetchData() {
        axios.get(apiEndPoint)
            .then(res => {
                const data = res.data;
                setData(data);
                const currentDate = new Date();
                setLastFetch(`${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`)
            })
    }

    return (
        <div className="container">
            <div className="title">
                <span>1 BitCoin Price</span>
            </div>
            <div className="bitcoin-prices">
                <div className="row" style={{"background-color": "#aafaff"}}>
                    <div className="label">
                        USD
                    </div>
                    <div className="value" key={data?.time?.updated}>
                        <AttentionSeeker effect={"flash"}>
                            <span>{data?.bpi?.USD?.rate_float?.toFixed(4)}</span>
                        </AttentionSeeker>
                    </div>
                </div>
                <div className="row" style={{"background-color": "#cfffe5"}}>
                    <div className="label">
                        GBP
                    </div>
                    <div className="value" key={data?.time?.updated}>
                        <AttentionSeeker effect={"flash"}>
                            <span>{data?.bpi?.GBP?.rate_float?.toFixed(4)}</span>
                        </AttentionSeeker>
                    </div>
                </div>
                <div className="row last" style={{"background-color": " #e8e8e8"}}>
                    <div className="label">
                        EUR
                    </div>
                    <div className="value" key={data?.time?.updated}>
                        <AttentionSeeker effect={"flash"}>
                            <span>{data?.bpi?.EUR?.rate_float?.toFixed(4)}</span>
                        </AttentionSeeker>
                    </div>
                </div>
            </div>
            <div className="extra-info">
                <span>Last Fetched : {lastFetch}</span>
            </div>
        </div>

    );
}

export default BitcoinPrices;
