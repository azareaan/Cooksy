import FoodList from "@/components/FoodList/FoodList";
import styles from "./page.module.css";
import { FoodDetailCardProps } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const get_4random_food = async (): Promise<FoodDetailCardProps[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=random&number=4&instructionsRequired=true&addRecipeInformation=true&apiKey=${process.env.API_KEY}`,
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
      vegetarian: foodDetail.vegetarian,
      vegan: foodDetail.vegan,
      veryHealthy: foodDetail.veryHealthy,
      cheap: foodDetail.cheap,
      readyInMinutes: foodDetail.readyInMinutes,
      aggregateLikes: foodDetail.aggregateLikes,
    }));


    return mapData;
  }
  catch {
    return [];
  }
};


const get_4most_popular_food = async (): Promise<FoodDetailCardProps[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}complexSearch?sort=popularity&number=4&instructionsRequired=true&addRecipeInformation=true&apiKey=${process.env.API_KEY}`,
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
      readyInMinutes: foodDetail.readyInMinutes,
      aggregateLikes: foodDetail.aggregateLikes,
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
      <header className={styles.header}>
        <h1>Recipe Finder</h1>
      </header>

      <div className={styles.select_container}>
        <h2>Meal Types</h2>
        <div>
          <Link className={styles.select_card} href="/mealtypes/maincourse">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Main course</h2>
            <p>explore more foods</p>
          </Link>
          <Link className={styles.select_card} href="/mealtypes/breakfast">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Breakfast</h2>
            <p>explore more foods</p>
          </Link>
          <Link className={styles.select_card} href="/mealtypes/dessert">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Dessert</h2>
            <p>explore more foods</p>
          </Link>
          <Link className={styles.select_card} href="/mealtypes/soup">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Soup</h2>
            <p>explore more foods</p>
          </Link>
        </div>
      </div>

      <div className={styles.select_container}>
        <h2>Cuisines</h2>
        <div>
          <Link className={styles.select_card} href="/cuisines/italian">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Italian Food</h2>
            <p>explore more foods</p>
          </Link>
          <Link className={styles.select_card} href="/cuisines/chinese">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Chinese Food</h2>
            <p>explore more foods</p>
          </Link>
          <Link className={styles.select_card} href="/cuisines/mexican">
            <Image width={325} height={450} src="/images/itallianfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>Mexican Food</h2>
            <p>explore more foods</p>
          </Link>
          <Link className={styles.select_card} href="/cuisines/american">
            <Image width={325} height={450} src="/images/americanfood.png" alt="Main course" className={styles.select_card_image}/>
            <h2>American Food</h2>
            <p>explore more foods</p>
          </Link>
        </div>
      </div>


      {!randomFoods || randomFoods.length === 0 ? (
        <h2>No randomFoods found</h2>
      ) : (
        <div className={styles.food_list_container}>
          <h2>Explore new foods</h2>
          <FoodList foods={randomFoods} />
        </div>
      )}

      {!mostPopularFoods || mostPopularFoods.length === 0 ? (
        <h2>No mostPopularFoods found</h2>
      ) : (
        <div className={styles.food_list_container}>
          <h2>Most popular foods</h2>
          <FoodList foods={mostPopularFoods} />
        </div>
      )}
    </main>
  );
}
