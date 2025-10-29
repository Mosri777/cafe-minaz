import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - items: [{ id: "espresso", label: "اسپرسو بار" }, ...]
 * - onClick?: (id, e) => void
 * - headerHeight?: number  // اگر هدر fixed داری، ارتفاعش را بده (px)
 * - updateHash?: boolean   // آیا بعد از اسکرول URL#id را آپدیت کنیم (default: false)
 * - align?: "center" | "start" // اگر headerHeight ندادید، تایتل center یا start قرار بگیرد (default: "center")
 */
export default function Navbar({
  items = [],
  onClick,
  headerHeight,
  updateHash = false,
  align = "center",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // بستن منو با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // بستن با Esc و ریست وقتی پنجره بزرگ می‌شود
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false); // md breakpoint
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;

    // اگر headerHeight مشخص شده از offset استفاده کن
    if (typeof headerHeight === "number" && !Number.isNaN(headerHeight)) {
      const top =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        30 +
        "px";
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      // در غیر اینصورت از scrollIntoView با center یا start استفاده کن
      const block = align === "start" ? "start" : "center";
      el.scrollIntoView({ behavior: "smooth", block });
    }

    // دسترسی: فوکوس بدون اسکرول مضاعف
    try {
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    } catch (e) {
      console.warn("Unable to focus element:", e);
    }

    // اگر خواستی hash آپدیت شود
    if (updateHash) {
      try {
        // replaceState برای جلوگیری از push اضافی در history
        history.replaceState(null, "", `#${id}`);
      } catch (e) {
        console.warn("Unable to update URL hash:", e);
      }
    }
  }

  return (
    <nav ref={containerRef} dir="rtl" className="relative z-50">
      <div className="flex items-center justify-start gap-3 px-4 py-3 md:py-4 mt-3">
        <div className="text-orange-200 font-semibold text-lg md:text-xl mt-2 md:hidden">
          منوی کافه
        </div>

        {/* دکمه همبرگر (موبایل) */}
        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          className="hover:cursor-pointer hover:bg-black/80 md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {/* آیکون همبرگر که به X تبدیل می‌شود */}
          <span className="relative w-6 h-6 inline-block">
            <span
              className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-orange-200 transform transition duration-300 ease-in-out ${
                open ? "rotate-45 -translate-y-1.5" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-orange-200 transform transition duration-300 ease-in-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-orange-200 transform transition duration-300 ease-in-out ${
                open ? "-rotate-45 translate-y-1.5" : "translate-y-2"
              }`}
            />
          </span>
        </button>
      </div>

      {/* منو: موبایل - اسلاید/فید با max-height; دسکتاپ - افقی */}
      <div
        className={`mx-4 md:mx-auto md:w-1/2 transition-all duration-300 ease-in-out ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } md:max-h-none md:opacity-100 overflow-hidden md:overflow-visible`}
      >
        <ul className="flex flex-col md:flex-row md:justify-around gap-2 text-orange-200 rounded-2xl backdrop-blur-2xl bg-black/60 px-3 py-4 md:py-3">
          {items.map(({ id, label }, index) => (
            <li key={id} className="w-full md:w-auto">
              <button
                onClick={(e) => {
                  setOpen(false); // بستن منوی موبایل بعد از کلیک
                  scrollToId(id);
                  if (onClick) onClick(id, e);
                }}
                className="hover:cursor-pointer w-full text-right md:text-center block py-2 px-3 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                style={
                  // جزیی stagger animation برای آیتم‌ها در موبایل
                  open
                    ? {
                        transitionDelay: `${index * 40}ms`,
                        transformOrigin: "top",
                      }
                    : {}
                }
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
