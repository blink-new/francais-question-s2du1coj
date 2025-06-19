import React from 'react';

interface WeeklyPlan {
  weekNumber: number;
  sessions: string[];
}

interface TrainingCalendarProps {
  plan: WeeklyPlan[] | null;
  selectedWeek: number | null;
  onWeekSelect: (weekNumber: number | null) => void;
}

export default function TrainingCalendar({ plan, selectedWeek, onWeekSelect }: TrainingCalendarProps) {
  if (!plan) {
    return (
      <div className="text-center text-gray-600">
        <p className="text-lg">Entrez vos informations ci-dessus pour générer votre plan d'entraînement.</p>
        <p className="mt-2">Préparez-vous à courir ! &#x1F3C3;</p>
      </div>
    );
  }

  const handleWeekClick = (weekNumber: number) => {
    onWeekSelect(weekNumber === selectedWeek ? null : weekNumber); // Toggle selection
  };

  const selectedWeekPlan = plan.find(weekPlan => weekPlan.weekNumber === selectedWeek);

  return (
    <div className="overflow-x-auto">
      {/* Responsive grid: 2 cols on mobile, 4 on md, 6 on lg, 8 on xl */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {plan.map((weeklyPlan) => (
          <div
            key={weeklyPlan.weekNumber}
            className={`p-4 rounded-lg border cursor-pointer transition-transform hover:scale-105 ${weeklyPlan.weekNumber === selectedWeek ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-primary/10 border-primary text-primary/80 hover:bg-primary/20'}`}
            title={`Semaine ${weeklyPlan.weekNumber}`}
            onClick={() => handleWeekClick(weeklyPlan.weekNumber)}
          >
            <h3 className={`font-semibold mb-2 ${weeklyPlan.weekNumber === selectedWeek ? 'text-primary-foreground' : 'text-primary'}`}>Semaine {weeklyPlan.weekNumber}</h3>
            <div className="text-sm">
              {weeklyPlan.sessions.map((session, index) => (
                <p key={index}>{session}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedWeekPlan && (
        <div className="mt-8 p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold text-primary mb-4">Détails de la Semaine {selectedWeekPlan.weekNumber}</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {selectedWeekPlan.sessions.map((session, index) => (
              <li key={index}>{session}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}