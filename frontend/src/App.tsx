/**
 * Main App component - Full-page card layout with header inside.
 * Clean, modern design with better navigation.
 */
import { useState } from 'react';
import type { PatientInput, CarePlanOutput } from './types';
import { generateCarePlan, formatErrorMessage } from './services/api';
import { PatientForm } from './components/PatientForm';
import { CarePlanDisplay } from './components/CarePlanDisplay';

function App() {
  const [carePlan, setCarePlan] = useState<CarePlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCarePlan = async (patientData: PatientInput) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await generateCarePlan(patientData);
      setCarePlan(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      console.error('Care plan generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNew = () => {
    setCarePlan(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-6 px-4">
      {/* Full-Page Card Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header - Inside Card */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-8 no-print">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <span className="text-5xl">🏥</span>
                AI Care Plan Generator
              </h1>
              <p className="text-blue-100 text-lg">
                Comprehensive nursing care plans powered by Claude AI
              </p>
            </div>
            {carePlan && (
              <button
                onClick={handleGenerateNew}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                ← New Patient
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-xl no-print">
              <div className="flex items-start gap-3">
                <svg
                  className="w-7 h-7 text-red-600 flex-shrink-0 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-red-800 mb-1">
                    Error Generating Care Plan
                  </h3>
                  <p className="text-base text-red-700">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 font-bold text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          {carePlan ? (
            <CarePlanDisplay carePlan={carePlan} onGenerateNew={handleGenerateNew} />
          ) : (
            <PatientForm onSubmit={handleGenerateCarePlan} isLoading={isLoading} />
          )}
        </div>

        {/* Footer - Inside Card */}
        <footer className="bg-gray-50 px-8 py-6 border-t border-gray-200 no-print">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Powered by{' '}
              <a
                href="https://anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Claude AI (Sonnet 4)
              </a>
            </p>
            <p className="text-xs text-gray-500">
              ⚠️ For demonstration purposes only. Always verify care plans with licensed healthcare professionals.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
