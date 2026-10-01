import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export { Clock };
function ClockHtml(s) {
    const [Structure] = useState(s);
    const [t, newt] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => newt(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    return (_jsxs("div", { className: "Clock", children: [_jsx("h2", { style: { visibility: Structure.Time.enabled ? /*if TRUE*/ "visible" : /*else*/ "hidden" }, children: t.toLocaleTimeString([], { hour: Structure.Time.hour, minute: Structure.Time.minute, second: Structure.Time.second, hour12: Structure.Time.hour12 }) }), _jsx("h3", { style: { visibility: Structure.Time.enabled ? /*if TRUE*/ "visible" : /*else*/ "hidden" }, children: t.toLocaleDateString("en-US", { day: Structure.Time.hour, minute: Structure.Time.minute, second: Structure.Time.second, hour12: Structure.Time.hour12 }) })] }));
}
class Clock {
    constructor(id) {
        this.id = id;
    }
}
var abc = new Clock("1");
//# sourceMappingURL=Widget.js.map