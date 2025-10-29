import { useState, useEffect } from "react";
import {
  espresson,
  hotBar,
  iceCoffee,
  shakes,
  teas,
  moctails,
  breakfast,
  food,
  cake,
} from "./data/data.js";
import Container from "./components/Container.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const slogan = "کار زیاده ولی قهوه واجب تره!";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  const items = [
    { id: "espresso", label: "اسپرسو بار" },
    { id: "hot", label: "گرم بار" },
    { id: "cold", label: "سرد بار" },
    { id: "shakes", label: "شیک ها" },
    { id: "hot-drinks", label: "گرم نوش" },
    { id: "cold-drinks", label: "سرد نوش" },
    { id: "cakes", label: "کیک و دسر" },
    { id: "breakfast", label: "صبحانه" },
    { id: "snacks", label: "عصرانه" },
  ];

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
        <p
          className="text-orange-200"
          style={{ fontSize: "20px", minHeight: "30px" }}
        >
          {text}
        </p>
      </main>

      <section>
        <Navbar items={items} />
        <Container id={items[0].id} data={espresson} title={"اسپرسو بار"} />
        <Container id={items[1].id} data={hotBar} title={"بار گرم"} />
        <Container id={items[2].id} data={iceCoffee} title={"سرد بار"} />
        <Container id={items[3].id} data={shakes} title={"شیک ها"} />
        <Container id={items[4].id} data={teas} title={"گرم نوش"} />
        <Container id={items[5].id} data={moctails} title={"سرد نوش "} />
        <Container id={items[6].id} data={cake} title={"کیک و دسر"} />
        <Container id={items[7].id} data={breakfast} title={"صبحانه"} />
        <Container id={items[8].id} data={food} title={"عصرانه"} />
      </section>

      <Footer />
    </div>
  );
}

export default App;
