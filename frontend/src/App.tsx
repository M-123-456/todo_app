import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AccountLayout from "./layouts/AccountLayout";
import Overview from "./routes/todolist/Overview";
import Login from "./routes/account/Login";
import Signup from "./routes/account/Signup";
import TodoLayout from "./layouts/TodoLayout";
import Profile from "./routes/profile/Profile";
import SingleTodolist from "./routes/todolist/SingleTodolist";
import EditProfile from "./routes/profile/EditProfile";
import Friends from './routes/Friends'
import { UserCheckIn } from './store'
import NotFound from "./routes/NotFound";

function App() {

  return (
    <>
      <BrowserRouter>
        <UserCheckIn />
          <Routes>
            <Route path="/" element={<AccountLayout />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<TodoLayout />}>
              <Route path="/" index element={<Overview />} />
              <Route path="todolist/:listId" element={<SingleTodolist />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="friends" element={<Friends />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
