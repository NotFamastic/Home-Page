//!
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useStore } from "zustand";
//!
import { useContainerWidth, ReactGridLayout } from "react-grid-layout";
import type { LayoutItem, Layout } from "react-grid-layout";
import { noCompactor } from "react-grid-layout/core";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { calcGridItemWHPx } from "react-grid-layout/core";
//!
import { UserD, WidgCI, type WidgT } from "./shared/Types";
import SettingsUi from "./components/settings";
import { UserData } from "./shared/userdata/Functions";
//!
import "./Style.css";
//*
function GridUi(/*{}: {}*/): React.ReactElement {
  const { width, containerRef, mounted } = useContainerWidth();
  const layout = useStore(UserData, (UD) => UD.SharedData.layout);
  const widgets: UserD["Widgets"] = useStore(UserData, (UD) => UD.Widgets);
  return (
    <>
      <div ref={containerRef} className="overflow-auto">
        {mounted && (
          <ReactGridLayout
            layout={layout}
            onLayoutChange={(l) =>
              UserData.setState((UD) => ({
                SharedData: { ...UD.SharedData, layout: [...l] },
              }))
            }
            compactor={{
              ...noCompactor,
              allowOverlap: false,
              preventCollision: true,
            }}
            autoSize
            width={width}
            gridConfig={{ cols: 10, rowHeight: 50 }}
          >
            {layout.map((This: LayoutItem) => {
              //LayoutItem: [{ i: "clock-1", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 }]

              const widget = widgets[This.i];
              const Class = WidgCI[widget.type];
              const ThisWidg = new Class(This.i);

              return (
                <div className="overflow-hidden" key={This.i}>
                  {ThisWidg.Render(widget.data)}
                </div>
              );
            })}
          </ReactGridLayout>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <SettingsUi />
      <GridUi />
    </>
  );
}
const root = createRoot(document.getElementById("root")!);

function apply(s: UserD) {
  const root = document.documentElement;
  root.dataset.theme = s.Settings.theme ?? "default";
  root.classList.toggle("dark", s.Settings.dark ?? false);
}

apply(UserData.getState());
UserData.subscribe(apply); //?
root.render(<App />);
