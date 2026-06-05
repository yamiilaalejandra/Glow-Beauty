import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { initializeProductStorage } from "./data/products";
import { initializeAccessoryStorage } from "./data/accessories";

function App() {
  useEffect(() => {
    initializeProductStorage();
    initializeAccessoryStorage();
  }, []);

  return <AppRouter />;
}

export default App;
