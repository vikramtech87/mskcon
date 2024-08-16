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
    "border-gray-300": true,
  });

  return (
    <div className="flex flex-col px-1 bg-white rounded-md mt-16 border border-gray-300">
      <div className="-m-16">
        <div className={avatarBorder}>
          <img src={imageUrl} className="object-cover rounded-full w-32" />
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
