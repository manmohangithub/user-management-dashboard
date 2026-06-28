import { SEARCH_PLACEHOLDER } from "../utils/constants";

function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="search">
      <div className="search__wrapper">

        <span className="search__icon">
          🔍
        </span>

        <input
          id="user-search"
          type="search"
          className="search__input"
          placeholder={SEARCH_PLACEHOLDER}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          autoComplete="off"
        />

      </div>
    </div>
  );
}

export default SearchBar;