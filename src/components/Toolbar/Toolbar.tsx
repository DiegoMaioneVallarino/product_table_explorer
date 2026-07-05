import './Toolbar.css';

function Toolbar() {
  return (
    <header className="toolbar">
      <button>Primos</button>
      <button>Pares</button>
      <button>Fibonacci</button>

      <div className="spacer" />

      <button>−</button>
      <button>+</button>
    </header>
  );
}

export default Toolbar;