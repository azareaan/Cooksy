import { RecipeDetails } from "@/types/types";

const getDetail = async (recipeid: string) : Promise<RecipeDetails | null> => {
    try {
    const res = await fetch(`${process.env.BASE_URL}${recipeid}/information?includeNutrition=false&apiKey=${process.env.API_KEY}`);

    if(!res.ok){
      return null;
    }

    const data = await res.json();

    const mapData = {
      id: data.id,
      title: data.title,
      image: data.image,
      sourceUrl: data.sourceUrl,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      vegetarian: data.vegetarian,
      vegan: data.vegan,
      veryHealthy: data.veryHealthy,
      cheap: data.cheap,
      preparationMinutes: data.preparationMinutes,
      aggregateLikes: data.aggregateLikes,
      healthScore: data.healthScore,
      extendedIngredients: data.extendedIngredients?.map((ingredient: any) => ({
      name: ingredient.name,
      original: ingredient.original
      })) ?? [],
      summary: data.summary,
      cuisines: data.cuisines,
      dishTypes: data.dishTypes,
      analyzedInstructions: data.analyzedInstructions?.map((instruction: {steps: {step: string}[]}) => ({
        steps: instruction.steps?.map((step: {step: string}) => ({
          step: step.step
        })) ?? []
      })) ?? [],
    };    
    
    
    return mapData;

  }
  catch {
    return null;
  }
}

const RecipeDetail = async ({params}: {params: {recipeid: string}}) => {
    const param_temp = await params;
    const recipeid = param_temp.recipeid;
    const detail = await getDetail(recipeid);

    if (!detail) {
      return (
        <>
          <h1>Recipe not found.</h1>
        </>
      );
    }

    return (
        <>
          <h1>{detail.title}</h1>
        </>
    );
};

export default RecipeDetail;