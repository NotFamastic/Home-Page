import { jsx as _jsx } from "react/jsx-runtime";
import { useContainerWidth, ReactGridLayout, } from "react-grid-layout";
import { useState } from "react";
import { createRoot } from "react-dom/client";
export { Userdata };
const root = createRoot(document.getElementById("root"));
let Userdata = JSON.parse(localStorage.getItem("Data") ??
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
    }));
function Grid() {
    const { width, containerRef, mounted } = useContainerWidth();
    //*Variables
    const [layout, setLayout] = useState(Userdata.SharedData.layout);
    //!To Do
    return (_jsx("div", { ref: containerRef, children: mounted && (_jsx(ReactGridLayout, { layout: layout, width: width, gridConfig: { cols: 12, rowHeight: 150 }, children: layout.map((item) => (_jsx("div", {}, item.i))) })) }));
}
root.render(_jsx(Grid, {}));
//# sourceMappingURL=Initital.js.map