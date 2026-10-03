import {
  Responsive,
  useContainerWidth,
  ReactGridLayout,
} from "react-grid-layout";
import type { LayoutItem } from "react-grid-layout";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Clock } from "./Widget";
import { UD } from "./Types";
export { Userdata };

const root = createRoot(document.getElementById("root") as HTMLElement);
let Userdata: UD = JSON.parse(
  localStorage.getItem("Data") ??
    JSON.stringify({
      //!
      Widgets: {
        id: {
          type: "Clock",
        },
        layout: [{ i: "id", x: 0, y: 0, w: 2, h: 2 }],
      },
      SharedData: {
        alarm: [],
      },
      Settings: {}, //!
    }),
);
function Grid() {
  const { width, containerRef, mounted } = useContainerWidth();
  //*Variables
  const [layout, setLayout] = useState(Userdata.SharedData.layout);
  //!To Do
  return (
    <div ref={containerRef}>
      {mounted && (
        <ReactGridLayout
          layout={layout}
          width={width}
          gridConfig={{ cols: 12, rowHeight: 150 }}
        >
          {layout.map((item: LayoutItem) => (
            <div key={item.i}></div>
          ))}
        </ReactGridLayout>
      )}
    </div>
  );
}

root.render(<Grid />);
