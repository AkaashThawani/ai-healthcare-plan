/**
 * API client for communicating with the backend server.
 * Uses axios for HTTP requests with proper error handling.
 */
import axios, { AxiosError } from 'axios';
import type { PatientInput, CarePlanOutput, HealthCheckResponse, APIError } from '../types';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout for AI generation
});

/**
 * Check backend health status
 */
export async function checkHealth(): Promise<HealthCheckResponse> {
  try {
    const response = await apiClient.get<HealthCheckResponse>('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('Unable to connect to backend server');
  }
}

/**
 * Generate a care plan for a patient
 */
export async function generateCarePlan(patientData: PatientInput): Promise<CarePlanOutput> {
  try {
    const response = await apiClient.post<CarePlanOutput>(
      '/generate-care-plan',
      patientData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<APIError>;

      if (axiosError.response) {
        // Server responded with error
        const errorMessage = axiosError.response.data?.detail || 'Failed to generate care plan';
        throw new Error(errorMessage);
      } else if (axiosError.request) {
        // Request made but no response
        throw new Error('No response from server. Please check if the backend is running.');
      }
    }

    // Generic error
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

/**
 * Format error message for display to user
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
