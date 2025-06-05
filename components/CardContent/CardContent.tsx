import styles from "./cardContent.module.css";
import { FoodDetailCardProps } from "@/types/types";
import RouteToDetail from "../RouteToDetail/RouteToDetail";
import Image from "next/image";

const CardContent = ({ props }: { props: FoodDetailCardProps }) => {
  return (
    <div className={styles.food_card_container}>
      <Image width={310} height={200} src={props.image} alt={props.title} className={styles.card_image}/>
      <h2 className={styles.card_title}>{props.title}</h2>
      {props.readyInMinutes && <div className={styles.card_prop}><Image src="/icon/lunch-time.png" width={23} height={23} alt="Ready in" className={styles.card_prop_icon}></Image><p>Ready in: {props.readyInMinutes}'</p></div>}
      {props.aggregateLikes && <div className={styles.card_prop}><Image src="/icon/like.png" width={23} height={23} alt="Likes" className={styles.card_prop_icon}></Image><p>Likes: {props.aggregateLikes}</p></div>}
      <div className={styles.card_bool_container}>
        {props.vegetarian && <div className={styles.card_bool}><Image src="/icon/vegetarian_colorful.png" width={21} height={21} alt="Likes" className={styles.card_bool_icon}></Image><p>Vegetarian</p></div>}
        {props.vegan && <div className={styles.card_bool}><Image src="/icon/vegan_colorful.png" width={21} height={21} alt="Likes" className={styles.card_bool_icon}></Image><p>Vegan</p></div>}
        {props.veryHealthy && <div className={styles.card_bool}><Image src="/icon/plant-based-edited.png" width={21} height={21} alt="Likes" className={styles.card_bool_icon}></Image><p>Healthy</p></div>}
        {props.cheap && <div className={styles.card_bool}><Image src="/icon/dollar_colorful.png" width={21} height={21} alt="Likes" className={styles.card_bool_icon}></Image><p>Cheap</p></div>}
      </div>
      <RouteToDetail id={props.id} />
    </div>
  );
};

export default CardContent;
