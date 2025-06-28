import React from "react";
import { WS_URL } from "./eventConfig";
import { useEvent } from "react-event-test/client";

const Component2 = () => {
  const [event] = useEvent(WS_URL, "BUTTON_CLICKED", { string: "blue" });

  return (
    <div className={"card"}>
      <div className={"card-body"}>
        <h5 className={"card-title"}>"{event.string}"</h5>
      </div>
    </div>
  );
};

export default Component2;
