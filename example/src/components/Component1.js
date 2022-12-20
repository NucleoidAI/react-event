import React from "react";
import { useEvent } from "@nucleoidjs/synapses";
import styles from "./styles";

const Component1 = () => {
  const [event] = useEvent("BUTTON_CLICKED", { number: 10 });

  return <div style={styles.box}>{event.number}</div>;
};

export default Component1;
