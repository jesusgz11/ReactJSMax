import React, { useMemo, useCallback, useState } from "react";

import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoList from "./components/Demo/DemoList";

function App() {
  console.log("APP RUNNING");
  const [listTitle, setListTitle] = useState("My list");
  const arr = useMemo(() => [1, 3, 5, 8, 10], []);

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoList items={arr} title={listTitle} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
