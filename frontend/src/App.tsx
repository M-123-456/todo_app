import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoLayout from "./layouts/TodoLayout";
import Profile from "./pages/Profile";
import Todolist from "./pages/Todolist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<TodoLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path=":listId" element={<Todolist />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
