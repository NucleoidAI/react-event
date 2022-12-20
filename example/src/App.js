import React from "react";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import PublishComponent from "./components/PublishComponent";
import styles from "./components/styles";

const App = () => {
  return (
    <>
      <div style={styles.wrapper}>
        <Component1 />
        <Component2 />
      </div>
      <div style={styles.wrapper}>
        <PublishComponent />
      </div>
    </>
  );
};
export default App;
