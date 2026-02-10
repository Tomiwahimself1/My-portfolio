function App() {
  return (
    <div style={styles.container}>
      <h1>This site is under maintenance</h1>
      <p>I’ll be back soon 🚧</p>
    </div>
  );
}


const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "#e5e7eb",
    fontFamily: "system-ui, sans-serif",
    textAlign: "center",
  },
};

export default App;