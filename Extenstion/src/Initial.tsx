import type { LayoutItem } from "react-grid-layout";

//!
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//!
import { useContainerWidth, ReactGridLayout } from "react-grid-layout";
import { noCompactor } from "react-grid-layout/core";
import { useStore } from "zustand";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { WidgT, BaseWidg } from "@/shared/Widget";

//
import clock from "@/components/widgets/Clock";

//!
import "./Style.css";
import quote from "@/components/widgets/Quotes";
import searchbar from "@/components/widgets/SearchBar";
import ShortCuts from "@/components/widgets/shortcuts";
import stopwatch from "@/components/widgets/Stopwatch";

//*type
import type { UserD } from "./shared/userdata/Functions";

import SettingsUi from "./components/settings";
import { gridstate } from "./shared/grid";
//!
import { UserData } from "./shared/userdata/Functions";
const WidgCI: Record<WidgT, new (id: string) => BaseWidg> = {
  Clock: clock,
  Quote: quote,
  StopWatch: stopwatch,
  searchbar: searchbar,
  ShortCuts: ShortCuts,
};
//

//!
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
            gridConfig={{ cols: 20, rowHeight: 50 }}

            onDragStart={() => gridstate.setState({ drag: true })}
            onDragStop={() => {
              setTimeout(() => gridstate.setState({ drag: false }), 50);
            }}
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

const root = createRoot(document.getElementById("root")!);

function apply(s: UserD["Settings"]) {
  const h = document.documentElement;
  h.dataset.theme = s.theme ?? "default";
  h.classList.toggle("dark", s.dark ?? false);
}
apply(UserData.getState().Settings);
UserData.subscribe((UD, Old) => {
  if (UD.Settings.theme !== Old.Settings.theme || UD.Settings.dark !== Old.Settings.dark) {
    apply(UD.Settings);
  }
});
root.render(
  <StrictMode>
    <>
      <SettingsUi />
      <GridUi />
    </>
  </StrictMode>,
);
