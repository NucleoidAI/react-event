import { messages, publish, subscribe } from "../Event.js";

describe("react-event", () => {
  it("subscribes and publishes events", (done) => {
    subscribe("REACT-EVENT_TEST", "TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
    });

    subscribe("REACT-EVENT_TEST", "TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
      done();
    });

    publish("REACT-EVENT_TEST", "TEST_EVENT", { number: 10, string: "blue" });
  });

  it("publishes and subscribes events", (done) => {
    publish("REACT-EVENT_TEST", "TEST_EVENT", { number: 10, string: "blue" });

    subscribe("REACT-EVENT_TEST", "TEST_EVENT", (result) => {
      expect(result).toMatchObject({ number: 10, string: "blue" });
      done();
    });
  });

  it("notifies all subscribers of an event", (done) => {
    let receivedByFirstSubscriber = false;
    let receivedBySecondSubscriber = false;

    const checkDone = () => {
      if (receivedByFirstSubscriber && receivedBySecondSubscriber) {
        done();
      }
    };

    subscribe("REACT-EVENT_TEST", "MULTI_SUB_EVENT", (result) => {
      expect(result).toMatchObject({ data: "shared" });
      receivedByFirstSubscriber = true;
      checkDone();
    });

    subscribe("REACT-EVENT_TEST", "MULTI_SUB_EVENT", (result) => {
      expect(result).toMatchObject({ data: "shared" });
      receivedBySecondSubscriber = true;
      checkDone();
    });

    publish("REACT-EVENT_TEST", "MULTI_SUB_EVENT", { data: "shared" });
  });

  it("handles events with no subscribers without errors", () => {
    expect(() =>
      publish("REACT-EVENT_TEST", "NO_SUBSCRIBER_EVENT", { data: "none" })
    ).not.toThrow();
  });

  it("registers the last published event to map", () => {
    publish("REACT-EVENT_TEST", "LAST_EVENT", { data: "test payload" });

    const lastPublishedEvent = messages.get("REACT-EVENT_TEST.LAST_EVENT");
    expect(lastPublishedEvent).toEqual({ data: "test payload" });
  });

  it("returns registry in callback", (done) => {
    publish("REACT-EVENT_TEST", "CALLBACK_REGISTRY_EVENT", {
      data: "test payload",
    });

    subscribe(
      "REACT-EVENT_TEST",
      "CALLBACK_REGISTRY_EVENT",
      (result, registry) => {
        expect(result).toMatchObject({ data: "test payload" });
        expect(registry).toMatchObject({
          id: expect.any(String),
          type: "REACT-EVENT_TEST.CALLBACK_REGISTRY_EVENT",
          callback: expect.any(Function),
          unsubscribe: expect.any(Function),
        });

        registry.unsubscribe();
      }
    );

    subscribe(
      "REACT-EVENT_TEST",
      "CALLBACK_REGISTRY_EVENT_2",
      (result, registry) => {
        expect(result).toMatchObject({ data: "test payload 2" });
        expect(registry).toMatchObject({
          id: expect.any(String),
          type: "REACT-EVENT_TEST.CALLBACK_REGISTRY_EVENT_2",
          callback: expect.any(Function),
          unsubscribe: expect.any(Function),
        });

        registry.unsubscribe();

        done();
      }
    );

    publish("REACT-EVENT_TEST", "CALLBACK_REGISTRY_EVENT_2", {
      data: "test payload 2",
    });
  });
});

