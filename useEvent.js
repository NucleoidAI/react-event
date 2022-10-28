import React from "react";

import { map, publish, subscribe } from "../Event";

function updateMap(subject, state) {
  if (map.has(subject)) {
    return map.get(subject);
  } else {
    map.set(subject, state);
    return state;
  }
}

const useEvent = (subject = "", initialState) => {
  const [event, setEvent] = React.useState(updateMap(subject, initialState));

  React.useEffect(() => {
    const subs = subscribe(subject, (event) => {
      map.set(subject, event);
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
