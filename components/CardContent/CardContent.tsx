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
    </div>
  );
};

export default CardContent;
