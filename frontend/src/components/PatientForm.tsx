/**
 * PatientForm component - Improved UI with searchable selects and better formatting.
 * Clean, medical-professional interface with preset options.
 */
import { useState, FormEvent } from "react";
import type { PatientInput, Medication } from "../types";
import { mockPatients } from "../data/mockPatients";
import { SearchableSelect } from "./SearchableSelect";
import {
  COMMON_SYMPTOMS,
  COMMON_FALL_RISK_FACTORS,
  COMMON_COMORBIDITIES,
  COMMON_ALLERGIES,
} from "../data/presets";

interface PatientFormProps {
  onSubmit: (patient: PatientInput) => void;
  isLoading: boolean;
}

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientInput>({
    name: "",
    age: 65,
    gender: "Male",
    admission_date: new Date().toISOString().split("T")[0],
    facility: "",
    primary_diagnosis: "",
    comorbidities: [],
    blood_pressure: "",
    heart_rate: 75,
    temperature: 98.6,
    oxygen_saturation: 98,
    pain_level: 0,
    current_medications: [],
    allergies: [],
    symptoms: [],
    mobility_level: "ambulatory",
    adl_independence: "",
    fall_risk_factors: [],
    cognitive_status: "",
    isolation_precautions: null,
    diet_restrictions: null,
  });

  const [medicationInputs, setMedicationInputs] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });

  const handleInputChange = (
    field: keyof PatientInput,
    value: string | number | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: keyof PatientInput, value: string) => {
    if (!value.trim()) return;
    const currentArray = formData[field] as string[];
    if (!currentArray.includes(value.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentArray, value.trim()],
      }));
    }
  };

  const handleArrayRemove = (field: keyof PatientInput, index: number) => {
    const currentArray = formData[field] as string[];
    setFormData((prev) => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index),
    }));
  };

  const handleMedicationAdd = () => {
    const { name, dosage, frequency } = medicationInputs;
    if (!name.trim() || !dosage.trim() || !frequency.trim()) return;

    const newMed: Medication = {
      name: name.trim(),
      dosage: dosage.trim(),
      frequency: frequency.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      current_medications: [...prev.current_medications, newMed],
    }));

    setMedicationInputs({ name: "", dosage: "", frequency: "" });
  };

  const handleMedicationRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      current_medications: prev.current_medications.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const handleLoadMockPatient = (index: number) => {
    const mockPatient = mockPatients[index];
    if (mockPatient) {
      setFormData(mockPatient);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-blue-100">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Patient Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete the form below to generate a care plan
          </p>
        </div>
        <div className="no-print">
          <label className="text-xs text-gray-600 block mb-1">
            Quick Load:
          </label>
          <select
            onChange={(e) => handleLoadMockPatient(parseInt(e.target.value))}
            className="text-sm px-3 py-2 border border-gray-300 rounded-md hover:border-blue-500 transition-colors"
            defaultValue=""
          >
            <option value="" disabled>
              Load Mock Patient
            </option>
            {mockPatients.map((patient, idx) => (
              <option key={idx} value={idx}>
                {patient.name} ({patient.age}yo -{" "}
                {patient.primary_diagnosis.substring(0, 30)}...)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">👤</span> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label text-base">Patient Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="form-input text-base"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">Age *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value))
              }
              className="form-input text-base"
              min="0"
              max="120"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">Gender *</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="form-input text-base"
              required
              disabled={isLoading}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="form-label text-base">Admission Date *</label>
            <input
              type="date"
              value={formData.admission_date}
              onChange={(e) =>
                handleInputChange("admission_date", e.target.value)
              }
              className="form-input text-base"
              required
              disabled={isLoading}
            />
          </div>
          <div className="md:col-span-2">
            <label className="form-label text-base">Facility *</label>
            <input
              type="text"
              value={formData.facility}
              onChange={(e) => handleInputChange("facility", e.target.value)}
              className="form-input text-base"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏥</span> Medical History
        </h3>
        <div className="space-y-6">
          <div>
            <label className="form-label text-base">Primary Diagnosis *</label>
            <input
              type="text"
              value={formData.primary_diagnosis}
              onChange={(e) =>
                handleInputChange("primary_diagnosis", e.target.value)
              }
              className="form-input text-base"
              placeholder="e.g., Congestive Heart Failure, Stroke, COPD"
              required
              disabled={isLoading}
            />
          </div>
          <SearchableSelect
            label="Comorbidities"
            options={COMMON_COMORBIDITIES}
            selectedValues={formData.comorbidities}
            onAdd={(value) => handleArrayAdd("comorbidities", value)}
            onRemove={(index) => handleArrayRemove("comorbidities", index)}
            placeholder="Type to search or add custom comorbidity..."
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Current Vitals */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">❤️</span> Current Vitals
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label text-base">Blood Pressure *</label>
            <input
              type="text"
              value={formData.blood_pressure}
              onChange={(e) =>
                handleInputChange("blood_pressure", e.target.value)
              }
              className="form-input text-base"
              placeholder="120/80"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">Heart Rate (bpm) *</label>
            <input
              type="number"
              value={formData.heart_rate}
              onChange={(e) =>
                handleInputChange("heart_rate", parseInt(e.target.value))
              }
              className="form-input text-base"
              min="20"
              max="300"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">Temp (°F) *</label>
            <input
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) =>
                handleInputChange("temperature", parseFloat(e.target.value))
              }
              className="form-input text-base"
              min="90"
              max="110"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">O2 Sat (%) *</label>
            <input
              type="number"
              value={formData.oxygen_saturation}
              onChange={(e) =>
                handleInputChange("oxygen_saturation", parseInt(e.target.value))
              }
              className="form-input text-base"
              min="0"
              max="100"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">Pain Level (0-10) *</label>
            <input
              type="number"
              value={formData.pain_level}
              onChange={(e) =>
                handleInputChange("pain_level", parseInt(e.target.value))
              }
              className="form-input text-base"
              min="0"
              max="10"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">💊</span> Current Medications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={medicationInputs.name}
            onChange={(e) =>
              setMedicationInputs((prev) => ({ ...prev, name: e.target.value }))
            }
            className="form-input text-base"
            placeholder="Medication name"
            disabled={isLoading}
          />
          <input
            type="text"
            value={medicationInputs.dosage}
            onChange={(e) =>
              setMedicationInputs((prev) => ({
                ...prev,
                dosage: e.target.value,
              }))
            }
            className="form-input text-base"
            placeholder="Dosage (e.g., 10mg)"
            disabled={isLoading}
          />
          <input
            type="text"
            value={medicationInputs.frequency}
            onChange={(e) =>
              setMedicationInputs((prev) => ({
                ...prev,
                frequency: e.target.value,
              }))
            }
            className="form-input text-base"
            placeholder="Frequency (e.g., BID)"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleMedicationAdd}
            className="btn-secondary text-base"
            disabled={isLoading}
          >
            + Add Med
          </button>
        </div>
        {formData.current_medications.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.current_medications.map((med, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
              >
                <span className="text-base">
                  <strong>{med.name}</strong> - {med.dosage} {med.frequency}
                </span>
                <button
                  type="button"
                  onClick={() => handleMedicationRemove(idx)}
                  className="text-red-600 hover:text-red-800 font-bold"
                  disabled={isLoading}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Allergies */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span> Allergies
        </h3>
        <SearchableSelect
          label=""
          options={COMMON_ALLERGIES}
          selectedValues={formData.allergies}
          onAdd={(value) => handleArrayAdd("allergies", value)}
          onRemove={(index) => handleArrayRemove("allergies", index)}
          placeholder="Type to search allergies or add custom..."
          disabled={isLoading}
        />
      </div>

      {/* Clinical Status */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span> Clinical Status
        </h3>
        <div className="space-y-6">
          <SearchableSelect
            label="Current Symptoms"
            options={COMMON_SYMPTOMS}
            selectedValues={formData.symptoms}
            onAdd={(value) => handleArrayAdd("symptoms", value)}
            onRemove={(index) => handleArrayRemove("symptoms", index)}
            placeholder="Type to search symptoms or add custom..."
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label text-base">Mobility Level *</label>
              <select
                value={formData.mobility_level}
                onChange={(e) =>
                  handleInputChange("mobility_level", e.target.value)
                }
                className="form-input text-base"
                required
                disabled={isLoading}
              >
                <option value="ambulatory">Ambulatory</option>
                <option value="wheelchair">Wheelchair</option>
                <option value="bedbound">Bedbound</option>
                <option value="walker">Walker</option>
              </select>
            </div>
            <div>
              <label className="form-label text-base">ADL Independence *</label>
              <input
                type="text"
                value={formData.adl_independence}
                onChange={(e) =>
                  handleInputChange("adl_independence", e.target.value)
                }
                className="form-input text-base"
                placeholder="e.g., Requires assistance with all ADLs"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <SearchableSelect
            label="Fall Risk Factors"
            options={COMMON_FALL_RISK_FACTORS}
            selectedValues={formData.fall_risk_factors}
            onAdd={(value) => handleArrayAdd("fall_risk_factors", value)}
            onRemove={(index) => handleArrayRemove("fall_risk_factors", index)}
            placeholder="Type to search fall risks or add custom..."
            disabled={isLoading}
          />

          <div>
            <label className="form-label text-base">Cognitive Status *</label>
            <input
              type="text"
              value={formData.cognitive_status}
              onChange={(e) =>
                handleInputChange("cognitive_status", e.target.value)
              }
              className="form-input text-base"
              placeholder="e.g., Alert and oriented x3, or Confused"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Special Considerations */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔔</span> Special Considerations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label text-base">
              Isolation Precautions
            </label>
            <input
              type="text"
              value={formData.isolation_precautions || ""}
              onChange={(e) =>
                handleInputChange(
                  "isolation_precautions",
                  e.target.value || null,
                )
              }
              className="form-input text-base"
              placeholder="None (or specify type)"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label text-base">Diet Restrictions</label>
            <input
              type="text"
              value={formData.diet_restrictions || ""}
              onChange={(e) =>
                handleInputChange("diet_restrictions", e.target.value || null)
              }
              className="form-input text-base"
              placeholder="None (or specify restrictions)"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t-2 border-blue-100">
        <button
          type="submit"
          className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-shadow"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-3">
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Care Plan...
            </span>
          ) : (
            "🚀 Generate Care Plan"
          )}
        </button>
      </div>
    </form>
  );
}
