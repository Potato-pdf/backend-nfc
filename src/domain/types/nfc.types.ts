export interface NfcScanRequest {
    uid: string;
}

export interface NfcUser {
    id: string;
    uid: string;
    nombre: string;
    fechaCreacion: Date | null;
}

export interface NfcScanResponse {
    success: boolean;
    message: string;
    user: NfcUser | null;
}

export interface ErrorResponse {
    error: string;
}
