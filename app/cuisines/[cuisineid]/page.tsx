import styles from "./cuisines.module.css";
import FoodList from "@/components/FoodList/FoodList";
import { FoodDetailCardProps } from "@/types/types";

const get_cuisine_food = async (cuisine: string): Promise<FoodDetailCardProps[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=popularity&cuisine=${cuisine}&number=12&instructionsRequired=true&apiKey=${process.env.API_KEY}`,
      {
        next: {
          revalidate: 86400, // get new data every day
        },
      }
    );

    if(!res.ok){
      return [];
    }

    const data = await res.json();

    const mapData = data.results.map((foodDetail: FoodDetailCardProps) => ({
      id: foodDetail.id,
      title: foodDetail.title,
      image: foodDetail.image,
      sourceUrl: foodDetail.sourceUrl,
      vegetarian: foodDetail.vegetarian,
      vegan: foodDetail.vegan,
      veryHealthy: foodDetail.veryHealthy,
      cheap: foodDetail.cheap,
      preparationMinutes: foodDetail.preparationMinutes,
      readyInMinutes: foodDetail.readyInMinutes,
      aggregateLikes: foodDetail.aggregateLikes,
      healthScore: foodDetail.healthScore,
      extendedIngredients: foodDetail.extendedIngredients?.map((ingredient) => ({
        name: ingredient.name,
        original: ingredient.original
      })) ?? [],
    }));


    return mapData;
  }
  catch {
    return [];
  }
};

const Cuisines = async ({params}: {params: {cuisineid: string}}) => {
    const param_temp = await params;
    const cuisineid = param_temp.cuisineid;
    const cuisineFoods = await get_cuisine_food(cuisineid);

    return (
        <div className={styles.food_list_container}>
            {!cuisineFoods || cuisineFoods.length === 0 ? (
                <h2>No cuisineFoods found</h2>
            ) : (
                <FoodList foods={cuisineFoods} />
            )}
        </div>
    );
};

export default Cuisines;