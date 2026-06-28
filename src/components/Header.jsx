import { APP_TITLE } from "../utils/constants";

function Header() {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__background"></div>

      <div className="dashboard-header__content">
        <h1 className="dashboard-header__title">
          {APP_TITLE}
        </h1>

        <p className="dashboard-header__subtitle">
          Simple • Fast • Professional
        </p>
      </div>
    </header>
  );
}

export default Header;