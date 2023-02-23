import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import ReviewCreateForm from './pages/reviews/ReviewCreateForm';




function App() {
 

  return (
   
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Spacing}>

            <Switch>
              <Route exact path='/' render={() => <h1>Home Page</h1>} />
              <Route exact path='/login' render={() => <LoginForm />} />
              <Route exact path='/signup' render={() => <SignUpForm />} />
              <Route exact path='/contact' render={() => <h1>Contact</h1>} />
              <Route exact path='/reviews/write' render={() => <ReviewCreateForm/>} />
              <Route render = {() => <p>Page Not found</p>} />
            </Switch>

          </Container>
        </div>
      
  );
}

export default App;