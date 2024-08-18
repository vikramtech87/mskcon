import clsx from "clsx";
import React from "react";

type FacultyProps = {
  name: string;
  imageUrl: string;
  info: string;
  isDark: boolean;
};

const Faculty = ({ name, imageUrl, info, isDark }: FacultyProps) => {
  const avatarBorder = clsx({
    "bg-white": isDark,
    "bg-slate-200": !isDark,
    "inline-block": true,
    "p-2": true,
    "rounded-full": true,
    shadow: true,
    border: true,
    "border-gray-300": isDark,
    "border-gray-400": !isDark,
  });

  const box = clsx({
    flex: true,
    "flex-col": true,
    "px-1": true,
    "bg-white": isDark,
    "rounded-sm": true,
    "mt-16": true,
    "border": true,
    "border-gray-300": true,
    "bg-slate-100": !isDark,
  });

  return (
    <div className={box}>
      <div className="-m-16">
        <div className={avatarBorder}>
          <img src={imageUrl} className="object-cover rounded-full w-32 h-32" />
        </div>
      </div>
      <div className="px-4 pb-4 pt-16">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground text-sm pt-2">{info}</div>
      </div>
    </div>
  );
};

export default Faculty;
