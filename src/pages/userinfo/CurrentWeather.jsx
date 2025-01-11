import React, { useState, useEffect } from "react"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/Dressify.css'
import CurrentDate from './CurrentDate'

const weatherIcons = {
    '晴天': './src/assets/img/weatherIcon/01.svg',
    '晴時多雲': './src/assets/img/weatherIcon/02.svg',
    '多雲時晴': './src/assets/img/weatherIcon/03.svg',
    '多雲': './src/assets/img/weatherIcon/04.svg',
    '多雲時陰': './src/assets/img/weatherIcon/05.svg',
    '陰時多雲': './src/assets/img/weatherIcon/06.svg',
    '陰天': './src/assets/img/weatherIcon/07.svg',
    '多雲陣雨': './src/assets/img/weatherIcon/08.svg',
    '多雲短暫雨': './src/assets/img/weatherIcon/08.svg',
    '多雲短暫陣雨': './src/assets/img/weatherIcon/08.svg',
    '短暫陣雨': './src/assets/img/weatherIcon/08.svg',
    '多雲時晴短暫陣雨': './src/assets/img/weatherIcon/08.svg',
    '多雲時晴短暫雨': './src/assets/img/weatherIcon/08.svg',
    '晴時多雲短暫陣雨': './src/assets/img/weatherIcon/08.svg',
    '晴短暫陣雨': './src/assets/img/weatherIcon/08.svg',
    '短暫雨': './src/assets/img/weatherIcon/08.svg',
    '多雲時陰短暫雨': './src/assets/img/weatherIcon/09.svg',
    '多雲時陰短暫陣雨': './src/assets/img/weatherIcon/09.svg',
    '雨天': './src/assets/img/weatherIcon/10.svg',
    '晴午後陰短暫雨': './src/assets/img/weatherIcon/10.svg',
    '晴午後陰短暫陣雨': './src/assets/img/weatherIcon/10.svg',
    '陰短暫雨': './src/assets/img/weatherIcon/10.svg',
    '陰短暫陣雨': './src/assets/img/weatherIcon/10.svg',
    '陰午後短暫陣雨': './src/assets/img/weatherIcon/10.svg',
    
};

function CurrentWeather() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    // API Key 和 API URL
    const apiKey = 'CWA-63322137-99B6-452C-A561-1026F2DC9505';
    const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-63322137-99B6-452C-A561-1026F2DC9505&format=JSON&locationName=%E8%87%BA%E4%B8%AD%E5%B8%82&elementName=`;

    // 獲取天氣資料
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                console.log(response.data);
                const data = response.data;
                const weather = data.records.location[0].weatherElement;

                // 獲取最新資料
                const currentWx = weather.find(item => item.elementName === "Wx")?.time[0]?.parameter?.parameterName || '未知';
                const currentPop = weather.find(item => item.elementName === "PoP")?.time[0]?.parameter?.parameterName || '0%';
                const currentMinTemp = weather.find(item => item.elementName === "MinT")?.time[0]?.parameter?.parameterName || '未知';
                const currentMaxTemp = weather.find(item => item.elementName === "MaxT")?.time[0]?.parameter?.parameterName || '未知';
                const currentCi = weather.find(item => item.elementName === "CI")?.time[0]?.parameter?.parameterName || '未知';

                setWeatherData({
                    city: '臺中市',
                    description: currentWx,  // 天氣描述
                    minTemp: currentMinTemp, // 最低溫
                    maxTemp: currentMaxTemp, // 最高溫
                    precipitation: currentPop, // 降雨機率
                    currentDescription: currentCi, // 濕度及天氣描述
                    icon: weatherIcons[currentWx] // 天氣圖示
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("獲取失敗", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid align-items-center text-m py-3" style={{ backgroundColor: '#F8F9F3' }}>
            <div className="d-flex flex-nowrap align-items-center justify-content-evenly">
                {/* 天氣圖示 */}
                <img src={weatherData.icon} alt="Weather Icon" width="100px" />
                <div className="text-xs my-1">
                    {/* 目前城市 */}
                    <div>{weatherData.city}</div>
                    {/* 天氣描述 */}
                    <div>{weatherData.description}</div>
                    {/* 最高溫 & 最低溫 */}
                    <div>
                        <span className="ms-4 text-center" id="maxTemp" style={{ fontSize: "25px" }}><b>{weatherData.maxTemp}℃</b></span>
                    </div>
                    <div><span>最低溫：</span><span id="minTemp">{weatherData.minTemp}℃</span></div>
                    {/* 降雨機率 & 濕度 */}
                    <div>
                        <span>降雨機率：</span><span id="precipitation">{weatherData.precipitation}%</span>
                    </div>
                    <div>
                        <span>體感：</span><span id="currentDescription">{weatherData.currentDescription}</span>
                    </div>
                </div>
            </div>
            {/* 當天日期 */}
            <div><CurrentDate /></div>
        </div>
    );
}

export default CurrentWeather