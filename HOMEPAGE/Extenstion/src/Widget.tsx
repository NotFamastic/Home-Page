import { Responsive, useContainerWidth, ReactGridLayout } from "react-grid-layout";
import type { LayoutItem } from "react-grid-layout";
import { useEffect,useState } from "react";
import { createRoot } from "react-dom/client";
export {Clock};

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
type d = {
  "Time":{enabled:boolean ,hour:"numeric"|"2-digit" ,minute:"numeric"|"2-digit" ,second:"numeric"|"2-digit" ,hour12:boolean},
  "Date":{enabled:boolean ,day:"numeric"|"2-digit", month: "short", year: "numeric"}
}
function ClockHtml(s:d){
  const [Structure] = useState(s)
  const [t, newt] = useState(new Date());
  useEffect(() => {
  const id = setInterval(() => newt(new Date()), 1000);
  return () => clearInterval(id);
}, []);
  return (
    <div className="Clock">
      <h2 style={{visibility:Structure.Time.enabled?/*if TRUE*/"visible":/*else*/"hidden"}}>{t.toLocaleTimeString([],{hour:Structure.Time.hour,minute:Structure.Time.minute,second:Structure.Time.second,hour12:Structure.Time.hour12})}</h2>
      <h3 style={{visibility:Structure.Time.enabled?/*if TRUE*/"visible":/*else*/"hidden"}}>{t.toLocaleDateString("en-US",{day:Structure.Time.hour,minute:Structure.Time.minute,second:Structure.Time.second,hour12:Structure.Time.hour12})}</h3>

    </div>
  );
}
class Clock{
  //*Property
  id:string;
  type:any;

  constructor(id:string){
    this.id = id;

  }
}
var abc = new Clock("1")