'use client';

import {useState, useEffect} from 'react';
import {generateRecipes, GenerateRecipesOutput} from '@/ai/flows/generate-recipes';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Heart, HeartIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Skeleton} from '@/components/ui/skeleton';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string;
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (title: string) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter(fav => fav !== title));
    } else {
      setFavorites([...favorites, title]);
    }
  };

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    try {
      const result: GenerateRecipesOutput = await generateRecipes({description});

      if (result && result.recipes) {
        // Check if result.recipes is not null and is an array
        setRecipes(result.recipes as Recipe[]);
      } else {
        // Handle the case where result or result.recipes is null/undefined
        console.error('No recipes received from AI generation');
        setRecipes([]); // Set recipes to an empty array to avoid rendering issues
      }
    } catch (error) {
      console.error('Error generating recipes:', error);
      setRecipes([]); // Ensure recipes is an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold mb-4">RecipeAI</h1>
      <div className="flex w-full max-w-md space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Describe what you want to eat"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button onClick={handleGenerateRecipes} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Generate Recipes'}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={`skeleton-${i}`}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-24" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <Card key={index} className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-md font-semibold mb-2">Ingredients:</h2>
                <ul className="list-disc list-inside mb-2">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <h2 className="text-md font-semibold mb-2">Instructions:</h2>
                <p className="text-sm">{recipe.instructions}</p>
              </CardContent>
              <div className="p-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(recipe.title)}
                >
                  {favorites.includes(recipe.title) ? (
                    <Heart className="h-5 w-5 fill-primary text-primary-foreground" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {favorites.includes(recipe.title) ? 'Remove from favorites' : 'Add to favorites'}
                  </span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
