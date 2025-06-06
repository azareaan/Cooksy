'use client';
import { FoodDetailCardProps, RecipeDetails } from '@/types/types';
import { useEffect, useState } from 'react';
import styles from './booking.module.css';

const saveRecipe = (recipe_detail: RecipeDetails) => {
    if (typeof window === 'undefined') return; // Ensure this runs only in the browser
    
    const existing = JSON.parse(localStorage.getItem('saveRecipes') || '[]') as FoodDetailCardProps[];
    const isSaved = existing.findIndex(item => item.id === recipe_detail.id);
    
    if (isSaved !== -1) {
        existing.splice(isSaved, 1);
        localStorage.setItem('saveRecipes', JSON.stringify(existing));
        document.querySelector(`.${styles.save_icon}`)?.classList.remove(styles.saved);
        alert(`The item has been removed from your bookmarks!`);
        return;
    }
    
    const data = recipe_detail;
    const mapData: FoodDetailCardProps = {
      id: data.id,
      title: data.title,
      image: data.image,
      vegetarian: data.vegetarian,
      vegan: data.vegan,
      veryHealthy: data.veryHealthy,
      cheap: data.cheap,
      readyInMinutes: data.readyInMinutes,
      aggregateLikes: data.aggregateLikes,
    };
    
    existing.push(mapData);
    localStorage.setItem('saveRecipes', JSON.stringify(existing));
    alert(`The item has been saved to your bookmarks!`);
    document.querySelector(`.${styles.save_icon}`)?.classList.add(styles.saved);
}

const Booking = ({recipe_detail}: {recipe_detail: RecipeDetails}) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const existing = JSON.parse(localStorage.getItem('saveRecipes') || '[]') as FoodDetailCardProps[];
            setIsSaved(existing.some(item => item.id === recipe_detail.id));
        }
    }, [recipe_detail.id]);

    const handleClick = () => {
        saveRecipe(recipe_detail);
        if (typeof window !== 'undefined') {
            const existing = JSON.parse(localStorage.getItem('saveRecipes') || '[]') as FoodDetailCardProps[];
            setIsSaved(existing.some(item => item.id === recipe_detail.id));
        }
    };

    return (
        <div 
            className={`${styles.save_icon} ${isSaved ? styles.saved : ''}`} 
            onClick={handleClick}
        ></div>
    );
}

export default Booking;