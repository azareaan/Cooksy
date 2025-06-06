import { FoodDetailCardProps } from '@/types/types';
import RouteToDetail from '../RouteToDetail/RouteToDetail';
import CardContent from '../CardContent/CardContent';

const FoodCard = ({props}: {props: FoodDetailCardProps}) => {
    return (
        <RouteToDetail id={props.id}>
            <CardContent props={props}/>
        </RouteToDetail>
    );
}

export default FoodCard;