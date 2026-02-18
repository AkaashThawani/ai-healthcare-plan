/**
 * Main App component - Orchestrates the care plan generation flow.
 * Simple, clean state management with patient form and care plan display.
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
      // Scroll to top to show the care plan
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center no-print">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            AI Care Plan Generator
          </h1>
          <p className="text-gray-600">
            Comprehensive nursing care plans powered by Claude AI
          </p>
        </header>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md no-print">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800 mb-1">
                  Error Generating Care Plan
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600 no-print">
          <p>
            Powered by{' '}
            <a
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Claude AI
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            This tool is for demonstration purposes. Always verify care plans with licensed
            healthcare professionals.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
