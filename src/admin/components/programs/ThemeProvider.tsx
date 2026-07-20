import type { PropsWithChildren } from "react";

export default function ThemeProvider(
  props: PropsWithChildren<{ className?: string }>,
) {
  return (
    <div
      className={`flex-1  bg-none ${props.className || ""} `}
      data-theme="guard"
      id="gm"
    >
      {props.children}
    </div>
  );
}
