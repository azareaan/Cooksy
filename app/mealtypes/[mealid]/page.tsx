import styles from "./mealType.module.css";
import FoodList from "@/components/FoodList/FoodList";
import { FoodDetailCardProps } from "@/types/types";

const get_meal_food = async (meal: string): Promise<FoodDetailCardProps[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=popularity&type=${meal}&number=12&instructionsRequired=true&apiKey=${process.env.API_KEY}`,
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
      vegetarian: foodDetail.vegetarian,
      vegan: foodDetail.vegan,
      veryHealthy: foodDetail.veryHealthy,
      cheap: foodDetail.cheap,
      preparationMinutes: foodDetail.preparationMinutes,
      readyInMinutes: foodDetail.readyInMinutes,
      aggregateLikes: foodDetail.aggregateLikes,
      healthScore: foodDetail.healthScore,
    }));


    return mapData;
  }
  catch {
    return [];
  }
};

const MealTypes = async ({params}: {params: {mealid: string}}) => {
    const param_temp = await params;
    const mealid = param_temp.mealid;
    const mealFoods = await get_meal_food(mealid);

    return (
        <div className={styles.food_list_container}>
            {!mealFoods || mealFoods.length === 0 ? (
                <h2>No mealFoods found</h2>
            ) : (
                <FoodList foods={mealFoods} />
            )}
        </div>
    );
};

export default MealTypes;