import { useState } from 'react';
import Navbar from './components/navbar';
import Table from './components/table';
import './styles/App.css';


function App() {

  const [onMouseClick, setOnMouseClick] = useState(false);
  const [onMousePush, setOnMousePush] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isLoss, setIsLoss] = useState(false);
  const [restart, setRestart] = useState(false);

  return (
    <div className="App">
      <div className="app__conteiner">
        <div className='main__conteiner' >
          <Navbar
            onMouseClick={onMouseClick} setOnMouseClick={setOnMouseClick}
            onMousePush={onMousePush}
            isLoss={isLoss} setIsLoss={setIsLoss}
            isWin={isWin} setIsWin={setIsWin}
            restart={restart} setRestart={setRestart}
          />
          <Table
            onMouseClick={onMouseClick} setOnMouseClick={setOnMouseClick}
            onMousePush={onMousePush} setOnMousePush={setOnMousePush}
            restart={restart} setRestart={setRestart}
            isLoss={isLoss} setIsLoss={setIsLoss}
            isWin={isWin} setIsWin={setIsWin}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
