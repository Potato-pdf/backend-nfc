export interface NfcScanRequest {
    uid: string;
}

export interface NfcKey {
    id: string;
    uid: string;
    fechaCreacion: Date | null;
}

export interface NfcScanResponse {
    success: boolean;
    message: string;
    nfcKey: NfcKey | null;
}

export interface ErrorResponse {
    error: string;
}
