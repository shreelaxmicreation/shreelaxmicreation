"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  image?: string;
  href?: string;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-[var(--cta)]",
  titleClassName = "text-[var(--cta)]",
  image,
  href,
}: DisplayCardProps) {
  const Component = (href ? Link : "div") as any;
  const linkProps = href ? { href } : {};

  return (
    <Component
      {...linkProps}
      tabIndex={0}
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-[rgba(28,49,94,0.1)] bg-[var(--surface)]/90 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[var(--canvas)] after:to-transparent after:content-[''] hover:border-[var(--cta)]/30 focus:border-[var(--cta)]/30 hover:bg-[var(--surface)] focus:bg-[var(--surface)] focus:outline-none [&>*]:flex [&>*]:items-center [&>*]:gap-2 overflow-hidden",
        className
      )}
    >
      {/* Background fabric image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
        </div>
      )}
      <div className="relative z-10">
        {icon && (
          <span className={cn("relative inline-block rounded-full bg-[var(--navy)]/10 p-1", iconClassName)}>
            {icon}
          </span>
        )}
        <p className={cn("text-lg font-display font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm text-[var(--ink)] relative z-10">{description}</p>
      <p className="text-[var(--muted)] text-xs relative z-10">{date}</p>
    </Component>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(28,49,94,0.08)] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[var(--canvas)]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(28,49,94,0.08)] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[var(--canvas)]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

export { DisplayCard };
export type { DisplayCardProps, DisplayCardsProps };
