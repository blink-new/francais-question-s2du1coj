import { useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TrainingCalendar from "./components/TrainingCalendar";

interface WeeklyPlan {
  weekNumber: number;
  sessions: string[];
}

function App() {
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<string>("");
  const [taille, setTaille] = useState<string>("");
  const [poids, setPoids] = useState<string>("");
  const [objectifTemps, setObjectifTemps] = useState<string>("");
  const [generatedPlan, setGeneratedPlan] = useState<WeeklyPlan[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Validation errors state
  const [genreError, setGenreError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [tailleError, setTailleError] = useState<string | null>(null);
  const [poidsError, setPoidsError] = useState<string | null>(null);
  const [objectifTempsError, setObjectifTempsError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedPlan(null); // Clear previous plan
    setSelectedWeek(null); // Clear selected week

    // Reset errors
    setGenreError(null);
    setAgeError(null);
    setTailleError(null);
    setPoidsError(null);
    setObjectifTempsError(null);

    let isValid = true;

    if (!genre) {
      setGenreError("Veuillez sélectionner votre genre.");
      isValid = false;
    }
    if (!age || parseInt(age) <= 0) {
      setAgeError("Veuillez entrer un âge valide.");
      isValid = false;
    }
    if (!taille || parseInt(taille) <= 0) {
      setTailleError("Veuillez entrer une taille valide.");
      isValid = false;
    }
    if (!poids || parseFloat(poids) <= 0) {
      setPoidsError("Veuillez entrer un poids valide.");
      isValid = false;
    }
    // Simple regex for hh:mm:ss format
    const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
    if (!objectifTemps || !timeRegex.test(objectifTemps)) {
      setObjectifTempsError("Format hh:mm:ss requis (ex: 03:30:00).");
      isValid = false;
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    console.log({ genre, age, taille, poids, objectifTemps });

    // Logique de génération de plan améliorée avec progression et variation
    const plan: WeeklyPlan[] = [];
    const ageNum = parseInt(age);
    const tailleNum = parseInt(taille);
    const poidsNum = parseInt(poids);
    const objectifParts = objectifTemps.split(':').map(Number);
    const objectifTotalSeconds = objectifParts[0] * 3600 + objectifParts[1] * 60 + objectifParts[2];

    // Calcul IMC simple (pour l'exemple)
    const imc = tailleNum > 0 ? poidsNum / ((tailleNum / 100) * (tailleNum / 100)) : 0;

    for (let i = 0; i < 16; i++) {
      const sessions: string[] = [];
      const week = i + 1;

      // Base sessions (adjust based on week progression)
      if (week <= 4) { // Foundation
        sessions.push("Course Facile (30-40 min)");
        sessions.push("Sortie Longue (45-60 min)");
      } else if (week <= 8) { // Building endurance and speed
        sessions.push("Course Facile (40-50 min)");
        sessions.push("Séance de Fractionné (ex: 6x800m)");
        sessions.push(`Sortie Longue (${60 + (week - 4) * 15} min)`); // Increase long run
      } else if (week <= 12) { // Peak training
        sessions.push("Course Facile (30-40 min)");
        sessions.push("Séance de Seuil ou Allure Spécifique");
        sessions.push(`Sortie Très Longue (${120 + (week - 8) * 15} min)`); // Longest runs
      } else if (week <= 14) { // Tapering
        sessions.push("Course Facile (20-30 min)");
        sessions.push("Séance Courte Allure Marathon");
        sessions.push(`Sortie Longue Réduite (${90 - (week - 12) * 15} min)`); // Decrease long run
      } else { // Race week
        sessions.push("Course très Facile (20 min)");
        sessions.push("Repos Complet");
        sessions.push("Repos Complet");
        sessions.push("Marathon!");
      }

      // Add strength/cross-training based on user data
      if (ageNum > 45 || imc >= 26) {
         if (week <= 14) sessions.push("Renforcement Musculaire Léger");
      } else if (ageNum < 30 && imc < 22) {
         if (week <= 12) sessions.push("Séance de Côtes ou PPG");
      }

      // Ensure at least one rest day (simplified)
      if (!sessions.some(s => s.includes('Repos'))) {
          sessions.push("Repos");
      }

      plan.push({ weekNumber: week, sessions });
    }
    
    // Simulate loading time
    setTimeout(() => {
        setGeneratedPlan(plan);
        setIsLoading(false);
    }, 1000); // 1 second delay
  };

  const handleWeekSelect = (weekNumber: number | null) => {
    setSelectedWeek(weekNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-2xl shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <img src="/favicon.svg" alt="Logo Coureur" className="w-20 h-20 mx-auto mb-4 text-primary" /> 
          <CardTitle className="text-4xl font-bold text-primary">Votre Plan Marathon Personnalisé</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Entrez vos informations pour générer un plan d'entraînement sur mesure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="genre" className="text-base font-semibold text-gray-700">Genre</Label>
                <Select onValueChange={setGenre} value={genre}>
                  <SelectTrigger id="genre" className="w-full mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Sélectionnez votre genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {genreError && <p className="text-red-500 text-sm mt-1">{genreError}</p>}
              </div>
              <div>
                <Label htmlFor="age" className="text-base font-semibold text-gray-700">Âge (années)</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  placeholder="Ex: 30" 
                  className={`mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary ${ageError ? 'border-red-500' : ''}`}
                  required
                />
                {ageError && <p className="text-red-500 text-sm mt-1">{ageError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="taille" className="text-base font-semibold text-gray-700">Taille (cm)</Label>
                <Input 
                  id="taille" 
                  type="number" 
                  value={taille} 
                  onChange={(e) => setTaille(e.target.value)} 
                  placeholder="Ex: 175"
                  className={`mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary ${tailleError ? 'border-red-500' : ''}`}
                  required
                />
                {tailleError && <p className="text-red-500 text-sm mt-1">{tailleError}</p>}
              </div>
              <div>
                <Label htmlFor="poids" className="text-base font-semibold text-gray-700">Poids (kg)</Label>
                <Input 
                  id="poids" 
                  type="number" 
                  value={poids} 
                  onChange={(e) => setPoids(e.target.value)} 
                  placeholder="Ex: 70"
                  className={`mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary ${poidsError ? 'border-red-500' : ''}`}
                  required
                />
                {poidsError && <p className="text-red-500 text-sm mt-1">{poidsError}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="objectifTemps" className="text-base font-semibold text-gray-700">Objectif de Temps (hh:mm:ss)</Label>
              <Input 
                id="objectifTemps" 
                type="text" 
                value={objectifTemps} 
                onChange={(e) => setObjectifTemps(e.target.value)} 
                placeholder="Ex: 03:30:00"
                className={`mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary ${objectifTempsError ? 'border-red-500' : ''}`}
                required
              />
              {objectifTempsError && <p className="text-red-500 text-sm mt-1">{objectifTempsError}</p>}
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 text-lg rounded-lg transition-transform transform hover:scale-105" disabled={isLoading}>
              {isLoading ? 'Génération...' : 'Générer mon Plan'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          <p className="text-sm text-muted-foreground">
            Préparez-vous à dépasser vos limites !
          </p>
        </CardFooter>
      </Card>

      <div className="w-full max-w-4xl mt-12 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Votre Calendrier d'Entraînement</h2>
        <TrainingCalendar plan={generatedPlan} selectedWeek={selectedWeek} onWeekSelect={handleWeekSelect} />
      </div>
    </div>
  );
}

export default App;