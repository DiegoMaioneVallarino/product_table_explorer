import './Toolbar.css';

function Toolbar() {
  return (    <header className="toolbar"><div className="tittleArea"><div className="logo"></div></div><div className="modEditArea"><div className="modEdit"><div className="modIco">mod</div><div className="modNumber">10</div></div>  <button>Primos</button>
      <button>Pares</button>
      <button>Fibonacci</button>

      <div className="spacer" />

      <button>−</button>
      <button>+</button></div></header>

    
  );
}

export default Toolbar;