/**
 * CarePlanDisplay component - Displays the AI-generated care plan.
 * Clean, printable format with professional styling.
 */
import type { CarePlanOutput } from "../types";

interface CarePlanDisplayProps {
  carePlan: CarePlanOutput;
  onGenerateNew: () => void;
}

export function CarePlanDisplay({
  carePlan,
  onGenerateNew,
}: CarePlanDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Care Plan Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-blue-100 no-print">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Care Plan</h2>
          <p className="text-lg text-gray-600 mt-1">
            Patient:{" "}
            <span className="font-semibold">{carePlan.patient_name}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Generated: {formatDate(carePlan.generated_at)}
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="btn-primary flex items-center gap-2 text-base px-6 py-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
          Print Care Plan
        </button>
      </div>

      {/* Care Plan Content */}
      <div className="bg-white">
        <div
          dangerouslySetInnerHTML={{ __html: carePlan.care_plan_html }}
          className="care-plan-content"
        />
      </div>
    </div>
  );
}
