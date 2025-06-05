import FoodList from '@/components/FoodList/FoodList';
import { FoodDetailCardProps, SearchPageProps } from '../../types/types';
import styles from './seachresult.module.css';


const get_12search_result = async ({searchParams} : SearchPageProps): Promise<FoodDetailCardProps[]> => {
    const { q, type } = await searchParams;
    const query = q?.trim();    
    try {
        const res = await fetch(`${process.env.BASE_URL}complexSearch?${type}=${query}&sort=popularity&number=12&instructionsRequired=true&addRecipeInformation=true&apiKey=${process.env.API_KEY}`, {
            next: {
                revalidate: 60,
            },
        });

        if (!res.ok) {
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
    } catch {
        return [];
    }
};



export default async function SearchResults({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.trim();
    const results = await get_12search_result({searchParams});

    return (
        <main className={styles.search_result_container}>
            {!results || results.length === 0 ? (
                <h2 className={styles.search_result_text}>No results found for: {query}</h2>
            ) : (
                <div className={styles.food_list_container}>
                <h2 className={styles.search_result_text}>Search Result for: {query}</h2>
                <FoodList foods={results} />
                </div>
            )}
        </main>
    );
}
