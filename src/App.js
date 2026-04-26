import { AllRoutes } from './routes/AllRoutes';
import './App.css';
import { Header, Footer } from './components';

function App() {
  return (
    <div className="App bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;