/**
 * CarePlanDisplay component - Displays the AI-generated care plan.
 * Clean, printable format with professional styling.
 */
import type { CarePlanOutput } from '../types';

interface CarePlanDisplayProps {
  carePlan: CarePlanOutput;
  onGenerateNew: () => void;
}

export function CarePlanDisplay({ carePlan, onGenerateNew }: CarePlanDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons - Hidden when printing */}
      <div className="flex items-center justify-between no-print">
        <h2 className="text-2xl font-bold text-gray-800">Care Plan for {carePlan.patient_name}</h2>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="btn-secondary flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
              />
            </svg>
            Print
          </button>
          <button
            onClick={onGenerateNew}
            className="btn-primary flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Generate New Care Plan
          </button>
        </div>
      </div>

      {/* Generated timestamp - Hidden when printing */}
      <div className="text-sm text-gray-600 no-print">
        Generated on: {formatDate(carePlan.generated_at)}
      </div>

      {/* Care Plan Content */}
      <div className="card">
        <div
          dangerouslySetInnerHTML={{ __html: carePlan.care_plan_html }}
          className="care-plan-content"
        />
      </div>

      {/* Bottom Actions - Hidden when printing */}
      <div className="flex justify-end gap-3 no-print">
        <button
          onClick={handlePrint}
          className="btn-secondary"
        >
          Print Care Plan
        </button>
        <button
          onClick={onGenerateNew}
          className="btn-primary"
        >
          Generate New Care Plan
        </button>
      </div>
    </div>
  );
}
