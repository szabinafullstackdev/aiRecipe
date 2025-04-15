'use server';
/**
 * @fileOverview Recipe generation flow.
 *
 * - generateRecipes - A function that handles the recipe generation process.
 * - GenerateRecipesInput - The input type for the generateRecipes function.
 * - GenerateRecipesOutput - The return type for the generateRecipes function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RecipeSchema = z.object({
  title: z.string().describe('The title of the recipe'),
  ingredients: z.array(z.string()).describe('List of ingredients needed'),
  instructions: z.string().describe('Cooking instructions'),
});

const GenerateRecipesInputSchema = z.object({
  description: z.string().describe('The description of what the user wants to eat.'),
});
export type GenerateRecipesInput = z.infer<typeof GenerateRecipesInputSchema>;

const GenerateRecipesOutputSchema = z.object({
  recipes: z.array(RecipeSchema).describe('List of recipes based on the description.'),
});
export type GenerateRecipesOutput = z.infer<typeof GenerateRecipesOutputSchema>;

export async function generateRecipes(input: GenerateRecipesInput): Promise<GenerateRecipesOutput> {
  return generateRecipesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipesPrompt',
  input: {
    schema: z.object({
      description: z.string().describe('The description of what the user wants to eat.'),
    }),
  },
  output: {
    schema: z.object({
      recipes: z.array(RecipeSchema).describe('List of recipes based on the description.'),
    }),
  },
  prompt: `You are a recipe generating expert. Based on the description provided, generate a list of recipes that match the description.

Description: {{{description}}}

Each recipe should include a title, a list of ingredients, and cooking instructions.
`,
});

const generateRecipesFlow = ai.defineFlow<
  typeof GenerateRecipesInputSchema,
  typeof GenerateRecipesOutputSchema
>(
  {
    name: 'generateRecipesFlow',
    inputSchema: GenerateRecipesInputSchema,
    outputSchema: GenerateRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
