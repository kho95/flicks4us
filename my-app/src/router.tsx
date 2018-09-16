import * as React from 'react';
import { BrowserRouter, Redirect, Route , Switch} from 'react-router-dom';
import App from './App'
import { Header } from './components/Header';
import Latest from './components/Latest';
import Search from './components/Search';
import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact={true} path="/" component={App} />
            <Route path="/Search" component={Search} />
            <Route path="/Latest" component={Latest} />
            <Redirect from='*' to='/' />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}