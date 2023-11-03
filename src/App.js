import { initializeApp } from "firebase/app";
import './App.css';
import Router from './_common/Router';
import Spinner from './_common/Spinner';
import firebaseConfig from './firebase/firebaseConfig';

const app = initializeApp(firebaseConfig);
function App() {
  if (!(app)) { return <Spinner /> }
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
