import { RecipeList } from '@/types/types';
import styles from './foodList.module.css';
import FoodCard from '../FoodCard/FoodCard';

const FoodList = ({recipes}: {recipes: RecipeList}) => {
    return (
        <div className={styles.foodList}>
            {recipes.map((recipe) => (
                <FoodCard
                    key={recipe.id}
                    props={recipe}
                />
            ))}
        </div>
    );
}

export default FoodList;