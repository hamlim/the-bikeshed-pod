import { cn } from "@local/utils/cn";
import type { ReactNode } from "react";

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
};

let headingStyles = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-medium",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
};

export function Heading({ level, className, ...rest }: Props): React.ReactNode {
  let Tag = `h${level}` as keyof typeof headingStyles;
  let headingClass = headingStyles[Tag] || headingStyles.h1;

  return <Tag {...rest} className={cn(headingClass, className)} />;
}
