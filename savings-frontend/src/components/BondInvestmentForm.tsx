import React, { useState, useEffect } from 'react';
import { createBond, BondResponse } from '../api/bondsAPI.ts';

const BondInvestmentForm: React.FC = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');
    const [reinvest, setReinvest] = useState(false);
    const [results, setResults] = useState<BondResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const handleSubmit = async () => {
        try {
            const response = await createBond({ monthlyInvestment, investmentYears, reinvest });
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
            <label className="flex gap-2 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <input type="checkbox" value="synthwave" className="toggle theme-controller"
                       onClick={handleThemeChange}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                </svg>
            </label>
            <h1 className="text-3xl font-bold mb-10 mt-10">Bond Investment Calculator</h1>
            <div className="form-control mb-5">
                <label className="label font-semibold" htmlFor="monthlyInvestment">
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
            <div className="form-control mb-5">
                <label className="label font-semibold" htmlFor="investmentYears">
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
            <div className="form-control mb-5 text-left">
                <div className="label">
                    <span className="label-text font-semibold">Reinvest profits?</span>
                </div>
                <label className="swap swap-rotate flex justify-start items-center">
                    <input type="checkbox" checked={reinvest} onChange={(e) => setReinvest(e.target.checked)}/>
                    <div className="swap-on">YES</div>
                    <div className="swap-off">NO</div>
                </label>
            </div>
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>Calculate</button>
            {error && <p className="text-error">{error}</p>}
            {results && (
                <div className="mt-4 p-4 bg-base-200 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-3">Results</h2>
                    <div className="stats shadow">
                        <div className="stat">
                        <div className="stat-title">Total Savings</div>
                            <div className="stat-value">{results.totalSavings}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Savings w/o Bonds</div>
                            <div className="stat-value">{results.totalSavingsWithoutBonds}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Difference</div>
                            <div className="stat-value">{results.difference}</div>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Detail</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.bondDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BondInvestmentForm;