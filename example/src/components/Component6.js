import React from "react";
import { publish } from "@nucleoidjs/synapses";

const Component6 = () => {
  let counter = 1;
  return <button onClick={() => publish("glob", counter++)}>count</button>;
};

export default Component6;
