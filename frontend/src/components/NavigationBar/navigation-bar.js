import "./navigation-bar.css";

const NavigationBar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div>
          <button>
            BRZA PRETRAGA<i className="caret-nav"></i>
          </button>
        </div>
        <div>
          <button>
            PONUDA VOZILA<i className="caret-nav"></i>
          </button>
        </div>
        <div>
          <button>
            DELOVI I OPREMA<i className="caret-nav"></i>
          </button>
        </div>
        <div>
          <button>
            PRODAJEM<i className="caret-nav"></i>
          </button>
        </div>
        <div>
          <button>
            AUTO OSIGURANJE<i className="caret-nav"></i>
          </button>
        </div>
        <div>
          <button>SAVETI I USLUGE</button>
        </div>
        <div>
          <button>USLUGE I KREDITI</button>
        </div>
        <div>
          <button>PONUDA ZA OGLAŠAVANJE</button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
