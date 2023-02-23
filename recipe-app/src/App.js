import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const API_KEY = "7b19a8e1944c3beac50cbc7e77470222";
  const APP_ID = "d345a47a";

  const [loading, setLoading] = useState(false);

  const [incredientList, setIncredientList] = useState([]);
  const inputRef = useRef(null);

  const search = () => {
    console.log(inputRef);
    searchForRecipe(inputRef.current.value);
  };

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.hits);
        setIncredientList(res.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchForRecipe("chicken");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input ref={inputRef} placeholder="Search for recipe" />
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="Wrapper">
          {incredientList.map((everyItem) => {
            return (
              <div className="Ingredient">
                <span>{everyItem.recipe.label}</span>
                <img src={everyItem.recipe.image} />
                <div className="Steps">
                  {everyItem.recipe.ingredientLines.map((step) => {
                    return <p>{step}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
