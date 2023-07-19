import "./App.css";
import AllRoutes from "./Components/AllRoutes";

function App() {
  // const url =
  //   import.meta.env.MODE == "development"
  //     ? console.log(import.meta.env.VITE_LOCAL_URL)
  //     : console.log(import.meta.env.VITE_PROD_URL, "HERE");

  return (
    <div>
      <AllRoutes />
    </div>
  );
}

export default App;
