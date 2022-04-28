import React from "react";
import useEvent from "../context";

export const Comp4 = () => {
  const [event, dispatch] = useEvent("event1");

  return (
    <div>
      Comp4{event}
      <button onClick={() => dispatch("event1", "Event 2")}>
        click event 2
      </button>
    </div>
  );
};
