// lib/types.ts
export interface AlertData {
    type: 'follow' | 'donate' | 'sub' | 'raid' | 'host';
    username: string;
    message: string;
    amount?: string;
    image?: string;
}

export interface ApiResponse {
    alert: AlertData | null;
    error?: string;
}