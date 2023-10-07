import Details from "./Details";
import Home from "./Home";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  async function getCountries() {
    const request = await fetch('https://restcountries.com/v3.1/all');
    const data = await request.json();
    return data;
  }

  function setDark() {
    document.querySelector('i').className = 'ri-moon-fill';
    document.querySelector('body').setAttribute('data-theme', 'dark');
  }

  function setLight() {
    document.querySelector('i').className = 'ri-moon-line';
    document.querySelector('body').setAttribute('data-theme', 'light');
  }

  function switchTheme() {
    darkMode == false ? setLight() : setDark();
  }

  useEffect(() => {
    switchTheme();
  }, [darkMode]);

  return (
    <Router>
      <div className="toggle-mode-nav flex justify-between py-3 mb-8 px-10 sticky top-0 375:px-4">
        <h1 className="font-bold">Where in the world?</h1>
        <p className="flex items-center gap-[5px] cursor-pointer font-medium" onClick={() => {setDarkMode(!darkMode)}}><i className="ri-moon-line"></i>Dark Mode</p>
      </div>
      <Switch>
        <Route exact path="/">
          <Home countries = {getCountries} />
        </Route>
        <Route path="/details/:id">
          <Details countries = {getCountries}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App
