import {
  Responsive,
  useGridLayout,
  horizontalCompactor,
  useContainerWidth,
  ReactGridLayout,
} from "react-grid-layout";
import type { LayoutItem, Layout } from "react-grid-layout";
import { useState, Dispatch, SetStateAction } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
//!
//!
import "./Style.scss";
import { UD, WidClass } from "./Shared/Types";
import SettingsUi from "./Components/widgets/settings";
import { getUserData, UpdateUD } from "./Shared/UD/UD";
const root = createRoot(document.getElementById("root")!);

function GridUi({
  userdata,
  setUserdata,
}: {
  userdata: UD;
  setUserdata: Dispatch<SetStateAction<UD>>;
}): React.ReactElement {
  //https://www.npmjs.com/package/react-grid-layout?activeTab=readme

  const { width, containerRef, mounted } = useContainerWidth();
  const layout = userdata.SharedData.layout;

  return (
    <>
      <div ref={containerRef} className="overflow-auto">
        {mounted && (
          <ReactGridLayout
            layout={layout}
            onLayoutChange={(Layout) => {
              setUserdata(UpdateUD("layout", Layout));
            }}
            width={width}
            gridConfig={{ cols: 10, rowHeight: 10 }}
          >
            {layout.map((This: LayoutItem) => {
              /*LayoutItem 
              [{ i: "clock-1", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 }]
               */
              const widgdata = userdata.Widgets[This.i]; /*uses shared Id*/
              const Class = WidClass[widgdata.type]; //!gets class using widg type(string)

              if (!Class) return;

              const ThisWidg = new Class(This.i, widgdata.data);
              return <div key={This.i}>{ThisWidg.html}</div>;
            })}
          </ReactGridLayout>
        )}
      </div>
    </>
  );
}
function Ui() {
  const [userdata, setUserdata] = useState(getUserData());

  return (
    <>
      <SettingsUi userdata={userdata} />
      <GridUi userdata={userdata} setUserdata={setUserdata} />
    </>
  );
}

root.render(<Ui />);
