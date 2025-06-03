const getDetail = async (recipeid: string) => {
    try {
    const res = await fetch(`${process.env.BASE_URL}${recipeid}/information?includeNutrition=false&apiKey=${process.env.API_KEY}`);

    if(!res.ok){
      return [];
    }

    const data = await res.json();
    
    return data;

  }
  catch {
    return [];
  }
}

const RecipeDetail = async ({params}: {params: {recipeid: string}}) => {
    const param_temp = await params;
    const recipeid = param_temp.recipeid;
    const detail = await getDetail(recipeid);
    return (
        <>
          <h1>{detail.title}</h1>
        </>
    );
};

export default RecipeDetail;