import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Encoder from "./pages/Encoder";
import { Login } from "./pages/Login";
import { useAppSelector } from "./store/store";

function App() {
  const [cookie, setCookie] = useState();
  const user = useAppSelector((state) => state.login.user);
  useEffect(() => {
    const cookies = new Cookies();
    const cookieValue = cookies.get("cookies");
    setCookie(cookieValue);
  }, [user]);

  if (!cookie) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/encoder" />} />
        <Route path="/encoder" element={<Encoder />} />
        <Route path="*" element={<Navigate to="/encoder" />} />
      </Routes>
    );
  }
}

export default App;
