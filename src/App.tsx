import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
