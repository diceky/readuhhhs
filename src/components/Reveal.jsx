import { useEffect, useRef, useState } from "react";

/**
 * Minimal scroll-triggered reveal wrapper.
 * Slides content in once when it enters the viewport; honors reduced-motion.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  immediate = false,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
