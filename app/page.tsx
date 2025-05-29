import FoodList from "@/components/FoodList/FoodList";
import styles from "./page.module.css";
import { RecipeList } from "@/types/types";

const get_12random_recipe = async (): Promise<RecipeList> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=random&number=12&apiKey=${process.env.API_KEY}`,
      {
        next: {
          revalidate: 3600, // get new data every hour
        },
      }
    );

    if(!res.ok){
      return [];
    }

    const data = await res.json();
    
    return data.results;

  }
  catch {
    return [];
  }
};

// {
//   results: [
//     {
//       id: 664737,
//       title: 'Veggie Lasagna Rolls with Peppery Pecorino Marinara',
//       image: 'https://img.spoonacular.com/recipes/664737-312x231.jpg',
//       imageType: 'jpg'
//     },
//     {
//       id: 664488,
//       title: 'Vegan Strawberry Shortcake served with Vegan Whipped Cream',
//       image: 'https://img.spoonacular.com/recipes/664488-312x231.jpg',
//       imageType: 'jpg'
//     }
//   ],
//   offset: 0,
//   number: 2,
//   totalResults: 5228
// }


export default async function Home() {
  const recipes = await get_12random_recipe();

  return (
    <main className={styles.main}>
      <header>
        <h1>Recipe Finder</h1>
      </header>

      {!recipes || recipes.length === 0 ? (
        <h2>No recipes found</h2>
      ) : (
        <FoodList recipes={recipes} />
      )}
    </main>
  );
}
