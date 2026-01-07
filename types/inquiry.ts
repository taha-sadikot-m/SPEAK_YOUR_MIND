export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  id?: number;
  error?: string;
}
