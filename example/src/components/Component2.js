import React from "react";
import { useEvent } from "@nucleoidjs/synapses";
import styles from "./styles";

const Component2 = () => {
  const [event] = useEvent("BUTTON_CLICKED", { string: "blue" });

  return <div style={styles.box}>"{event.string}"</div>;
};

export default Component2;
