import './ExplorerPanel.css';

function ExplorerPanel() {
  return (
    <aside className="explorer-panel">
      <div className="explorer-panel-option-bar">
        <div className="option-bar-bt">
          </div>
          <div className="option-bar-bt"></div>
          <div className="option-bar-bt"></div>
          <div className="option-bar-bt"></div>
          <div id="add-panel-alert" className="option-bar-bt">
            <div className="option-bar-bt-ico">+</div>
            <div className="option-inner-btadd"><div className="option-inner-btadd-tittle">Add new</div><div className="option-inner-btadd-addBtArea"><div className="option-inner-btadd-addBtAreaBt"><div className="add-new-bloc-bt color-apply">
              <b style={{
                color: '#ffffff',
              }}>Add</b> color</div></div><div className="option-inner-btadd-addBtAreaBt add-function"><div className="add-new-bloc-bt  add-function">
  <b style={{
                color: '#ffffff',
              }}>Add</b> function</div></div><div className="option-inner-btadd-addBtAreaBt"><div className="add-new-bloc-bt search-prod">
                <b style={{
                color: '#ffffff',
              }}>Add</b> product</div></div><div className="option-inner-btadd-addBtAreaBt"><div className="add-new-bloc-bt note-add">
  <b style={{
                color: '#ffffff',
              }}>Add</b> note</div></div></div></div>
            </div></div>
      <div className="explorer-panel-alert color">
        <div className="type-of-explorer-panel-alert">
          <div className="text-explorer-panel-alert">
            <b
              style={{
                background: 'linear-gradient(90deg, #ff3100, #feb47b)',
                backgroundClip: 'text',
                color: '#ffffff',
              }}
            >
              Apply{' '}
            </b>
            <b>color</b>
          </div>
          <div className="function-formula"></div>
        </div>
      </div>

      <div className="explorer-panel-alert fx">
        <div className="type-of-explorer-panel-alert">
          <div className="text-explorer-panel-alert">
            <b
              style={{
                background: 'linear-gradient(90deg, #ff3100, #feb47b)',
                backgroundClip: 'text',
                color: '#ffffff',
              }}
            >
              Apply{' '}
            </b>

            <b
              style={{
                color: '#eada90',
              }}
            >
              function
            </b>
          </div>

          <div className="function-formula">
            <b
              style={{
                backgroundClip: 'text',
                color: '#ffffff',
              }}
            >
              x*h(x)
            </b>
          </div>
        </div>
      </div>

      <div className="explorer-panel-alert search">
        <div className="type-of-explorer-panel-alert">
          <div className="text-explorer-panel-alert search">
            <b
              style={{
                background: 'linear-gradient(90deg, #4d00ff, #feb47b)',
                backgroundClip: 'text',
                color: '#ffffff',
              }}
            >
              Search
            </b>{' '}
            <b>product</b>
          </div>

          <div className="function-formula"></div>
        </div>
      </div>

      <div className="explorer-panel-alert note">
        <div className="type-of-explorer-panel-alert">
          <div className="text-explorer-panel-alert note">
            <div className="title-note-alert">
              <b
                style={{
                  background: 'linear-gradient(90deg, #4d00ff, #feb47b)',
                  WebkitBackgroundClip: 'text',
                  color: '#ffffff',
                  width: '196px',
                  height: '45px',
                  display: 'flow',
                  margin: 'auto',
                  fontSize: '21px',
                  lineHeight: '19px',
                  marginTop: '2px',
                }}
              >
                Revisar geometría de factores repetidos.
              </b>
            </div>

            <div className="description-note-alert">
              <b
                style={{
                  WebkitBackgroundClip: 'text',
                  color: '#828282',
                  width: '212px',
                  height: '53px',
                  display: 'flow',
                  margin: 'auto',
                  fontSize: '17px',
                  lineHeight: '14px',
                }}
              >
                Los productos que se repiten caen en una misma curva.
              </b>
            </div>
          </div>

          <div className="function-formula"></div>
        </div>
      </div>
    </aside>
  );
}

export default ExplorerPanel;