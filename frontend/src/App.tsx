/**
 * Main App component - Full-width layout with routing.
 * Separate routes for form and care plan with browser navigation support.
 */
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { PatientInput, CarePlanOutput } from "./types";
import { generateCarePlan, formatErrorMessage } from "./services/api";
import { PatientForm } from "./components/PatientForm";
import { CarePlanDisplay } from "./components/CarePlanDisplay";

function AppContent() {
  const [carePlan, setCarePlan] = useState<CarePlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerateCarePlan = async (patientData: PatientInput) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await generateCarePlan(patientData);
      setCarePlan(result);
      // Navigate to care plan page
      navigate("/care-plan");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      console.error("Care plan generation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-6 px-4">
      {/* Full-Width Card Container */}
      <div className="mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
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
            <Routes>
              <Route
                path="/care-plan"
                element={
                  <button
                    onClick={handleGoBack}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    ← New Patient
                  </button>
                }
              />
            </Routes>
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

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <PatientForm
                  onSubmit={handleGenerateCarePlan}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/care-plan"
              element={
                carePlan ? (
                  <CarePlanDisplay carePlan={carePlan} />
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-600 mb-4">
                      No care plan to display
                    </p>
                    <button onClick={handleGoBack} className="btn-primary">
                      Go to Patient Form
                    </button>
                  </div>
                )
              }
            />
          </Routes>
        </div>

        {/* Footer - Inside Card */}
        <footer className="bg-gray-50 px-8 py-6 border-t border-gray-200 no-print">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Powered by{" "}
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
              ⚠️ For demonstration purposes only. Always verify care plans with
              licensed healthcare professionals.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
