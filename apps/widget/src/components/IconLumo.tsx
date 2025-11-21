import React from "react";
import logoLumo from "../assets/logo-lumo.png";

type Props = { size?: number; title?: string };

export default function IconLumo({ size = 20, title = "Lumo" }: Props) {
  return (
    <img
      src={logoLumo}
      alt={title}
      width={size}
      height={size}
      style={{
        borderRadius: "999px",
        display: "block",
        filter: "brightness(1.15) contrast(1.05)", // <— la magia
      }}
    />
  );
}


