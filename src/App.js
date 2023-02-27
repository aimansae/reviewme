import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import ReviewCreateForm from "./pages/reviews/ReviewCreateForm";
import ReviewPage from "./pages/reviews/ReviewPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import { useCurrentUser } from "./context/CurrentUserContext";
import ReviewEditForm from "./pages/reviews/ReviewEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Spacing}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
            <ReviewsPage message="Oops..No results found.." />)}
          />
          <Route
            exact
            path="/saved"
            render={() => (
            <ReviewsPage/>)}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <ReviewsPage
                message="No results found. Try again or like a post"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/contact" render={() => <h1>Contact</h1>} />
          <Route
            exact
            path="/reviews/write"
            render={() => <ReviewCreateForm />}
          />
          <Route
            exact
            path="/reviews/:id/edit"
            render={() => <ReviewEditForm />}
          />
          <Route exact path="/reviews/:id" render={() => <ReviewPage />} />
          <Route render={() => <p>Page Not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
