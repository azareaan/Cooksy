import styles from "./searchForm.module.css";

const SearchForm = () => {

    return (
        <form
            action="/searchresults"
            method="get"
            className={styles.search_form}
        >
        <input
          type="text"
          name="q"
          placeholder="Search for new foods ..."
          required
          className={styles.search_input}
        />

        <div className={styles.select_container}>
            <div className={styles.select_wrapper}>
                <div className={styles.select_icon}></div>
                <select
                name="type"
                defaultValue=""
                className={styles.search_select}
                >
                    <option value="query" >select search option</option>
                    <option value="query">food name</option>
                    <option value="includeIngredients">ingredient</option>
                    <option value="excludeIngredients">exclude Ingredients</option>
                </select>
            </div>

            <button
            type="submit"
            className={styles.select_btn}
            ><div></div></button>
        </div>
          
        </form>
    );
};

export default SearchForm;