import React from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
import PublishComponent from "./PublishComponent";
import styles from "./styles";

const App = () => {
  return (
    <div style={styles.center}>
      <div style={styles.box}>
        <Component1 />
        <Component2 />
      </div>
      <div style={styles.box}>
        <PublishComponent />
      </div>
    </div>
  );
};
export default App;
