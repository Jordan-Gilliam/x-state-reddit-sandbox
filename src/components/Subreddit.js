import React, { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import createSubredditMachine from '../state/createSubredditMachine';

const Subreddit = ({ name }) => {
  const SubredditMachine = useMemo(() => {
    return createSubredditMachine(name);
  }, [name]);

  const [current, send] = useMachine(SubredditMachine);

  if (current.matches('failure')) {
    return (
      <div>
        Failed to load posts.{' '}
        <button onClick={_ => send('RETRY')}>Retry?</button>
      </div>
    );
  }

  const { subreddit, posts, lastUpdated } = current.context;

  return (
    <section
      data-machine={SubredditMachine.id}
      data-state={current.toStrings().join(' ')}
    >
      {current.matches('loading') && <div>Loading posts...</div>}
      {posts && (
        <>
          <header>
            <h2>{subreddit}</h2>
            <small>
              Last updated: {lastUpdated}{' '}
              <button onClick={_ => send('REFRESH')}>Refresh</button>
            </small>
          </header>
          <ul>
            {posts.map(post => {
              return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default Subreddit;
