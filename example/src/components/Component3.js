import React from "react";
import { useEvent } from "@nucleoidjs/synapses";
import styles from "./styles";

const Component3 = () => {
  const [event] = useEvent("glob", 0);

  return <div style={styles.box}>{event}</div>;
};

export default Component3;