import React from "react";
import useEvent from "../context";
export const Comp3 = () => {
  const [event] = useEvent("event1");
  return <div>Comp3{event}</div>;
};
