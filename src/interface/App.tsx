import { AppContextProvider } from "./context";
import Page from "./components/page";
import Loader from "./components/loader";

function App() {
  return (
    <AppContextProvider>
      <Loader></Loader>
      <Page></Page>
    </AppContextProvider>
  );
}

export default App;
