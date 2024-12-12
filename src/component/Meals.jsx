import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
    const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);
   
    if(isLoading) {
        return <p className="center">Fetching meals...</p>
    }
   
    if(error) {
        return <ErrorPage className= "error" title='Failed to fetch meals' message={error}/>
    }

    return (
        <>
        <h2 id="heading">Your Taste Adventure Starts Here</h2>
        <ul id="meals">{loadedMeals.map((meal) => (
            <MealItem 
            key={meal.id} meal={meal}/>
        ))}</ul>
        </>
    );
}