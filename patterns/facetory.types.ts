interface Subscriber<Event> {
  event: Event;
  callback: Function;
  runOneTime?: boolean;
}

interface Subscribe<Event> {
  (event: Event, callback: Function, runOneTime?: boolean): void;
}

interface UnSubscribe<Event> {
  (event: Event, callback: Function): void;
}

interface Notify<Event> {
  (event: Event, ...args: unknown[]): void;
}

export interface Facetory<Status, Event, Actions> {
  status: Status;

  eventsMemo: Subscriber<Event>[];

  // subscribe
  readonly subscribe: Subscribe<Event>;
  readonly unSubscribe: UnSubscribe<Event>;
  readonly notify: Notify<Event>;

  actions?: Actions;

  readonly getFacetory: () => Facetory<Status, Event, Actions>;
  readonly setFacetoryAction: (actions: Partial<Actions>) => void;
}

export interface InitialState<Status, Actions> {
  name: string;
  defaultStatus: Status;
  actions: Actions;
}
