import { useState, useEffect } from "react";
import { espresson, hotBar, iceCoffee, shakes } from "./data/data.js";
import Container from "./components/Container.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const slogan = "کار زیاده ولی قهوه واجب تره!";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < slogan.length) {
      // type letters one by one
      const timeout = setTimeout(() => {
        setText((prev) => prev + slogan[index]);
        setIndex(index + 1);
      }, 51);
      return () => clearTimeout(timeout);
    } else {
      // when done, wait then reset
      const resetTimeout = setTimeout(() => {
        setText("");
        setIndex(0);
      }, 1000); // pause 1s before restarting
      return () => clearTimeout(resetTimeout);
    }
  }, [index, slogan]);

  return (
    <div>
      <Header />

      <main style={{ textAlign: "center", padding: "20px" }}>
        <p className="text-orange-200" style={{ fontSize: "20px", minHeight: "30px" }}>{text}</p>
      </main>

      <section>
        <Container data={espresson} title={"اسپرسو بار"} />
        <Container data={hotBar} title={"بار گرم"} />
        <Container data={iceCoffee} title={"سرد بار"} />
        <Container data={shakes} title={"شیک ها"} />
      </section>

      <Footer />
    </div>
  );
}

export default App;
