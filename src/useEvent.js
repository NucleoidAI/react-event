import React from "react";

import { publish, subscribe, last } from "./Event";

const useEvent = (type = "", init) => {
  const [payload, setPayload] = React.useState(last(type, init));

  React.useEffect(() => {
    const registry = subscribe(type, (event) => {
      setPayload(event);
    });

    return () => {
      registry.unsubscribe();
    };
  }, [type]);

  return [payload, publish];
};

export { useEvent };
