import Auth from './components/Auth';
import './App.css';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './config';
import { Suspense } from 'react';
import Fetch from './components/Fetch';

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<p>Cargando...</p>}>
      <Auth/>
      <Fetch/>
      </Suspense>
    </FirebaseAppProvider>
  );
}

export default App;
