import FoodList from "@/components/FoodList/FoodList";
import styles from "./page.module.css";
import { FoodDetailCardProps } from "@/types/types";
import Link from "next/link";

const get_4random_food = async (): Promise<FoodDetailCardProps[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=random&number=4&addRecipeInformation=true&instructionsRequired=true&apiKey=${process.env.API_KEY}`,
      {
        next: {
          revalidate: 3600, // get new data every hour
        },

        // cache: "no-store", // get random data by every reload
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


const get_4most_popular_food = async (): Promise<FoodDetailCardProps[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=popularity&number=4&addRecipeInformation=true&instructionsRequired=true&apiKey=${process.env.API_KEY}`,
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


export default async function Home() {
  const randomFoods = await get_4random_food();
  const mostPopularFoods = await get_4most_popular_food();

  return (
    <main className={styles.main}>
      <header>
        <h1>Recipe Finder</h1>
      </header>

      <div>
        <h2>Meal Types</h2>
        <Link href="/mealtypes/maincourse">Main course</Link>
        <Link href="/mealtypes/breakfast">Breakfast</Link>
        <Link href="/mealtypes/dessert">Dessert</Link>
        <Link href="/mealtypes/soup">Soup</Link>
      </div>

      <div>
        <h2>Cuisines</h2>
        <Link href="/cuisines/italian">Italian Food</Link>
        <Link href="/cuisines/chinese">Chinese Food</Link>
        <Link href="/cuisines/mexican">Mexican Food</Link>
        <Link href="/cuisines/american">American Food</Link>
      </div>


      {!randomFoods || randomFoods.length === 0 ? (
        <h2>No randomFoods found</h2>
      ) : (
        <FoodList foods={randomFoods} />
      )}

      {!mostPopularFoods || mostPopularFoods.length === 0 ? (
        <h2>No mostPopularFoods found</h2>
      ) : (
        <FoodList foods={mostPopularFoods} />
      )}
    </main>
  );
}
