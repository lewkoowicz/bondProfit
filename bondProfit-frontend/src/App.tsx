import BondInvestmentForm from './components/BondInvestmentForm.tsx';
import BondResults from "./components/BondResults.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="flex flex-col min-h-screen">
                        <div className="flex-grow flex items-center justify-center">
                            <BondInvestmentForm/>
                        </div>
                    </div>
                }/>
                <Route path="/results" element={
                    <div className="flex flex-col min-h-screen">
                        <div className="flex-grow flex items-center justify-center">
                            <BondResults/>
                        </div>
                    </div>
                }/>
            </Routes>
        </Router>
    );
}

export default App;
