import {Fragment} from 'react';
import Search from './components/search/search';
import './App.scss';

function App() {
  return (
    <Fragment>
      <h1 className="app__title">Weather App</h1>
      <Search/>
    </Fragment>
  );
}


export default App;
