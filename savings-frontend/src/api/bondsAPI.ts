const BASE_URL = 'http://localhost:8080';

interface BondData {
    monthlyInvestment: string;
    investmentYears: string;
    reinvest: boolean;
}

export interface BondResponse {
    bondDetails: string[];
    totalSavings: string;
    totalSavingsWithoutBonds: string;
    difference: string;
}

export const createBond = async (data: BondData): Promise<BondResponse> => {
    const response = await fetch(`${BASE_URL}/api/bonds/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create bond investment');
    }

    return response.json();
};
