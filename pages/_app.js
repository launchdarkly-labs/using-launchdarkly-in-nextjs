import "../styles/global.css";
import "prismjs/themes/prism-tomorrow.css";
import { withLDProvider } from "launchdarkly-react-client-sdk";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withLDProvider({
  clientSideID: "5e29e34e2a49f409996d7194",
  user: {
    anonymous: true,
  },
  options: {
    bootstrap: "localStorage",
  },
})(App);