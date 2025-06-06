'use client';
import { FoodDetailCardProps, RecipeDetails } from '@/types/types';
import { useEffect, useState } from 'react';
import styles from './bookMark.module.css';
import FoodList from '@/components/FoodList/FoodList';


const getSavedRecipe = () : FoodDetailCardProps[] => {
    if (typeof window === 'undefined') return []; // Ensure this runs only in the browser

    const existing = JSON.parse(localStorage.getItem('saveRecipes') || '[]') as FoodDetailCardProps[];
    console.log(existing);
    
    return existing;
}

const BookMark = () => {
    const [existing, setExisting] = useState<FoodDetailCardProps[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setExisting(getSavedRecipe());
        }
    }, []);


    return (
        <main className={styles.bookmark_page}>
            <h1>Your Foods</h1>
            <div className={styles.food_list_container}>
            {!existing || existing.length === 0 ? (
                <h2>You haven't saved any food yet.</h2>
            ) : (
                <FoodList foods={existing} />
            )}
        </div>
        </main>
    );
}

export default BookMark;