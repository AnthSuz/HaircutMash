import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Menu from "./components/Menu";

import VotePage from "./containers/VotePage";
import ClassementPage from "./containers/ClassementPage";

function App() {
  const [tabPerson, setTabPerson] = useState([]);
  const [indexCombi, setIndexCombi] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/LeCiseau/Front-end-JSON/master/haircut.json"
      );
      const tabPersonVoted = response.data.map((item, index) => {
        // On initialise 2 nouvelles propriétés
        item.nbVote = 0;
        item.nbPoint = 0;
        return item;
      });
      // On stock le tout dans un state
      setTabPerson(tabPersonVoted);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const tabCombi = [];
  // On réalise une double boucle, pour créer des combinaisons de couple et ensuite les comparer
  for (let a = 0; a < tabPerson.length; a += 1) {
    for (let b = 0; b < tabPerson.length; b += 1) {
      const couple = { a: a, b: b };
      if (a !== b) {
        tabCombi.push(couple);
      }
    }
  }

  // On incrémente le nombre de vote et le nombre de point
  const updatePersonVoted = (indexA, indexB, indexVoted) => {
    let newTabPerson = [...tabPerson];
    newTabPerson[indexA].nbVote += 1;
    newTabPerson[indexB].nbVote += 1;
    newTabPerson[indexVoted].nbPoint += 1;
    setTabPerson(newTabPerson);
  };

  // On propose une combinaison différente
  const getNextCombi = () => {
    setIndexCombi(indexCombi + 1);
  };

  const handleVoted = (indexA, indexB, indexVoted) => {
    updatePersonVoted(indexA, indexB, indexVoted);
    getNextCombi();
  };

  return (
    <>
      <Router>
        <Header />
        <Menu />
        <Switch>
          <Route exact={true} path="/">
            <Redirect to="/VotePage" />
          </Route>
          <Route path="/VotePage">
            <VotePage
              tabPerson={tabPerson}
              couple={tabCombi}
              handleVoted={handleVoted}
              indexCombi={indexCombi}
            />
          </Route>
          <Route>
            <ClassementPage tabPerson={tabPerson} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
