export type FoodDetailCardProps = {
    id: number,
    title: string,
    image: string,
    vegetarian: boolean,
    vegan: boolean,
    veryHealthy: boolean,
    cheap: boolean,
    readyInMinutes: number,
    aggregateLikes: number,
}

export type RecipeDetails = {
    id: number,
    title: string,
    image: string,
    sourceUrl: string,
    readyInMinutes: number,
    servings: number,
    vegetarian: boolean,
    vegan: boolean,
    veryHealthy: boolean,
    cheap: boolean,
    aggregateLikes: number,
    extendedIngredients: {
        name: string,
        original: string
    }[]
    summary?: string,
    cuisines: string[],
    dishTypes: string[],
    analyzedInstructions: {
        steps: {step: string}[]
    }[]
}

export type SearchPageProps = {
  searchParams: Promise<{ q: string; type: 'query' | 'includeIngredients' | 'excludeIngredients' }>;
}