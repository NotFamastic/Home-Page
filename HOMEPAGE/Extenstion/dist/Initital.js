import { jsx as _jsx } from "react/jsx-runtime";
import { useContainerWidth, ReactGridLayout } from "react-grid-layout";
import { useState } from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
let data = JSON.parse(localStorage.getItem("Data") ?? JSON.stringify({
    "Widgets": {
        "A": {
            "type": "Clock",
        },
        "layout": [{ i: "A", x: 0, y: 0, w: 2, h: 2 }]
    },
    "Settings": {}
}));
function Grid() {
    const { width, containerRef, mounted } = useContainerWidth();
    //*Variables
    const [layout, setLayout] = useState(data.Widgets.layout);
    return (_jsx("div", { ref: containerRef, children: mounted && (_jsx(ReactGridLayout, { layout: layout, width: width, gridConfig: { cols: 12, rowHeight: 150 }, children: layout.map((item) => (_jsx("div", {}, (item.i)))) })) }));
}
root.render(_jsx(Grid, {}));
//# sourceMappingURL=Initital.js.map