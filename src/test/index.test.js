import { subscribe, publish } from "../../index";

describe("Nucleoid synapses", () => {
  it("listens to changes in subjects", () => {
    subscribe("test1", (result) => {
      expect(result).toBe("test1");
    });

    subscribe("test1", (result) => {
      expect(result).toBe("test1");
    });

    publish("test1", "test1");
  });
});
