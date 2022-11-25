import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AccountLayout from "../src/components/userAccount/AccountLayout";
import Overview from "./routes/todolistApp/Overview";
import Login from "./routes/userAccount/Login";
import Signup from "./routes/userAccount/Signup";
import TodoLayout from "./components/todolistApp/shared/layout/AppLayout";
import Profile from "./routes/todolistApp/profile/Profile";
import SingleTodolist from "./routes/todolistApp/SingleTodolist"
import EditProfile from "./routes/todolistApp/profile/EditProfile";
import Friends from './routes/todolistApp/Friends'
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
