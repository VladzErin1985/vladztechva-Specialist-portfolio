import { useCursor } from "@/hooks/useCursor";

const CustomCursor = () => {
  const { dotX, dotY, ringX, ringY, isHovering } = useCursor();
  const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  if (isCoarse) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground pointer-events-none z-[9999]"
        style={{
          transform: `translate(${dotX - 4}px, ${dotY - 4}px) scale(${isHovering ? 0.5 : 1})`,
          mixBlendMode: "difference",
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-foreground pointer-events-none z-[9999]"
        style={{
          transform: `translate(${ringX - 16}px, ${ringY - 16}px) scale(${isHovering ? 2 : 1})`,
          mixBlendMode: "difference",
          transition: "transform 0.15s ease-out",
        }}
      />
    </>
  );
};

export default CustomCursor;
