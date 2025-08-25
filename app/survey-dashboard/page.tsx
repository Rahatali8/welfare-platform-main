'use client'
import React, { useEffect, useState } from "react";
import SurveyList from "@/components/survey/SurveyList";
import SurveyDetails from "@/components/survey/SurveyDetails";
import SurveyForm from "@/components/survey/SurveyForm";


export default function SurveyDashboardPage() {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  useEffect(() => {
    // Fetch assigned surveys from API
    fetch("/api/survey")
      .then((res) => res.json())
      .then((data) => {
        setSurveys(data.surveys || []);
        if (data.surveys && data.surveys.length > 0) {
          setSelectedSurvey(data.surveys[0]);
        }
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="font-bold text-lg mb-4">Survey Dashboard</h2>
        <SurveyList
          surveys={surveys}
          selectedSurvey={selectedSurvey}
          onSelect={setSelectedSurvey}
        />
        {/* Calendar, Notifications, Completed Surveys can be added here */}
      </aside>
      {/* Main Area */}
      <main className="flex-1 p-8">
        <SurveyDetails survey={selectedSurvey} />
        <SurveyForm survey={selectedSurvey} refresh={() => {
          // Refresh surveys after submit
          fetch("/api/survey")
            .then((res) => res.json())
            .then((data) => {
              setSurveys(data.surveys || []);
              if (data.surveys && data.surveys.length > 0) {
                setSelectedSurvey(data.surveys[0]);
              }
            });
        }} />
      </main>
    </div>
  );
}
