import React from "react";
import useEvent from "../context";

export const Comp1 = () => {
  const [event, dispatch] = useEvent("event1");

  return (
    <div>
      Comp1{event}
      <button onClick={() => dispatch("event1", "Event 1")}>click event 1</button>
    </div>
  );
};
