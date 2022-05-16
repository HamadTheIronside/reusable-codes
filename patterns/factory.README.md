# Facetory

A pattern based on event-driven pattern using TypeScript.

# How to create one?

Before using the pattern, you need to define a couple of things.

## Events

```typescript
enum Events {
  onIncrement = "onIncrement",
  onDecrement = "onDecrement",
}
```

Using the above events, developers can subscribe to them, and whenever we want to, we can notify them using the notify function that the event happened (we will discuss this later on).

## Status

```typescript
enum Status {
  LOADED = "LOADED",
}
```

Assuming you have to track the status of your component, you can use this feature. If you don't want to, then use the loaded status as your default.

## Actions

Actions are triggered using.`example.actions.actionName()` but before implementing them, let's implement the interface of the actions.

```typescript
interface Actions {
	getCount: () => number;
	increment: () => number;
	decrement: () => number;
}
```

## Facetory Object

```typescript
let currentCount = 0;

const countManager = createFacetory<Status, Events, Actions>({
  name: "counter",
  defaultStatus: Status.LOADED,
  actions: {
    getCount: () => currentCount,
    increment: () => {
      currentCount++;
      countManager.notify(Events.onIncrement);
      return currentCount
    },
    decrement: () => {
      currentCount--;
      countManager.notify(Events.onDecrement);
      return currentCount
    }
  }
})

countManager.subscribe(Events.onIncrement, () => {
  console.log("Increment happend");
})

countManager.actions.increment();
countManager.actions.increment();

console.log(countManager.actions.getCount());

countManager.actions.decrement();

console.log(countManager.actions.getCount());
```

The above code will log the following strings:

- Increment happend
- Increment happend
- 2
- 1

## Subscribing

In this pattern, we can subscribe to the available events. Whenever we trigger the `notify` function on a specific event. all the subbed functions would be called

Also, don't forget to unsubscribe.



