// List of assigned surveys for the officer
import React from "react";


export default function SurveyList({ surveys, selectedSurvey, onSelect }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Assigned Applications</h3>
      <ul className="space-y-2">
        {surveys.length === 0 && <li className="p-2">No assigned surveys.</li>}
        {surveys.map((survey: any) => (
          <li
            key={survey.id}
            className={`p-2 bg-white rounded shadow cursor-pointer ${selectedSurvey?.id === survey.id ? "border-2 border-blue-500" : ""}`}
            onClick={() => onSelect(survey)}
          >
            {survey.application?.full_name || "Applicant"} ({survey.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
