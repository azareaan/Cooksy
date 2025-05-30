export type FoodDetailCardProps = {
    id: number,
    title: string,
    image: string,
    sourceUrl: string,
    vegetarian: boolean,
    vegan: boolean,
    veryHealthy: boolean,
    cheap: boolean,
    preparationMinutes: number,
    readyInMinutes: number,
    aggregateLikes: number,
    healthScore: number,
    extendedIngredients?: {
        name: string,
        original: string
    }[]
}