"use client";
import * as React from "react";

export function TabNavigation() {
  return (
    <nav className="flex flex-wrap items-start self-start font-bold leading-tight max-md:max-w-full">
      <div className="flex gap-2 items-center px-8 py-4 bg-white rounded-3xl max-md:px-5">
        <h2 className="self-stretch my-auto text-lg text-stone-900">ENS Names</h2>
        <div className="flex gap-3 justify-center items-center self-stretch px-3 py-1.5 my-auto text-base text-white whitespace-nowrap rounded-lg bg-stone-900 min-h-[30px]">
          <span className="self-stretch my-auto">45</span>
        </div>
      </div>
      <button className="flex gap-2 items-center px-8 py-4 whitespace-nowrap bg-white bg-opacity-50 text-stone-900 max-md:px-5">
        <span className="self-stretch my-auto text-lg">Subnames</span>
        <div className="flex gap-3 justify-center items-center self-stretch px-3 py-1.5 my-auto text-base rounded-lg bg-stone-900 bg-opacity-10 min-h-[30px]">
          <span className="self-stretch my-auto">31</span>
        </div>
      </button>
      <button className="flex gap-2 items-center self-stretch px-8 py-4 h-full text-lg whitespace-nowrap rounded-none bg-white bg-opacity-50 text-stone-900 max-md:px-5">
        <span className="self-stretch my-auto">Wizard</span>
      </button>
    </nav>
  );
}
