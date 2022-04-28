import React from "react";
import useEvent from "../context";

export const Comp2 = () => {
  const [event] = useEvent("event1");

  return <div>Comp2{event}</div>;
};
