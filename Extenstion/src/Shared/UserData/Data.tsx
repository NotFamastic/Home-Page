import { UserD } from "./Functions";
//!
const testdata: UserD = {
  Widgets: {
    clock: {
      type: "Clock",
      data: {
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
    searchbar: { type: "searchbar", data: null },
  },
  SharedData: {
    layout: [
      { i: "clock", x: 6, y: 1, w: 2, h: 2, moved: true, static: false },
      { i: "quote", x: 1, y: 2, w: 5, h: 3, moved: true, static: false },
      { i: "stopwatch", x: 9, y: 2, w: 2, h: 2, moved: true, static: false },
      { i: "searchbar", x: 12, y: 5, w: 7, h: 1, moved: true, static: false },
    ],
    alarm: [{ name: "Wake up", time: 1735700400000, text: "Morning alarm" }],
  },
  Settings: { theme: "cyberpunk", dark: true, search: "b" },
};
const DefaultData = {};
export default testdata;
//!
