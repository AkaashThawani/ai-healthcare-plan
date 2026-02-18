/**
 * TypeScript types for the Care Plan Generator application.
 * These types mirror the backend Pydantic models.
 */

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface PatientInput {
  // Basic Information
  name: string;
  age: number;
  gender: string;
  admission_date: string; // ISO date string
  facility: string;

  // Medical History
  primary_diagnosis: string;
  comorbidities: string[];

  // Current Vitals
  blood_pressure: string;
  heart_rate: number;
  temperature: number;
  oxygen_saturation: number;
  pain_level: number;

  // Medications & Allergies
  current_medications: Medication[];
  allergies: string[];

  // Clinical Status
  symptoms: string[];
  mobility_level: string;
  adl_independence: string;
  fall_risk_factors: string[];
  cognitive_status: string;

  // Special Considerations
  isolation_precautions: string | null;
  diet_restrictions: string | null;
}

export interface CarePlanOutput {
  patient_name: string;
  care_plan_html: string;
  generated_at: string;
}

export interface HealthCheckResponse {
  status: string;
  environment: string;
  version: string;
}

export interface APIError {
  detail: string;
}

// Form field types for better type safety
export type MobilityLevel = 'ambulatory' | 'wheelchair' | 'bedbound' | 'walker';
export type Gender = 'Male' | 'Female' | 'Other';
