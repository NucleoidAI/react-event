import { subscribe, publish } from "../../index";

describe("Nucleoid synapses", () => {
  it("listens to changes in subjects", () => {
    const results = [];
    const expected = [
      "test2 called",
      "test1 called",
      "test1 called",
      "test3 called",
      "test3 called",
      "test1 called",
    ];

    subscribe("test1", (result) => results.push(result));
    subscribe("test2", (result) => results.push(result));
    subscribe("test3", (result) => results.push(result));

    expected.forEach((item) => {
      publish(item.split(" ")[0], item);
    });

    expect(results).toEqual(expect.arrayContaining(expected));
  });

  it("publisher won't work in unsubscribe events", () => {
    const results = [];

    const event = subscribe("test", (result) => results.push(result));
    publish("test", "test1");
    expect(results).toEqual(expect.arrayContaining(["test1"]));

    event.unsubscribe();
    publish("test", "test2");
    expect(results).toEqual(expect.arrayContaining(["test1"]));
  });
});
