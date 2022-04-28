import { useState, useEffect } from "react";
import emitter from "./components/emitter";

function useEvent(caseName) {
  const [event, setEvent] = useState();

  useEffect(() => {
    emitter.on(caseName, (payload) => {
      setEvent(payload);
    });
  }, [caseName]);

  function dispatch(event, payload) {
    emitter.emit(event, payload);
  }

  return [event, dispatch];
}

export default useEvent;
