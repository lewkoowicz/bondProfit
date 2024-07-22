import React, {useState} from 'react';
import {BondResponse, createBond} from '../api/bondsAPI.ts';
import FormInput from './FormInput';
import Button from './Button';
import {useNavigate} from 'react-router-dom';

const BondInvestmentForm: React.FC = () => {
    const navigate = useNavigate();
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');
    const [reinvest, setReinvest] = useState(true);
    const [results, setResults] = useState<BondResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await createBond({ monthlyInvestment, investmentYears, reinvest });
            setResults(response);
            setError(null);
            navigate('/results', { state: { results: response } });
        } catch (err) {
            setError('Error calculating bond investment');
            setResults(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen text-base-content gap-4 p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-10 mt-10 text-center w-full">Bond Investment Calculator</h1>
            <div className="form-control w-full max-w-xs p-8 bg-base-200 shadow-xl rounded-lg">
                <FormInput
                    label="Monthly Investment:"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                />
                <FormInput
                    label="Investment Years:"
                    type="number"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(e.target.value)}
                />
                <div className="form-control mb-5 text-left">
                    <label className="label">
                        <span className="label-text font-semibold">Reinvest profits?</span>
                    </label>
                    <label className="swap">
                        <input type="checkbox" checked={reinvest} onChange={(e) => setReinvest(e.target.checked)}/>
                        <div className="swap-on">Yes</div>
                        <div className="swap-off">No</div>
                    </label>
                </div>
                <Button onClick={handleSubmit} text="Calculate"/>
                {error && <p className="text-error">{error}</p>}
                {results && (
                    <div className="mt-4 p-4 bg-base-200 rounded-lg shadow w-full">
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
                            <table className="table w-full">
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
        </div>
    );
};

export default BondInvestmentForm;
