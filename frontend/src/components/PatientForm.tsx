/**
 * PatientForm component - Input form for patient data.
 * Clean, medical-professional UI with validation.
 */
import { useState, FormEvent } from 'react';
import type { PatientInput, Medication } from '../types';
import { mockPatients } from '../data/mockPatients';

interface PatientFormProps {
  onSubmit: (patient: PatientInput) => void;
  isLoading: boolean;
}

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientInput>({
    name: '',
    age: 65,
    gender: 'Male',
    admission_date: new Date().toISOString().split('T')[0],
    facility: '',
    primary_diagnosis: '',
    comorbidities: [],
    blood_pressure: '',
    heart_rate: 75,
    temperature: 98.6,
    oxygen_saturation: 98,
    pain_level: 0,
    current_medications: [],
    allergies: [],
    symptoms: [],
    mobility_level: 'ambulatory',
    adl_independence: '',
    fall_risk_factors: [],
    cognitive_status: '',
    isolation_precautions: null,
    diet_restrictions: null,
  });

  const [tempInputs, setTempInputs] = useState({
    comorbidity: '',
    allergy: '',
    symptom: '',
    fallRisk: '',
    medicationName: '',
    medicationDosage: '',
    medicationFrequency: '',
  });

  const handleInputChange = (field: keyof PatientInput, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: keyof PatientInput, value: string, tempField: keyof typeof tempInputs) => {
    if (!value.trim()) return;
    const currentArray = formData[field] as string[];
    setFormData((prev) => ({ ...prev, [field]: [...currentArray, value.trim()] }));
    setTempInputs((prev) => ({ ...prev, [tempField]: '' }));
  };

  const handleArrayRemove = (field: keyof PatientInput, index: number) => {
    const currentArray = formData[field] as string[];
    setFormData((prev) => ({ ...prev, [field]: currentArray.filter((_, i) => i !== index) }));
  };

  const handleMedicationAdd = () => {
    const { medicationName, medicationDosage, medicationFrequency } = tempInputs;
    if (!medicationName.trim() || !medicationDosage.trim() || !medicationFrequency.trim()) return;

    const newMed: Medication = {
      name: medicationName.trim(),
      dosage: medicationDosage.trim(),
      frequency: medicationFrequency.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      current_medications: [...prev.current_medications, newMed],
    }));

    setTempInputs((prev) => ({
      ...prev,
      medicationName: '',
      medicationDosage: '',
      medicationFrequency: '',
    }));
  };

  const handleMedicationRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      current_medications: prev.current_medications.filter((_, i) => i !== index),
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
    <form onSubmit={handleSubmit} className="card space-y-6">
      {/* Header with Mock Data Buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Patient Information</h2>
        <div className="flex gap-2 no-print">
          <select
            onChange={(e) => handleLoadMockPatient(parseInt(e.target.value))}
            className="text-sm px-3 py-1 border border-gray-300 rounded-md"
            defaultValue=""
          >
            <option value="" disabled>Load Mock Patient</option>
            {mockPatients.map((patient, idx) => (
              <option key={idx} value={idx}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="section-title">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Patient Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Age *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              className="form-input"
              min="0"
              max="120"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Gender *</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="form-label">Admission Date *</label>
            <input
              type="date"
              value={formData.admission_date}
              onChange={(e) => handleInputChange('admission_date', e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Facility *</label>
            <input
              type="text"
              value={formData.facility}
              onChange={(e) => handleInputChange('facility', e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div>
        <h3 className="section-title">Medical History</h3>
        <div className="space-y-4">
          <div>
            <label className="form-label">Primary Diagnosis *</label>
            <input
              type="text"
              value={formData.primary_diagnosis}
              onChange={(e) => handleInputChange('primary_diagnosis', e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Comorbidities</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempInputs.comorbidity}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, comorbidity: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('comorbidities', tempInputs.comorbidity, 'comorbidity'))}
                className="form-input"
                placeholder="Add comorbidity and press Enter"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleArrayAdd('comorbidities', tempInputs.comorbidity, 'comorbidity')}
                className="btn-secondary whitespace-nowrap"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
            {formData.comorbidities.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.comorbidities.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {item}
                    <button type="button" onClick={() => handleArrayRemove('comorbidities', idx)} className="hover:text-blue-600" disabled={isLoading}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Vitals */}
      <div>
        <h3 className="section-title">Current Vitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Blood Pressure *</label>
            <input
              type="text"
              value={formData.blood_pressure}
              onChange={(e) => handleInputChange('blood_pressure', e.target.value)}
              className="form-input"
              placeholder="120/80"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Heart Rate (bpm) *</label>
            <input
              type="number"
              value={formData.heart_rate}
              onChange={(e) => handleInputChange('heart_rate', parseInt(e.target.value))}
              className="form-input"
              min="20"
              max="300"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Temperature (°F) *</label>
            <input
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
              className="form-input"
              min="90"
              max="110"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">O2 Saturation (%) *</label>
            <input
              type="number"
              value={formData.oxygen_saturation}
              onChange={(e) => handleInputChange('oxygen_saturation', parseInt(e.target.value))}
              className="form-input"
              min="0"
              max="100"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Pain Level (0-10) *</label>
            <input
              type="number"
              value={formData.pain_level}
              onChange={(e) => handleInputChange('pain_level', parseInt(e.target.value))}
              className="form-input"
              min="0"
              max="10"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Medications */}
      <div>
        <h3 className="section-title">Current Medications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="text"
            value={tempInputs.medicationName}
            onChange={(e) => setTempInputs((prev) => ({ ...prev, medicationName: e.target.value }))}
            className="form-input"
            placeholder="Medication name"
            disabled={isLoading}
          />
          <input
            type="text"
            value={tempInputs.medicationDosage}
            onChange={(e) => setTempInputs((prev) => ({ ...prev, medicationDosage: e.target.value }))}
            className="form-input"
            placeholder="Dosage (e.g., 10mg)"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={tempInputs.medicationFrequency}
              onChange={(e) => setTempInputs((prev) => ({ ...prev, medicationFrequency: e.target.value }))}
              className="form-input"
              placeholder="Frequency (e.g., BID)"
              disabled={isLoading}
            />
            <button type="button" onClick={handleMedicationAdd} className="btn-secondary whitespace-nowrap" disabled={isLoading}>
              Add
            </button>
          </div>
        </div>
        {formData.current_medications.length > 0 && (
          <div className="mt-3 space-y-1">
            {formData.current_medications.map((med, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">
                  <strong>{med.name}</strong> - {med.dosage} {med.frequency}
                </span>
                <button type="button" onClick={() => handleMedicationRemove(idx)} className="text-red-600 hover:text-red-800" disabled={isLoading}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Allergies */}
      <div>
        <h3 className="section-title">Allergies</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={tempInputs.allergy}
            onChange={(e) => setTempInputs((prev) => ({ ...prev, allergy: e.target.value }))}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('allergies', tempInputs.allergy, 'allergy'))}
            className="form-input"
            placeholder="Add allergy and press Enter"
            disabled={isLoading}
          />
          <button type="button" onClick={() => handleArrayAdd('allergies', tempInputs.allergy, 'allergy')} className="btn-secondary whitespace-nowrap" disabled={isLoading}>
            Add
          </button>
        </div>
        {formData.allergies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.allergies.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {item}
                <button type="button" onClick={() => handleArrayRemove('allergies', idx)} className="hover:text-red-600" disabled={isLoading}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Clinical Status */}
      <div>
        <h3 className="section-title">Clinical Status</h3>
        <div className="space-y-4">
          <div>
            <label className="form-label">Symptoms</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempInputs.symptom}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, symptom: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('symptoms', tempInputs.symptom, 'symptom'))}
                className="form-input"
                placeholder="Add symptom and press Enter"
                disabled={isLoading}
              />
              <button type="button" onClick={() => handleArrayAdd('symptoms', tempInputs.symptom, 'symptom')} className="btn-secondary whitespace-nowrap" disabled={isLoading}>
                Add
              </button>
            </div>
            {formData.symptoms.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.symptoms.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {item}
                    <button type="button" onClick={() => handleArrayRemove('symptoms', idx)} className="hover:text-yellow-600" disabled={isLoading}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Mobility Level *</label>
              <select
                value={formData.mobility_level}
                onChange={(e) => handleInputChange('mobility_level', e.target.value)}
                className="form-input"
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
              <label className="form-label">ADL Independence *</label>
              <input
                type="text"
                value={formData.adl_independence}
                onChange={(e) => handleInputChange('adl_independence', e.target.value)}
                className="form-input"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Fall Risk Factors</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempInputs.fallRisk}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, fallRisk: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('fall_risk_factors', tempInputs.fallRisk, 'fallRisk'))}
                className="form-input"
                placeholder="Add fall risk factor and press Enter"
                disabled={isLoading}
              />
              <button type="button" onClick={() => handleArrayAdd('fall_risk_factors', tempInputs.fallRisk, 'fallRisk')} className="btn-secondary whitespace-nowrap" disabled={isLoading}>
                Add
              </button>
            </div>
            {formData.fall_risk_factors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.fall_risk_factors.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {item}
                    <button type="button" onClick={() => handleArrayRemove('fall_risk_factors', idx)} className="hover:text-orange-600" disabled={isLoading}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="form-label">Cognitive Status *</label>
            <input
              type="text"
              value={formData.cognitive_status}
              onChange={(e) => handleInputChange('cognitive_status', e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Special Considerations */}
      <div>
        <h3 className="section-title">Special Considerations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Isolation Precautions</label>
            <input
              type="text"
              value={formData.isolation_precautions || ''}
              onChange={(e) => handleInputChange('isolation_precautions', e.target.value || null)}
              className="form-input"
              placeholder="None"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="form-label">Diet Restrictions</label>
            <input
              type="text"
              value={formData.diet_restrictions || ''}
              onChange={(e) => handleInputChange('diet_restrictions', e.target.value || null)}
              className="form-input"
              placeholder="None"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <button type="submit" className="btn-primary text-lg px-8 py-3" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Care Plan...
            </span>
          ) : (
            'Generate Care Plan'
          )}
        </button>
      </div>
    </form>
  );
}
