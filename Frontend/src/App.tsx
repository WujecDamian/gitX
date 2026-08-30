import router from "./Routes";
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./Contexts/Auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <RouterProvider router={router}></RouterProvider>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default App;
