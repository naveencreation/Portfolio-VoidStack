import type { Portfolio } from '@/types/portfolio';

const API_BASE = '/api';

export async function fetchPortfolio(): Promise<Portfolio> {
    const response = await fetch(`${API_BASE}/portfolio`);
    if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
    }
    return response.json();
}

export async function submitContactForm(data: {
    name: string;
    email: string;
    message: string;
}): Promise<void> {
    const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to submit contact form');
    }
}
