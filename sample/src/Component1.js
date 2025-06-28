import React from "react";
import { WS_URL } from "./eventConfig";
import { useEvent } from "react-event-test/client";

const Component1 = () => {
  const [event] = useEvent(WS_URL, "BUTTON_CLICKED", { number: 10 });

  return (
    <div className={"card"}>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{event.number}</h5>
      </div>
    </div>
  );
};

export default Component1;
