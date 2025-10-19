import { Route, Switch } from 'wouter-preact';
import { lazy, Suspense } from 'preact/compat';
import MainLayout from './layout/main';
const About = lazy(() => import('./pages/about'));
const Search = lazy(() => import('./pages/search'));
const Homepage = lazy(() => import('./pages/home'));
const Details = lazy(() => import('./pages/details'));

export function App() {
  return (
    <>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={Homepage} />
            <Route path="/about" component={About} />
            <Route path="/search" component={Search} />
            <Route path="/details/:mediaType/:id" component={Details} />
          </Switch>
        </Suspense>
      </MainLayout>
    </>
  );
}
