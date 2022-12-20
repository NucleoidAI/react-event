import { subscribe, publish } from "../../index";

describe("Synapses", () => {
  it("subscribes and publishes events", (done) => {
    subscribe("TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
    });

    subscribe("TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
      done();
    });

    publish("TEST_EVENT", { number: 10, string: "blue" });
  });
});
