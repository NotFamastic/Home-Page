import React, { useEffect, useState } from "react";
import type { LayoutItem } from "react-grid-layout";
//!
//!
import { Clock } from "./Widget";

export type CD /*clock Data*/ = {
  type: "clock";
  Time: {
    enabled: boolean;
    hour?: "numeric";
    minute?: "2-digit";
    second?: "2-digit";
    hour12?: boolean;
  };
  Date: {
    enabled: boolean;
    weekday?: "long";
    day?: "numeric";
    month?: "long" | "short" | "numeric";
    year?: "numeric";
  };
};
export type AD /*Alarm Data*/ = {
  name: string;
  time: number;
  text?: string;
};
export type UD /*User Data*/ = {
  Widgets: {
    [Id: string]: CD;
  };
  SharedData: {
    layout: LayoutItem[];
    alarm?: AD[];
    stopwatch?: number;
  };
  Settings: {};
};
export type W /*widget types*/ = "clock";
//!Json to access widg class using widg type string
//!bc I couldnt directly create widg obj using class
export const WidClass: Record<
  W,
  new (id: string, data: any) => { html: React.ReactElement /*html*/ }
> = {
  clock: Clock,
  //"Stocks":Stocks
  //"Alarm":Alarm
  //"News":News
  //searchbar
};
//!
//
export const sampleUserData: UD = {
  Widgets: {
    "clock-1": {
      type: "clock",
      Time: {
        enabled: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      },
      Date: {
        enabled: true,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    },
  },
  SharedData: {
    layout: [{ i: "clock-1", x: 0, y: 0, w: 2, h: 2 }],
    alarm: [{ name: "Wake up", time: 1735700400 * 1000, text: "Morning alarm" }],
  },
  Settings: {
    colorscheme:{

    }
  },
};
