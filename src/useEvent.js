import React from "react";

import { map, publish, subscribe } from "./Event";

function last(type, init) {
  if (map.has(type)) {
    return map.get(type);
  } else {
    return init;
  }
}

const useEvent = (subject = "", init) => {
  const [payload, setPayload] = React.useState(last(subject, init));

  React.useEffect(() => {
    const registry = subscribe(subject, (event) => {
      map.set(subject, event);
      setPayload(event);
    });

    return () => {
      registry.unsubscribe();
    };
  }, [subject]);

  return [payload, publish];
};

export { useEvent };
