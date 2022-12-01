import React from "react";
import { subscribe } from "@nucleoidjs/synapses";
import styles from "./styles";

const Component5 = () => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    subscribe("glob", (e) => {
      setCounter(e);
    });
  }, []);

  return <div style={styles.box}>{counter}</div>;
};

export default Component5;
