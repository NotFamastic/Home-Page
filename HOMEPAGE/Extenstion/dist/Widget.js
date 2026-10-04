import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Userdata } from "./Initital";
export { Clock };
function getNextAlarm(data) {
    const alarmlist = data.SharedData.alarm;
    if (alarmlist.length === 0) {
        return undefined;
    }
    return alarmlist.reduce(function (PrevAlarm, NextAlarm) {
        return NextAlarm.time > PrevAlarm.time ? PrevAlarm : NextAlarm;
    });
}
function ClockHtml(s) {
    const [Structure, _] = useState(s);
    const [t /*time*/, newt] = useState(new Date());
    const [running, setRunning] = useState(false);
    const [sec, setSec] = useState(0);
    const [Alarm, newAlarm] = useState(getNextAlarm(Userdata));
    useEffect(() => {
        const id = setInterval(() => newt(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    useEffect(() => {
        if (!running) {
            return;
        }
        const id = setInterval(() => setSec((sec) => sec + 0.1), 100);
        return () => clearInterval(id);
    }, [running]);
    useEffect(() => {
        const id = setInterval(() => newAlarm(getNextAlarm(Userdata)), 30000);
        return () => clearInterval(id);
    }, []);
    return (_jsxs("div", { className: "Clock", children: [Structure.Time.enabled && (_jsx("h2", { children: t.toLocaleTimeString([], {
                    hour: Structure.Time.hour,
                    minute: Structure.Time.minute,
                    second: Structure.Time.second,
                    hour12: Structure.Time.hour12,
                }) })), Structure.Date.enabled && (_jsx("h3", { children: t.toLocaleDateString("en-US", {
                    day: Structure.Date.day,
                    month: Structure.Date.month,
                    year: Structure.Date.year,
                    weekday: Structure.Date.weekday,
                }) })), Alarm && (_jsxs("h3", { children: [Alarm.name, " at ", Alarm.time] })), _jsx("button", { style: { background: running ? "red" : "green" }, onClick: function () {
                    setRunning(!running);
                }, children: sec })] }));
}
class Clock {
    constructor(id, s) {
        this.id = id;
        this.stucture = s;
    }
}
//# sourceMappingURL=Widget.js.map