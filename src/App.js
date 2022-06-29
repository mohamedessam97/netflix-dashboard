import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { useContext , useEffect } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
// import { Movie } from "@material-ui/icons";
import NewMovie from "./pages/newMovie/NewMovie";
import Movie from "./pages/movie/Movie";
import { useHistory } from "react-router-dom";

function App() {
  const history =useHistory()

  const user = localStorage.getItem('user')
  console.log(user);
  // useEffect(() => {
  //   if(!user){
  //     history.push('/login')
  //     console.log("here");
  //   }
    
  // }, []);
  return (
    <Router>
      <Switch>
        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}
        {/* {user && ( */}
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              {/* <Route exact path="/">  
                <Home />
              </Route> */}
              <Route exact path="/">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <MovieList />
              </Route>
              <Route path="/movie/:movieId">
                {/* <Movie /> */}
                <Movie />
              </Route>
              <Route path="/newMovie">
                <NewMovie />
              </Route>
              <Route path="/lists">
                <ListList />
              </Route>
              <Route path="/list/:listId">
                <List />
              </Route>
              <Route path="/newlist">
                <NewList />
              </Route>
            </div>
          </>
        {/* )} */}
        {/* {!user && <button onClick={()=> history.push('/login')}>Go to Login</button>} */}
      </Switch>
    </Router>
  );
}

export default App;
