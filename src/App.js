import "./App.css";
import { Navbar } from "./components/Navbar";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <AllRoutes />
    </>
  );
}

export default App;
