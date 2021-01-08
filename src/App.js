import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Albums from "./components/Albums/Albums";
import Review from "./components/PhotoReview/Review";
import Upload from "./components/Upload/UploadImages";
import NotFound from "./components/NotFound";
import Reset from "./components/Auth/ResetPassword";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App">
            <NavBar />
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/resetpassword" component={Reset} />
              <Route path="/review" component={Review} />
              <ProtectedRoute exact path="/upload" component={Upload} />
              <ProtectedRoute exact path="/albums" component={Albums} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
