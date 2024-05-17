import "./Header.css";

function Header({ radius, setRadius }) {
  return (
    <header>
      <label htmlFor="radius">Enter the desired radius in Km</label>
      <input
        id="radius"
        type="number"
        value={radius}
        min={0}
        onChange={(e) => setRadius(e.target.value)}
      />
    </header>
  );
}

export default Header;
