import styles from "./cardContent.module.css";
import { FoodDetailCardProps } from "@/types/types";
import RouteToDetail from "../RouteToDetail/RouteToDetail";
import Image from "next/image";

const CardContent = ({ props }: { props: FoodDetailCardProps }) => {
  return (
    <div className={styles.food_card_container}>
      <Image width={325} height={230} src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      <RouteToDetail id={props.id} />
      <div>{props.preparationMinutes}</div>
      <div>{props.readyInMinutes}</div>
      <div>{props.aggregateLikes}</div>
      <div>{props.healthScore}</div>
      {props.vegetarian && <div>Vegetarian</div>}
      {props.vegan && <div>vegan</div>}
      {props.veryHealthy && <div>veryHealthy</div>}
      {props.cheap && <div>cheap</div>}
    </div>
  );
};

export default CardContent;
