import React from "react";
import { useEvent } from "@nucleoidai/react-event";

const Component1 = () => {
  const [event] = useEvent("BUTTON_CLICKED", { number: 10 });

  return (
    <div className={"card"}>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{event.number}</h5>
      </div>
    </div>
  );
};

export default Component1;
