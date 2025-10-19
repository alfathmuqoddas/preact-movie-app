import { Route, Switch } from "wouter-preact";
import { lazy, Suspense } from "preact/compat";
import MainLayout from "./layout/main";
const About = lazy(() => import("./pages/about"));
const Search = lazy(() => import("./pages/search"));
const Homepage = lazy(() => import("./pages/home"));
const Details = lazy(() => import("./pages/details"));

export function App() {
  return (
    <>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/preact-movie-app/" component={Homepage} />
            <Route path="/preact-movie-app/about" component={About} />
            <Route path="/preact-movie-app/search" component={Search} />
            <Route
              path="/preact-movie-app/details/:mediaType/:id"
              component={Details}
            />
          </Switch>
        </Suspense>
      </MainLayout>
    </>
  );
}
