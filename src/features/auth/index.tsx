import { Routes, Route } from "react-router-dom";
import LoginPage from "./ui/LoginPage";

export default function AuthModule() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
}
