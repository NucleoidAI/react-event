import React from "react";

import { map, publish, subscribe } from "./Event";

function last(type, init) {
  if (map.has(type)) {
    return map.get(type);
  } else {
    return init;
  }
}

const useEvent = (type = "", init) => {
  const [payload, setPayload] = React.useState(last(type, init));

  React.useEffect(() => {
    const registry = subscribe(type, (event) => {
      map.set(type, event);
      setPayload(event);
    });

    return () => {
      registry.unsubscribe();
    };
  }, [type]);

  return [payload, publish];
};

export { useEvent };
