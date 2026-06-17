"use client";

import React, { useMemo, useState, type ElementType, type CSSProperties } from "react";

export interface TextRevealProps {
  text: string;
  hoverText?: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  direction?: "up" | "down";
  onClick?: (e: React.MouseEvent) => void;
}

const TextReveal = React.memo(function TextReveal({
  text,
  hoverText,
  as: Component = "a",
  href,
  target,
  className = "",
  style,
  fontSize = "3rem",
  staggerDelay = 25,
  duration = 250,
  easing = "ease-in-out",
  color = "inherit",
  hoverColor = "var(--cta, #b2c73a)",
  direction = "up",
  onClick,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);

  const segmentString = (str: string) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(str), (s) => s.segment);
    }
    return [...str];
  };

  const { chars, hoverChars } = useMemo(() => {
    const textSegments = segmentString(text);
    const hoverSegments = hoverText ? segmentString(hoverText) : textSegments;
    
    // Pad the shorter array with spaces so they match in length
    const maxLength = Math.max(textSegments.length, hoverSegments.length);
    while (textSegments.length < maxLength) textSegments.push(" ");
    while (hoverSegments.length < maxLength) hoverSegments.push(" ");

    return { chars: textSegments, hoverChars: hoverSegments };
  }, [text, hoverText]);

  const sign = direction === "up" ? 1 : -1;

  const rootProps: Record<string, unknown> = {
    className: `inline-block relative no-underline font-extrabold tracking-tight overflow-hidden cursor-pointer select-none ${className}`.trim(),
    style: {
      fontSize,
      color: hovered ? hoverColor : color,
      transition: "color 0.35s ease",
      padding: "0.15em 0",
      lineHeight: 1,
      ...style,
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
    "aria-label": text,
  };

  if (Component === "a") {
    rootProps.href = href ?? "#";
    if (target) rootProps.target = target;
    if (target === "_blank") rootProps.rel = "noopener noreferrer";
  }

  return (
    <Component {...rootProps}>
      <span
        className="inline-flex overflow-hidden relative"
        style={{ height: "1em" }}
        aria-hidden="true"
      >
        {chars.map((char, i) => {
          const hoverChar = hoverChars[i];
          return (
            <span
              key={i}
              className="inline-flex flex-col relative will-change-transform h-[1em]"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${i * staggerDelay}ms`,
                transform: hovered
                  ? `translateY(${-sign}em)`
                  : "translateY(0)",
              }}
            >
              <span className="h-[1em] leading-none">{char === " " ? "\u00A0" : char}</span>
              <span className="h-[1em] leading-none">{hoverChar === " " ? "\u00A0" : hoverChar}</span>
            </span>
          );
        })}
      </span>
    </Component>
  );
});

TextReveal.displayName = "TextReveal";
export { TextReveal };
