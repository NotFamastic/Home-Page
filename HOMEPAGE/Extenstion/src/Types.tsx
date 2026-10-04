export { CD, AD, UD };
import type { LayoutItem } from "react-grid-layout";

const SampleUserData: UD = {
  Widgets: {},
  SharedData: {
    layout: [{ i: "id", x: 0, y: 0, w: 2, h: 2 }],
    alarm: [],
  },
  Settings: {},
};

type CD /*clock Data*/ = {
  type: "Clock";
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

type AD /*Alarm Data*/ = {
  name: string;
  time: number;
  text?: string;
};
type A = {};
type UD /*User Data*/ = {
  Widgets: {
    [Id: string]: CD;
  };
  SharedData: {
    layout: LayoutItem[];
    alarm: AD[];
  };
  Settings: {};
};
