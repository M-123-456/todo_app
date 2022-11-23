import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AuthLayout from "./layouts/AuthLayout";
import Overview from "./pages/todolist/Overview";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TodoLayout from "./layouts/TodoLayout";
import Profile from "./pages/profile/Profile";
import SingleTodolist from "./pages/todolist/SingleTodolist";
import EditProfile from "./pages/profile/EditProfile";
import Friends from './pages/Friends'

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
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
