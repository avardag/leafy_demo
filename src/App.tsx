import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import StartPage from "./pages/StartPage";
import DrinkPage from "./pages/DrinkPage";
import SalladPage from "./pages/SalladPage";
import DressingPage from "./pages/DressingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { CartStoreProvider } from "./cartStore";
import PersistentDrawerRight from "./components/Layout";

function App() {
  return (
    <CartStoreProvider>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1500}
        maxSnack={3} // Updated to maxSnack
      >
        <PersistentDrawerRight>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/sallad" element={<SalladPage />} />
            <Route path="/dressing" element={<DressingPage />} />
            <Route path="/drink" element={<DrinkPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </PersistentDrawerRight>
      </SnackbarProvider>
    </CartStoreProvider>
  );
}

export default App;
