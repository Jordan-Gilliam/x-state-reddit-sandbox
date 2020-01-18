import { Machine, assign } from 'xstate';

const redditMachine = Machine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null
  },
  states: {
    idle: {},
    selected: {} // no invocations!
  },
  on: {
    SELECT: {
      target: '.selected',
      actions: assign({
        subreddit: (context, event) => event.name
      })
    }
  }
});

export default redditMachine;
