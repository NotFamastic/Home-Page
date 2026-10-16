import { UserD } from "../Types";
//!
const testdata: UserD = {
  Widgets: {
    clock: {
      type: "Clock",
      data: {
        override: true,
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
    quote: { type: "Quote", data: null },
    stopwatch: { type: "StopWatch", data: null },
  },
  SharedData: {
    layout: [
      { i: "clock", x: 1, y: 4, w: 5, h: 3, moved: false, static: false },
      { i: "quote", x: 2, y: 0, w: 5, h: 4, moved: true, static: false },
      { i: "stopwatch", x: 7, y: 4, w: 2, h: 2, moved: true, static: false },
    ],
    alarm: [{ name: "Wake up", time: 1735700400000, text: "Morning alarm" }],
  },
  Settings: { theme: "default", dark: true },
};
const DefaultData: UserD = {
  Widgets: {},
  SharedData: {
    layout: [],
    alarm: null,
  },
  Settings: { theme: "default", dark: false },
};
export default testdata;
//!
