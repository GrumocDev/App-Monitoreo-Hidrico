"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { IoMdArrowDropdown } from "react-icons/io";

export default function FilterCard({
  title,
  children,
  collapsible,
}: { title: string; children: React.ReactNode; collapsible: boolean }) {
  const [open, setOpen] = useState(!collapsible);

  const toggle = () => {
    if (!collapsible) return;

    setOpen(!open);
  };

  return (
    <div className="bg-white">
      <div
        className={classNames(["font-bold text-sm py-3 md:px-3 ", collapsible && "cursor-pointer"])}
        onClick={toggle}
      >
        <div className={classNames(["flex justify-between items-center", {"border-b border-gray-light":!open}])}>
          <h4>{title}</h4>
          {collapsible && (
            <div>
              <span className={classNames(["block text-blue text-3xl", { "md:rotate-180": open }])} ><IoMdArrowDropdown/></span>
            </div>
          )}
        </div>
      </div>
      {(!collapsible || open) ? (
        <div className={"pb-3 md:px-3 border-b border-gray-light"}>{children}</div>
      ) : null}
    </div>
  );
}
