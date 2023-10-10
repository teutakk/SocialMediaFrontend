import "./App.css";
import Posts from "./pages/Posts";

function App() {
  return (
    <div
      style={{
        maxWidth: "620px",
        backgroundColor: "#eee",
        padding: "10px",
        margin: "0 auto",
      }}
      className="App"
    >
      <Posts />
    </div>
  );
}

export default App;
