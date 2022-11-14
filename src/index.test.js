import { act, renderHook, cleanup } from "@testing-library/react";
import { useEvent, subscribe, publish } from "../index";

afterEach(cleanup);

describe("useStateful", () => {
  it("should change value", () => {
    const { result } = renderHook(() => useEvent("event1", "initial"));
    const [state, publish] = result.current;

    expect(state).toBe("initial");

    // act(() => publish("event1", "test"));
    // expect(result.current[0]).toBe("test");
  });

  it("should change value", () => {
    function callback(value) {
      expect(value).toBe(5);
    }

    subscribe("event1", callback);

    publish("event1", 15);
  });
});
