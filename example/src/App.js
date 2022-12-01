import React from "react";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component3 from "./components/Component3";
import Component4 from "./components/Component4";
import Component5 from "./components/Component5";
import Component6 from "./components/Component6";
import styles from "./components/styles";

const App = () => {
  return (
    <>
      <div style={styles.wrapper}>
        <Component1 />
        <Component2 />
        <Component3 />
        <Component4 />
        <Component5 />
      </div>
      <div style={styles.wrapper}>
        <Component6 />
      </div>
    </>
  );
};
export default App;
