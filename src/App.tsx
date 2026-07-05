import './App.css';

import Toolbar from './components/Toolbar/Toolbar';
import ExplorerPanel from './components/ExplorerPanel/ExplorerPanel';
import Workspace from './components/Workspace/Workspace';

function App() {
  return (
    <div className="app">

      <Toolbar />

      <div className="main">

        <ExplorerPanel />

        <Workspace />

      </div>

    </div>
  );
}

export default App;