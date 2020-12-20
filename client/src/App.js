import './App.css';
import Splash from './pages/Splash'
import Quiz from './pages/Quiz'
import Ctrl from './components/'

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path ={"/"}>
            <Splash />
        </Route>
        <Route exact path ={"/quiz/:id"}>
            <Quiz />
        </Route>
    </Switch>
    </Router>
  );
}

export default App;