import Landing from "./pages/Landing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import "./App.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Edit from "./componets/Edit";
import Tweet from "./pages/Tweet";
import Post from "./pages/Post";
function App() {
  const stringUser = localStorage.getItem("user");

  let user = "";
  if (stringUser !== undefined) {
    user = JSON.parse(stringUser);
  }
  const success = useSelector((state) => state.register.success);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/welcome" element={<Landing />}></Route>
          <Route
            path="/register"
            element={success ? <Navigate to="/login" /> : <Register />}
          ></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route exact path="/" element={user ? <Home /> : <Login />}></Route>

          <Route path="/profile/:username" element={<Profile />}></Route>
          <Route path="/profile/:username/edit" element={<Edit />}></Route>
          <Route path="/tweet" element={<Tweet />}></Route>
          <Route path="/tweets/:id" element={<Tweet />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
