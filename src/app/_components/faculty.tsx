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
  });

  return (
    <div className="flex flex-col px-1">
      <div>
        <div className={avatarBorder}>
          <img src={imageUrl} className="object-cover rounded-full w-32" />
        </div>
      </div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground text-sm">{info}</div>
      </div>
    </div>
  );
};

export default Faculty;
