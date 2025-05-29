import { RecipeCardProps } from "@/types/types";
import RouteToDetail from "../RouteToDetail/RouteToDetail";

const CardContent = ({ props }: { props: RecipeCardProps }) => {
  return (
    <div>
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      {/* <RouteToDetail id={props.id} /> */}
    </div>
  );
};

export default CardContent;
