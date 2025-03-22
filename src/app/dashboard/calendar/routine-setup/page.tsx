"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SECTIONS = [
  {
    category: "Study Routine",
    placeholder: "Describe your ideal study routine. For example:\n- When do you prefer to study?\n- How long are your typical study sessions?\n- Do you need regular breaks?\n- Do you prefer group or solo study?",
  },
  {
    category: "Sports & Activities",
    placeholder: "Tell us about your sports and activities schedule. For example:\n- What days do you have practice?\n- When are your games or competitions?\n- Do you have training sessions?\n- Any regular club meetings?",
  },
  {
    category: "Downtime & Rest",
    placeholder: "Describe how you like to rest and recharge. For example:\n- How many hours of sleep do you need?\n- When do you exercise?\n- Do you take regular breaks?\n- Any specific times you prefer not to be disturbed?",
  },
  {
    category: "Work & Other Commitments",
    placeholder: "Share any other commitments in your schedule. For example:\n- Part-time work hours\n- Volunteer activities\n- Family commitments\n- Regular appointments",
  }
];

export default function RoutineSetup() {
  return (
    <div className="h-screen max-w-[1600px] mx-auto px-6">
      <div className="h-full space-y-6">
        {/* Title and Intro */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Your Life Blueprint</h1>
          <p className="text-gray-600 max-w-2xl">
            Tell us about your weekly routine in your own words. Our AI will help create a schedule that fits your lifestyle perfectly.
          </p>
        </div>

        {/* Description Sections */}
        {SECTIONS.map((section) => (
          <Card key={section.category} className="p-6 space-y-4">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">{section.category}</h2>
              <Textarea 
                placeholder={section.placeholder}
                className="min-h-[160px] text-gray-600 resize-none"
              />
            </div>
          </Card>
        ))}

        {/* Upload Area */}
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center space-y-4">
              <svg
                className="h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <Button variant="outline" className="w-full max-w-sm">
                Upload Schedule
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Upload your class/club schedule (PDF/image) and we'll parse it for you.
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-[#db2777] hover:bg-[#be185d] px-8">
            Generate My Schedule
          </Button>
        </div>
      </div>
    </div>
  );
} 