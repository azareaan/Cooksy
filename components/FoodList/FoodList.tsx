import { FoodDetailCardProps } from '@/types/types';
import styles from './foodList.module.css';
import FoodCard from '../FoodCard/FoodCard';

const FoodList = ({foods}: {foods: FoodDetailCardProps[]}) => {
    return (
        <div className={styles.foodList}>
            {foods.map((food) => (
                <FoodCard
                    key={food.id}
                    props={food}
                />
            ))}
        </div>
    );
}

export default FoodList;