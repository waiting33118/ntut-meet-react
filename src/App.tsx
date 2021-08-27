import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserProvider } from './store/UserContext';

const Home = lazy(() => import('./pages/Home'));
const ChatRoom = lazy(() => import('./pages/ChatRoom'));

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={''}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/room" component={ChatRoom} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
