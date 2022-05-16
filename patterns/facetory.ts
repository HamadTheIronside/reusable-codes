import { Facetory, InitialState } from "./facetory.types";

const createFacetory = <Status, Event, Actions>(
  initial: InitialState<Status, Actions>,
): Facetory<Status, Event, Actions> => {
  const { actions } = initial;

  const facetory: Facetory<Status, Event, Actions> = {
    status: initial.defaultStatus,
    eventsMemo: [],
    actions,
    subscribe(event, callback, runOneTime) {
      const alreadySubbed = !!facetory.eventsMemo.find(
        (subscriber) => Object.is(subscriber.callback, callback) && event === subscriber.event,
      );

      if (!alreadySubbed) {
        facetory.eventsMemo.push({ callback, event, runOneTime });
      }
    },
    unSubscribe(event, callback) {
      const index = facetory.eventsMemo.findIndex(
        (subscriber) => Object.is(subscriber.callback, callback) && event === subscriber.event,
      );

      if (index > -1) {
        facetory.eventsMemo.splice(index, 1);
      }
    },
    getFacetory() {
      return facetory;
    },
    setFacetoryAction(newActions) {
      Object.entries(newActions).forEach(([name, func]) => {
        facetory.actions[name] = func;
      });
    },
    notify(event, ...args) {
      const events = facetory.eventsMemo.filter((subscriber) => subscriber.event === event);
      events.forEach((subscriber) => subscriber.callback(...args));
      events
        .filter((subscriber) => subscriber.runOneTime)
        .forEach((subscriber) => facetory.unSubscribe(subscriber.event, subscriber.callback));
    },
  };

  return facetory;
};

export { createFacetory };
