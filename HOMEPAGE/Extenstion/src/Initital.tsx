import { Responsive, useContainerWidth, ReactGridLayout } from "react-grid-layout";
import type { LayoutItem } from "react-grid-layout";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Clock } from "./Widget";

const root = createRoot(document.getElementById("root") as HTMLElement);
let data = JSON.parse(localStorage.getItem("Data")??JSON.stringify({
    "Widgets":{
     "A":{
        "type":"Clock",
      },
      "layout":[{ i: "A", x: 0, y: 0, w: 2, h: 2 }]
    },
    "Settings":{}
  })
);
function Grid() {
  const { width, containerRef, mounted } = useContainerWidth();
  //*Variables
  const [layout, setLayout] = useState(data.Widgets.layout);
  return (
    <div ref={containerRef}>
      {mounted && (
        <ReactGridLayout
          layout={layout}
          width={width}
          gridConfig={{cols:12, rowHeight:150}}>
          {layout.map((item:LayoutItem) => (
            <div key={(item.i)}>

            </div>
          ))}
        </ReactGridLayout>
      )}
    </div>
  )
}

root.render(<Grid/>);