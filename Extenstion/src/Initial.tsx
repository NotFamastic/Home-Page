import {
  Responsive,
  useGridLayout,
  horizontalCompactor,
  useContainerWidth,
  ReactGridLayout,
} from "react-grid-layout";
import type { LayoutItem, Layout } from "react-grid-layout";
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
//!
export { Userdata };
//!
import "./Style.css";
import { Clock } from "./Widget";
import { UD, WidClass, sampleUserData as Sample } from "./Types";

const root = createRoot(document.getElementById("root")!);
const DefaultData: UD = {
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
    layout: [{ i: "clock-1", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 }],
    alarm: [
      { name: "Wake up", time: 1735700400 * 1000, text: "Morning alarm" },
    ],
  },
  Settings: {},
};

let Userdata: UD = JSON.parse(
  localStorage.getItem("Data") ?? JSON.stringify(DefaultData),
);
function SettingsUi(): React.ReactElement {
  return (
    <>
      <button type="button" className="btn btn-light">
        Light
      </button>
    </>
  );
}
function GridUi(): React.ReactElement {
  //https://www.npmjs.com/package/react-grid-layout?activeTab=readme

  const { width, containerRef, mounted } = useContainerWidth();
  const [userdata, setUserdata] = useState(Userdata);
  const layout = userdata.SharedData.layout;
  function onLayoutChange(newLayout: Layout) {
    const updated = {
      Widgets: userdata.Widgets,
      Settings: userdata.Settings,
      SharedData: {
        layout: [...newLayout],
        alarm: userdata.SharedData.alarm,
      },
    };
    setUserdata(updated);
    localStorage.setItem("Data", JSON.stringify(updated));
  }
  return (
    <>
      <div ref={containerRef}>
        {mounted && (
          <ReactGridLayout
            layout={layout}
            onLayoutChange={(Layout) => {
              onLayoutChange(Layout);
            }}
            onDragStart={(layout, oldItem, newItem, placeholder, e, element) =>
              console.log("drag start", newItem)
            }
            onDragStop={(layout, oldItem, newItem) =>
              console.log("drag stop", newItem)
            }
            onResizeStart={(layout, oldItem, newItem) =>
              console.log("resize start", newItem)
            }
            width={width}
            gridConfig={{ cols: 12, rowHeight: 150 }}
          >
            {layout.map((obj: LayoutItem) => {
              const widgdata = userdata.Widgets[obj.i]; /*shared Id*/
              const Class =
                WidClass[widgdata.type]; /*gets class using widg type(string)*/

              if (!Class) return;

              const ThisWidg = new Class(obj.i, widgdata);
              return <div key={obj.i}>{ThisWidg.html}</div>;
            })}
          </ReactGridLayout>
        )}
      </div>
    </>
  );
}
function Ui() {
  return (
    <>
      <SettingsUi />
      <GridUi />
    </>
  );
}

root.render(<Ui />);
