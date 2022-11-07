import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AuthLayout from "./layouts/AuthLayout";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoLayout from "./layouts/TodoLayout";
import Profile from "./pages/Profile";
import SingleTodolist from "./pages/SingleTodolist";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<TodoLayout />}>
          <Route path="/" index element={<Overview />} />
          <Route path="todolist/:listId" element={<SingleTodolist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
