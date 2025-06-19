import React from 'react';

interface WeeklyPlan {
  weekNumber: number;
  sessions: string[];
}

interface TrainingCalendarProps {
  plan: WeeklyPlan[] | null;
}

export default function TrainingCalendar({ plan }: TrainingCalendarProps) {
  if (!plan) {
    return (
      <div className="text-center text-gray-600">
        <p className="text-lg">Entrez vos informations ci-dessus pour générer votre plan d'entraînement.</p>
        <p className="mt-2">Préparez-vous à courir ! &#x1F3C3;</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px] grid grid-cols-16 gap-4">
        {plan.map((weeklyPlan) => (
          <div
            key={weeklyPlan.weekNumber}
            className="p-4 rounded-lg bg-primary/10 border border-primary cursor-pointer transition-transform hover:scale-105 hover:bg-primary/20"
            title={`Semaine ${weeklyPlan.weekNumber}`}
          >
            <h3 className="font-semibold text-primary mb-2">Semaine {weeklyPlan.weekNumber}</h3>
            <div className="text-sm text-primary/80">
              {weeklyPlan.sessions.map((session, index) => (
                <p key={index}>{session}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}