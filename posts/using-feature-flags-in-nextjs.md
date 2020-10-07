---
title: 'Using feature flags in NextJS'
date: '2020-10-07'
---

This is a NextJS website exported as a static site using `next build && next export`.

Since this is a purely static site, we utilized [LaunchDarkly's React SDK](https://docs.launchdarkly.com/sdk/client-side/react) to make this work. In this example, we're using a feature flag called `redesign`. When this flag is turned on, the background of the page changes to a light green color. When it's off, the background color is white.

The basic implementation starts with [`_app.js`](https://nextjs.org/docs/advanced-features/custom-app):

```jsx
// pages/_app.js
import '../styles/global.css'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withLDProvider({
  clientSideID: 'xxxxxxxxxxx',
  user: {
    "anonymous": true,
  },
  options: {
    bootstrap: 'localStorage'
  }
})(App);
```

We override the default `App` component (using `_app.js`) so that we can inject the LaunchDarkly client into the NextJS app. Note that we pass the [`bootstrap: 'localStorage'`](https://docs.launchdarkly.com/sdk/client-side/javascript#bootstrapping) option when we initialize the client. This will allow us to cache the flag values in localStorage.

From there, you can use the LaunchDarkly client in any component you'd like. Here's an example of the code that renders this page:

```jsx
// pages/posts/[id].js
...
import { useFlags } from "launchdarkly-react-client-sdk";

export default function Post({ postData }) {

  // Fetch flags using useFlags hook
  const { redesign } = useFlags();

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          {` `}&mdash;{` `}
          <span><code>redesign</code> feature flag is {redesign ? "on" : "off"}</span>
        </div>
...
```

This example will work on a NextJS site hosted through Vercel, the NextJS Node server, or as a statically generated site hosted on S3/CDN.

The code behind this [example is available on Github](https://github.com/launchdarkly-labs/using-launchdarkly-in-nextjs).