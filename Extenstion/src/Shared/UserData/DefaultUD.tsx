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
      { i: "clock", x: 0, y: 7, w: 5, h: 10, moved: true, static: false },
      { i: "quote", x: 5, y: 13, w: 5, h: 12, moved: true, static: false },
      { i: "stopwatch", x: 6, y: 3, w: 4, h: 5, moved: true, static: false },
    ],
    alarm: [{ name: "Wake up", time: 1735700400000, text: "Morning alarm" }],
  },
  Settings: { theme: "Sketchy" },
};
const DefaultData: UserD = {
  Widgets: {},
  SharedData: {
    layout: [],
    alarm: null,
  },
  Settings: { theme: "Default" },
};
export default testdata;
//!
