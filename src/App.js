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
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/LeCiseau/Front-end-JSON/master/haircut.json"
      );
      const tabPersonVoted = response.data.map((item, index) => {
        item.nbVote = 0;
        item.nbPoint = 0;
        return item;
      });

      setTabPerson(tabPersonVoted);
    } catch (error) {
      console.log("error");
    }
  };

  const tabCombi = [];
  for (let a = 0; a < tabPerson.length; a++) {
    for (let b = 0; b < tabPerson.length; b++) {
      const couple = { a: a, b: b };
      if (a !== b) {
        const item = { proposed: false, couple: couple };
        tabCombi.push(item);
      }
    }
  }
  const updatePersonVoted = (indexA, indexB, indexVoted) => {
    tabPerson[indexA].nbVote++;
    tabPerson[indexB].nbVote++;
    tabPerson[indexVoted].nbPoint++;
  };

  // fonction qui retourne un indexCombi qui ne contient pas une tête deja affichées dans les 3 tours précédents
  const getNextCombi = history => {
    let nextIndex = indexCombi;
    let ok = true;

    console.log("debut", nextIndex);
    do {
      do {
        nextIndex++;

        if (nextIndex >= tabCombi.length) {
          nextIndex = 0;
          console.log("raz de nextIndex");
        }
        // debug
        if (tabCombi[nextIndex].proposed) {
          console.log("combi deja faite");
        }
      } while (tabCombi[nextIndex].proposed); // on boucle tant qu'on est sur des combinaisons deja proposées

      // regarde si pas dans les 3 derniers
      ok = true;
      const coupleProposed = tabCombi[nextIndex].couple;
      for (let i = history.length - 1; i >= 0 && i >= history.length - 3; i--) {
        // regarde le couple dans l'historique
        const coupleHistory = history[i];
        // la tête est deja sortie ?
        if (
          coupleHistory.a === coupleProposed.a ||
          coupleHistory.b === coupleProposed.b ||
          coupleHistory.a === coupleProposed.b ||
          coupleHistory.b === coupleProposed.a
        ) {
          ok = false;
          break;
        }
      }
    } while (!ok);

    setIndexCombi(nextIndex);
  };

  const handleVoted = (indexA, indexB, indexVoted) => {
    updatePersonVoted(indexA, indexB, indexVoted);

    // on dit que cette combinaison a été faite
    tabCombi[indexCombi].proposed = true;

    // ajoute a l'historique le couple proposé
    const tempHistory = [...history];
    const couple = { a: indexA, b: indexB };
    tempHistory.push(couple);
    setHistory(tempHistory);
    console.log("ajout a history");

    getNextCombi(tempHistory);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
              couple={tabCombi.length > 0 ? tabCombi[indexCombi].couple : null}
              handleVoted={handleVoted}
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
