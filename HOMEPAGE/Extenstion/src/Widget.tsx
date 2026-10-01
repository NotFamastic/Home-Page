import {
  Responsive,
  useContainerWidth,
  ReactGridLayout,
} from "react-grid-layout";
import type { LayoutItem } from "react-grid-layout";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
export { Clock };

type clt /*clock type*/ = {
  Time: {
    enabled: "hidden" | "visible";
    hour?: "numeric";
    minute?: "2-digit";
    second?: "2-digit";
    hour12?: boolean;
  };
  Date: {
    enabled: boolean;
    weekday?: "long";
    day?: "numeric";
    month?: "long" | "short" | "numeric";
    year?: "numeric";
  };
};
function ClockHtml(s: clt) {
  const [Structure, _] = useState(s);
  const [t /*time*/, newt] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => newt(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="Clock">
      <h2 style={{visibility: Structure.Time.enabled}}>
        {t.toLocaleTimeString([], {
          hour: Structure.Time.hour,
          minute: Structure.Time.minute,
          second: Structure.Time.second,
          hour12: Structure.Time.hour12,
        })}
      </h2>
      <h3 style={{visibility: Structure.Time.enabled}}>
        {t.toLocaleDateString("en-US", {
          day: Structure.Date.day,
          month: Structure.Date.month,
          year: Structure.Date.year,
          weekday: Structure.Date.weekday,
        })}
      </h3>
      <h3 style={{visibility: Structure.Time.enabled? /*if TRUE*/ "visible": /*else*/ "hidden",}}>
        {t.toLocaleDateString("en-US", {
          day: Structure.Date.day,
          month: Structure.Date.month,
          year: Structure.Date.year,
          weekday: Structure.Date.weekday,
        })}
      </h3>
    </div>
  );
}
class Clock {
  //*Property
  id: string;
  type: any;
  stucture:clt;
  constructor(id: string, s: clt) {
    this.id = id;
    this.stucture = s;
  }
}

/*{
  id: 123,
  index: 2,
  windowId: 456,
  active: true,
  pinned: false,
  highlighted: true,
  incognito: false,
  url: "https://example.com/",
  title: "Example Domain",
  status: "complete"
}*/
