import logo from "../assets/IMG_8033.jpeg";

export default function Header() {
  return (
    <header className="flex flex-col justify-center align-baseline gap-8 mt-2 text-orange-200 animate__animated animate__bounce">
      <img
        className="md:w-1/12 md:h-1/12 w-1/6 h-1/6 rounded-full mx-auto"
        src={logo}
        alt="Cafe Logo"
      />
      <h1 className="text-center font-bold text-3xl">کافه میناز</h1>
    </header>
  );
}
