import React, { useState, useEffect } from 'react';
import { createBond, BondResponse } from '../api/bondsAPI.ts';

const BondInvestmentForm: React.FC = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');
    const [results, setResults] = useState<BondResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState('dark'); // Default theme

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const handleSubmit = async () => {
        try {
            const response = await createBond({ monthlyInvestment, investmentYears });
            setResults(response);
            setError(null);
        } catch (err) {
            setError('Error calculating bond investment');
            setResults(null);
        }
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Bond Investment Calculator</h1>
            <button className="btn btn-primary btn-outline" onClick={handleThemeChange}>Toggle Theme</button>
            <div className="form-control">
                <label className="label" htmlFor="monthlyInvestment">
                    <span className="label-text">Monthly Investment:</span>
                </label>
                <input
                    type="number"
                    id="monthlyInvestment"
                    className="input input-bordered"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label" htmlFor="investmentYears">
                    <span className="label-text">Investment Years:</span>
                </label>
                <input
                    type="number"
                    id="investmentYears"
                    className="input input-bordered"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>Calculate</button>
            {error && <p className="text-error">{error}</p>}
            {results && (
                <div className="mt-4">
                    <p>Total Savings: {results.totalSavings}</p>
                    <p>Total Savings Without Bonds: {results.totalSavingsWithoutBonds}</p>
                    <p>Difference: {results.difference}</p>
                    <ul>
                        {results.bondDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BondInvestmentForm;