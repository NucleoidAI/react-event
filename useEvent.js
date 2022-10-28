import React from "react";

import { eventMap, publish, subscribe } from "./Event";

function updateMap(subject, initialState) {
  if (eventMap.has(subject)) {
    return eventMap.get(subject);
  } else {
    eventMap.set(subject, initialState);
    return eventMap.get(subject);
  }
}

const useEvent = (subject = "", initialState) => {
  const [event, setEvent] = React.useState(updateMap(subject, initialState));

  React.useEffect(() => {
    const subs = subscribe(subject, (event) => {
      eventMap.set(subject, event);
      setEvent(event);
    });

    return () => {
      subs.unsubscribe();
    };
  }, [subject]);

  return [event, publish];
};

export { useEvent, publish };
export default useEvent;
