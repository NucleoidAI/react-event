import React from "react";
import { WS_URL } from "./eventConfig";
import { publish } from "react-event-test/client";

const colors = [
  "black",
  "white",
  "gray",
  "silver",
  "maroon",
  "red",
  "purple",
  "fushsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
];

const PublishComponent = () => {
  return (
    <button
      type={"button"}
      className={"btn btn-primary"}
      onClick={() => {
        const number = Math.floor(Math.random() * 100);
        publish(WS_URL, "BUTTON_CLICKED", {
          number,
          string: colors[number % 16],
        });
      }}
    >
      Button
    </button>
  );
};

export default PublishComponent;
