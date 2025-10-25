import ins from "../assets/instagram-1-svgrepo-com.svg";
export default function Footer() {
  return (
    <h6 className="text-white mt-10 text-center">
      <a
        href="https://www.instagram.com/cafe.minaz?igsh=MXg5NXA2MTd1NDF0bw=="
        target="_blank"
        rel="Cafe Minaz"
        className="hover:shadow-2xl hover:shadow-black hover:cursor-grabbing">
        <img
          src={ins}
          alt="instagram"
          className="w-[3rem] h-[3rem] text-center mx-auto my-3"
        />
      </a>
      Powered by <em className="italic font-bold bg-black">Mosri</em>
    </h6>
  );
}
