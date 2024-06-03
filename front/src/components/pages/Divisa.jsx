import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../../pages/dashboard/DashboardPage';

export const Divisa = () => {
    const [fromCurrency, setFromCurrency] = useState('GTQ');
    const [toCurrency, setToCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(null);

    const chartRef = useRef(null);

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/b1c38d8ad7bc85a61bbc383c/latest/${fromCurrency}`);
                const data = await response.json();
                const rate = data.conversion_rates[toCurrency];
                setConvertedAmount((rate * amount).toFixed(2));

                // Actualizar el gráfico
                updateChart(data.conversion_rates);
            } catch (error) {
                console.error('Error al obtener la tasa de conversión:', error);
            }
        };

        fetchConversionRate();
    }, [fromCurrency, toCurrency, amount]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const updateChart = (conversionRates) => {
        const currencies = {
            USD: 'Dólar estadounidense',
            GBP: 'Libra esterlina',
            EUR: 'Euro',
            JPY: 'Yen japonés',
            CHF: 'Franco suizo'
        };
    
        const labels = Object.keys(currencies).map(currency => `${currencies[currency]}`); // Etiquetas para el gráfico
        const data = Object.keys(currencies).map(currency => 1 / conversionRates[currency]); // Datos de las tasas de conversión invertidas
    
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'line', 
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Tipo de cambio a ${fromCurrency}`,
                        data: data,
                        fill: false,
                        borderColor: '#940018',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    };
    
      
    
    return (
    <div className="divisa-container">
        <h2 className="divisa-header">Conversor de Divisas</h2>
        <div className="divisa-input-container">
            <input type="number" value={amount} onChange={handleAmountChange} className="divisa-input" />
            <select value={fromCurrency} onChange={handleFromCurrencyChange} className="divisa-select">
                <option value="GTQ">Quetzal guatemalteco</option>
                <option value="USD">Dólar estadounidense</option>
                <option value="GBP">Libra esterlina</option>
                <option value="EUR">Euro</option>
                <option value="JPY">Yen japonés</option>
                <option value="CHF">Franco suizo</option>
            </select>
            <span className="divisa-arrow">⬌ </span>
            <select value={toCurrency} onChange={handleToCurrencyChange} className="divisa-select">
                <option value="USD">Dólar estadounidense</option>
                <option value="GTQ">Quetzal guatemalteco</option>
                <option value="GBP">Libra esterlina</option>
                <option value="EUR">Euro</option>
                <option value="JPY">Yen japonés</option>
                <option value="CHF">Franco suizo</option>
            </select>
        </div>
        <div className="divisa-result">
            <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
        </div>
        <div className="divisa-chart-container">
            <canvas ref={chartRef} className="divisa-chart" style={{ width: '700px', height: '400px' }} />
        </div>
    </div>
);

    
};
