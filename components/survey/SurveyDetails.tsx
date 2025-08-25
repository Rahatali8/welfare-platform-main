// Details of selected survey/application
import React from "react";


export default function SurveyDetails({ survey }: any) {
  if (!survey) return null;
  const app = survey.application || {};
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Case Details</h3>
      <div className="bg-white p-4 rounded shadow">
        <p>Applicant Name: {app.full_name}</p>
        <p>CNIC: {app.cnic_number}</p>
        <p>Address: {app.address}</p>
        <p>Status: {survey.status}</p>
        <p>Recommendation: {survey.recommendation || "-"}</p>
        <p>Report: {survey.report || "-"}</p>
        <div className="mt-2">
          <strong>Attachments:</strong>
          <ul>
            {survey.attachments?.map((att: any) => (
              <li key={att.id}><a href={att.url} target="_blank" rel="noopener noreferrer">{att.url}</a></li>
            ))}
            {(!survey.attachments || survey.attachments.length === 0) && <li>None</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
