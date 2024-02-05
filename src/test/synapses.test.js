import { publish, subscribe } from "../../index";

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

  it("notifies all subscribers of an event", (done) => {
    let receivedByFirstSubscriber = false;
    let receivedBySecondSubscriber = false;

    const checkDone = () => {
      if (receivedByFirstSubscriber && receivedBySecondSubscriber) {
        done();
      }
    };

    subscribe("MULTI_SUB_EVENT", (result) => {
      expect(result).toMatchObject({ data: "shared" });
      receivedByFirstSubscriber = true;
      checkDone();
    });

    subscribe("MULTI_SUB_EVENT", (result) => {
      expect(result).toMatchObject({ data: "shared" });
      receivedBySecondSubscriber = true;
      checkDone();
    });

    publish("MULTI_SUB_EVENT", { data: "shared" });
  });

  it("handles events with no subscribers without errors", () => {
    expect(() =>
      publish("NO_SUBSCRIBER_EVENT", { data: "none" })
    ).not.toThrow();
  });
});
