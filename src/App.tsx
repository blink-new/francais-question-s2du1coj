import { useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TrainingCalendar from "./components/TrainingCalendar";

function App() {
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<string>("");
  const [taille, setTaille] = useState<string>("");
  const [poids, setPoids] = useState<string>("");
  const [objectifTemps, setObjectifTemps] = useState<string>("");
  const [generatedPlan, setGeneratedPlan] = useState<string[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pour l'instant, on affiche juste les données dans la console
    console.log({ genre, age, taille, poids, objectifTemps });

    // Logique de génération de plan très simple (placeholder)
    const plan: string[] = [];
    for (let i = 0; i < 16; i++) {
      // Une logique simplifiée basée sur l'objectif de temps par exemple
      if (objectifTemps.startsWith('03:')) {
        plan.push(`Semaine ${i + 1}: Course Longue`);
      } else if (objectifTemps.startsWith('04:')) {
        plan.push(`Semaine ${i + 1}: Course Modérée`);
      } else {
        plan.push(`Semaine ${i + 1}: Entraînement`);
      }
    }
    setGeneratedPlan(plan);
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
              </div>
              <div>
                <Label htmlFor="age" className="text-base font-semibold text-gray-700">Âge (années)</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  placeholder="Ex: 30" 
                  className="mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
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
                  className="mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="poids" className="text-base font-semibold text-gray-700">Poids (kg)</Label>
                <Input 
                  id="poids" 
                  type="number" 
                  value={poids} 
                  onChange={(e) => setPoids(e.target.value)} 
                  placeholder="Ex: 70"
                  className="mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
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
                className="mt-1 bg-white border-gray-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 text-lg rounded-lg transition-transform transform hover:scale-105">
              Générer mon Plan
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
        <TrainingCalendar plan={generatedPlan} />
      </div>
    </div>
  );
}

export default App;