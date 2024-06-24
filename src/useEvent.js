import { last, publish, subscribe } from "./Event.js";

import React from "react";

const useEvent = (...args) => {
  const init = args.pop();
  const type = args.join(".");

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

