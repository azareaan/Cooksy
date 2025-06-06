import { RecipeDetails } from "@/types/types";
import styles from './detail.module.css';
import Image from "next/image";
import Link from "next/link";

const getDetail = async (recipeid: string) : Promise<RecipeDetails | null> => {
    try {
    const res = await fetch(`${process.env.BASE_URL}${recipeid}/information?includeNutrition=false&apiKey=${process.env.API_KEY}`);

    if(!res.ok){
      return null;
    }

    const data = await res.json();

    const mapData: RecipeDetails = {
      id: data.id,
      title: data.title,
      image: data.image,
      sourceUrl: data.sourceUrl,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      vegetarian: data.vegetarian,
      vegan: data.vegan,
      veryHealthy: data.veryHealthy,
      cheap: data.cheap,
      aggregateLikes: data.aggregateLikes,
      extendedIngredients: data.extendedIngredients?.map((ingredient: any) => ({
      name: ingredient.name,
      original: ingredient.original
      })) ?? [],
      summary: data.summary,
      cuisines: data.cuisines,
      dishTypes: data.dishTypes,
      analyzedInstructions: data.analyzedInstructions?.map((instruction: {steps: {step: string}[]}) => ({
        steps: instruction.steps?.map((step: {step: string}) => ({
          step: step.step
        })) ?? []
      })) ?? [],
    };    
    
    
    return mapData;

  }
  catch {
    return null;
  }
}

const RecipeDetail = async ({params}: {params: {recipeid: string}}) => {
    const param_temp = await params;
    const recipeid = param_temp.recipeid;
    const detail = await getDetail(recipeid);

    if (!detail) {
      return (
        <main className={styles.detail_container}>
          <h1 className={styles.detail_title}>Recipe not found.</h1>
        </main>
      );
    }

    return (
        <main className={styles.main_container}>
          <Image width={1680} height={600} src={detail.image} alt={detail.title} className={styles.detail_image}/>
          <div className={styles.detail_container}>
            <div className={styles.save_icon_container}>
              <div className={styles.save_icon}></div>
              <Link href={detail.sourceUrl} className={styles.source_link} />
            </div>
            <h1 className={styles.detail_title}>{detail.title}</h1>
            <div className={styles.detail_prop_container}>
              <div className={styles.detail_info_container}>
                {detail.readyInMinutes && <div className={styles.detail_info}><Image src="/icon/lunch-time.png" width={23} height={23} alt="Ready in" className={styles.detail_info_icon}></Image><p>Ready in: {detail.readyInMinutes}'</p></div>}
                {detail.servings && <div className={styles.detail_info}><Image src="/icon/food-serving.png" width={23} height={23} alt="Serves" className={styles.detail_info_icon}></Image><p>Serves: {detail.servings}</p></div>}
                {detail.aggregateLikes && <div className={styles.detail_info}><Image src="/icon/like.png" width={23} height={23} alt="Likes" className={styles.detail_info_icon}></Image><p>Likes: {detail.aggregateLikes}</p></div>}
              </div>
              <div className={styles.detail_info_container}>
                {detail.cuisines && detail.cuisines.length > 0 && <div className={styles.detail_info}><Image src="/icon/cuisine.png" width={23} height={23} alt="Ready in" className={styles.detail_info_icon}></Image><p>Cuisines: {detail.cuisines.join(', ')}</p></div>}
                {detail.dishTypes && detail.dishTypes.length > 0 && <div  className={styles.detail_info}><Image src="/icon/dish_type.png" width={23} height={23} alt="Ready in" className={styles.detail_info_icon}></Image><p>Dish Types: {detail.dishTypes.join(', ')}</p></div>}
              </div>
            </div>
            <div className={styles.detail_bool_container}>
              {detail.vegetarian && <div className={styles.detail_bool}><Image src="/icon/vegetarian_colorful.png" width={21} height={21} alt="Vegetarian" className={styles.detail_bool_icon}></Image><p>Vegetarian</p></div>}
              {detail.vegan && <div className={styles.detail_bool}><Image src="/icon/vegan_colorful.png" width={21} height={21} alt="Vegan" className={styles.detail_bool_icon}></Image><p>Vegan</p></div>}
              {detail.veryHealthy && <div className={styles.detail_bool}><Image src="/icon/plant-based-edited.png" width={21} height={21} alt="Healthy" className={styles.detail_bool_icon}></Image><p>Healthy</p></div>}
              {detail.cheap && <div className={styles.detail_bool}><Image src="/icon/dollar_colorful.png" width={21} height={21} alt="Cheap" className={styles.detail_bool_icon}></Image><p>Cheap</p></div>}
            </div>
            <div className={styles.detail_recipe_container}>
              {detail.extendedIngredients &&
                <div>
                  <h2 className={styles.detail_recipe_title}>Ingredients</h2>
                  <ul className={styles.detail_recipe_list}>
                    {detail.extendedIngredients.map((ingredient, index) => (
                      <li key={index}>
                        <p className={styles.detail_ingredient_item}>{ingredient.original}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </div>
            <div className={styles.detail_recipe_container}>
              {detail.analyzedInstructions && 
                <div>
                  <h2 className={styles.detail_recipe_title}>Instructions</h2>
                  {detail.analyzedInstructions.map((instruction, index) => (
                    <div key={index} className={styles.detail_instruction_container}>
                      <ul className={styles.detail_recipe_list}>
                        {instruction.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className={styles.detail_instruction_item_container}>
                            <h3>Step {stepIndex + 1}</h3>
                            <p>{step.step}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </main>
    );
};

export default RecipeDetail;