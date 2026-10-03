export { CD, AD, UD };
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
    enabled: "hidden" | "visible";
    hour?: "numeric";
    minute?: "2-digit";
    second?: "2-digit";
    hour12?: boolean;
  };
  Date: {
    enabled: "hidden" | "visible";
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
    layout: { i: string; x: number; y: number; w: number; h: number }[];
    alarm: AD[];
  };
  Settings: {};
};
