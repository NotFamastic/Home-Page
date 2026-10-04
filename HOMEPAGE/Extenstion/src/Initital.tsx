import {
  Responsive,
  useContainerWidth,
  ReactGridLayout,
} from "react-grid-layout";
import type { LayoutItem } from "react-grid-layout";
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
//!
export { Userdata };
//!
import "./Style.css";
import { Clock } from "./Widget";
import { UD,WidClass,sampleUserData as Sample} from "./Types";

const DefaultData = {
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
    alarm: [{ name: "Wake up", time: 1735700400, text: "Morning alarm" }],
  },
  Settings: {},
};

let Userdata: UD = JSON.parse(localStorage.getItem("Data")?? JSON.stringify(DefaultData)); 

function Grid() {
  const { width, containerRef, mounted } = useContainerWidth();
  const [userdata, setData] = useState(Userdata);
  const layout = userdata.SharedData.layout;

  return (
    <div ref={containerRef}>
      {mounted && (
        <ReactGridLayout
          layout={layout}
          width={width}
          gridConfig={{ cols: 12, rowHeight: 150 }}
        >
          {layout.map((LayoutItem: LayoutItem) => {
            const widgdata = userdata.Widgets[LayoutItem.i]/*shared Id*/;
            const Class = WidClass[widgdata.type];/*gets class using widg type(string)*/

            if (!Class) return;

            const ThisWidg = new Class(LayoutItem.i, widgdata);
            return <div key={LayoutItem.i}>{ThisWidg.html}</div>;
          })}
        </ReactGridLayout>
      )}
    </div>
  );
}
//https://www.npmjs.com/package/react-grid-layout?activeTab=readme
function MyGrid() {
  //test grid
  const { width, containerRef, mounted } = useContainerWidth();

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <div ref={containerRef}>
      {mounted && (
        <ReactGridLayout
          layout={layout}
          width={width}
          gridConfig={{ cols: 12, rowHeight: 150 }}
        >
          <div key="a">a</div>
          <div key="b">b</div>
          <div key="c">c</div>
        </ReactGridLayout>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<Grid />);
