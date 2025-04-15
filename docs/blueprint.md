# **App Name**: RecipeAI

## Core Features:

- AI Recipe Generation: Generate a list of recipes based on a user's description using an AI model. The model will act as a tool to retrieve and list relevant recipes.
- Recipe Display: Display a list of suggested recipes with their respective details such as ingredients and cooking instructions, matching the Figma design.
- Favorite Recipes: Allow users to add and remove recipes from their list of favorite recipes, persisting across sessions.
- Search Bar: Implement a search bar to let users provide a description of what they want to eat.
- Loading Indicators: Provide loading indicators and skeleton UI elements to show the user when the recipes are loading.

## Style Guidelines:

- Primary color: White or light gray for the background.
- Secondary color: Dark gray or black for text and important UI elements.
- Accent: Purple (#A06CD5) for interactive elements and highlights.
- Adhere to the layout and proportions defined in the Figma design.
- Use simple, clear icons for actions like favoriting recipes.

## Original User Request:
Create an AI-Powered Recipe Finder React Native app where users can briefly describe what they want to eat, and the app will fetch a list of recipes based on their description using AI. Users can then view the details of each recipe, including ingredients and cooking instructions, and add them to my list of favorites receipts.

Requirements:
• The app will be built with Typescript in React Native (Expo).
• The app will implement the provided design. It does not have to be pixel perfect, but layout / proportions should be respected. 
https://www.figma.com/design/wuHnFuYeOER9m6VOHGmkif/Junior-FS%2FRN-Tech-Challenge?node-id=1259-80&p=f&t=dam1r53O6OpONAN9-0
• You can use any AI tool you want (OpeniAI, Groq, Claude, Gemini, etc.) to generate recipes. Make sure you call their services using their REST API.
• You should use Nativewind, but may default to Stylesheets.
• Preserving the favorites between sessions is required.
  