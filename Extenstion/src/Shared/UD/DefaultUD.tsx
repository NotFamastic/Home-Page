import { UD } from "../Types";
//!
const testdata: UD = {
  Widgets: {
    "clock-1": {
      type: "clock",
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
    "quote-001": {
    type: "quote",
    data: null,
  },
  },
  SharedData: {
    layout: [{ i: "clock-1", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 },{ i: "quote-001", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 }],
    alarm: [
      { name: "Wake up", time: 1735700400 * 1000, text: "Morning alarm" },
    ],
  },
  Settings: {},
};
const DefaultData: UD = {
  Widgets: {},
  SharedData: {
    layout: [],
    alarm: null,
  },
  Settings: {},
};
export default testdata;
//!
