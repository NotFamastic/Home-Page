import type { UD, S } from "../Types";
import type { Layout, LayoutItem } from "react-grid-layout";
import React, { useEffect, useState } from "react";
import DefaultData from "./DefaultUD";

var localdata: UD; //local user data

export function getUserData(): UD {
  let u: UD =
    localdata ??
    JSON.parse(localStorage.getItem("Data") ?? JSON.stringify(DefaultData));
  localdata = u;
  return u;
}
type typelist = {
  layout: Layout;
  Settings: S;
};

export function UpdateUD<Namelist extends keyof typelist>(
  a: Namelist,
  ND: typelist[Namelist],
): UD {
  const OD = localdata ?? getUserData();
  switch (a) {
    case "layout":
      localdata = {
        ...OD,
        SharedData: {
          ...OD.SharedData,
          layout: [...(ND as Layout)],
        },
      };
      break;
    case "Settings":
      localdata = {
        ...OD,
        Settings: {
          ...OD.Settings,
        },
      };
      break;
    default:
      throw new Error(`UserDataUpdateBug ${a}`);
  }

  localStorage.setItem("Data", JSON.stringify(localdata));
  return localdata;
}
