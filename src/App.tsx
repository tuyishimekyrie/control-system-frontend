import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* <Register /> */}
      <Login/>
    </>
  );
}

export default App