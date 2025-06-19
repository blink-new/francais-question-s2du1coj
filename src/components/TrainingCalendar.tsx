import React from 'react';

const weeks = Array.from({ length: 16 }, (_, i) => i + 1);

interface TrainingCalendarProps {
  plan: string[] | null;
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

  const trainingPlan = plan;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px] grid grid-cols-16 gap-4">
        {weeks.map((week) => (
          <div
            key={week}
            className="p-4 rounded-lg bg-primary/10 border border-primary cursor-pointer transition-transform hover:scale-105 hover:bg-primary/20"
            title={trainingPlan[week - 1]}
          >
            <h3 className="font-semibold text-primary mb-2">Semaine {week}</h3>
            <div className="text-sm text-primary/80 whitespace-pre-wrap">
              {trainingPlan[week - 1]?.split('\n').slice(1).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}