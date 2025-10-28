import { useEffect, useRef, useState } from "react";
import "animate.css";

function AnimatedCard({ children, animation = "animate__fadeInUp" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target); // only once
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`animate__animated ${visible ? animation : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Container({ data, title }) {
  return (
    <div className="flex flex-col justify-center align-baseline gap-5 my-7 ">
      {/* Title animation (always runs on mount) */}
      <h1 className="animate__animated animate__backInDown bg-orange-200  text-center font-bold text-3xl border-b-2 text-amber-800 border-gray-900 w-full md:w-1/4 mx-auto py-5 rounded-b-2xl shadow-2xl shadow-gray-900">
        {title}
      </h1>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 text-center">
        {data.map((item, index) => (
          <AnimatedCard key={index} animation="animate__zoomIn">
            <div className="drop-shadow-2xl shadow-2xl shadow-black rounded-2xl">
              <img
                className="w-md-[22rem] h-md-[22rem] w-[22rem] h-[12rem] rounded-3xl mx-auto"
                src={item.img}
                alt={item.name}
              />
              <div className="my-2 text-xl font-bold bg-black/60 w-full rounded-3xl text-orange-200 backdrop-blur-2xl">
                <h2 className="my-2">{item.name}</h2>
                <p>{item.price}</p>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
