import "./App.css";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./config";
import { Suspense } from "react";
import Fetch from "./components/Fetch";
import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/App.scss'

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<p>Cargando...</p>}>
        <Fetch />
      </Suspense>
    </FirebaseAppProvider>
  );
}

export default App;
