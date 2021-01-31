import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Albums from "./components/Albums/Albums";
import Album from "./components/Albums/Album";
import Create from "./components/Albums/Create";
import EditAlbumName from "./components/Albums/EditAlbumName";
import Review from "./components/PhotoReview/Review";
import Reviewed from "./components/PhotoReview/Reviewed";
import ReviewedAlbum from "./components/Albums/ReviewedAlbum";
import NotFound from "./components/NotFound";
import Reset from "./components/Auth/ResetPassword";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ThankYou from "./components/PhotoReview/ThankYou";
import ShowReviewed from "./components/PhotoReview/ShowReviewed";

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
              <Route path="/thankyou" component={ThankYou} />
              <Route path="/review/:albumId" component={Review} />
              <Route path="/show/reviewed/:albumId" component={ShowReviewed} />
              <ProtectedRoute exact path="/albums" component={Albums} />
              <ProtectedRoute exact path="/reviewed" component={Reviewed} />
              <ProtectedRoute
                exact
                path="/reviewed/:albumId"
                component={ReviewedAlbum}
              />
              <ProtectedRoute exact path="/albums/create" component={Create} />
              <ProtectedRoute exact path="/album/:albumId" component={Album} />
              <ProtectedRoute
                exact
                path="/album/editalbum/:albumId"
                component={EditAlbumName}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
