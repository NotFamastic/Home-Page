import { useContainerWidth, ReactGridLayout } from "react-grid-layout";
import type { LayoutItem, Layout } from "react-grid-layout";
import { noCompactor } from "react-grid-layout/core";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
//!
import React, { useState, Dispatch, SetStateAction,useEffect } from "react";
import { createRoot } from "react-dom/client";
//!
import { Button, Image } from "react-bootstrap";
//!
import { UserD, WidgCI } from "./Shared/Types";
import SettingsUi from "./Components/settings";
import { getUserData, UpdateUserD } from "./Shared/UserData/Functions";
//*
const root = createRoot(document.getElementById("root")!);
function GridUi({
  userdata,
  setUserdata,
}: {
  userdata: UserD;
  setUserdata: Dispatch<SetStateAction<UserD>>;
}): React.ReactElement {
  const { width, containerRef, mounted } = useContainerWidth();
  const layout = userdata.SharedData.layout;

  return (
    <>
      <div ref={containerRef} className="overflow-auto">
        {mounted && (
          <ReactGridLayout
            layout={layout}
            onLayoutChange={(Layout) => {
              setUserdata(UpdateUserD("layout", Layout));
            }}
            compactor={{
              ...noCompactor,
              allowOverlap: false,
              preventCollision: true,
            }}
            autoSize
            width={width}
            gridConfig={{ cols: 10, rowHeight: 10 }}
          >
            {layout.map((This: LayoutItem) => {
              /*LayoutItem 
              [{ i: "clock-1", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 }]
               */

              const widget = userdata.Widgets[This.i]; /*uses shared Id*/
              const Class = WidgCI[widget.type]; //!gets class using widg type(string)

              if (!Class) {
                console.log(widget, Class);
              }

              const ThisWidg = new Class(This.i);
              return <div key={This.i}>{ThisWidg.Render(widget.data)}</div>;
            })}
          </ReactGridLayout>
        )}
      </div>
    </>
  );
}
import { ThemeList } from "./Shared/Variables";
function Ui() {
  const [userdata, setUserdata] = useState(getUserData());
  const [showSett, changeSett] = useState(false);
  useEffect(() => {
    const link = document.getElementById("theme") as HTMLLinkElement;

    link.href = ThemeList[userdata.Settings.theme];
  }, [userdata.Settings.theme]);
  return (
    <>
      <Button
        variant="white"
        onClick={() => {
          changeSett((s) => !s);
        }}
      >
        <Image src="/Assets/SettingIcon.svg"></Image>
      </Button>
      {showSett && (
        <SettingsUi
          SettData={userdata.Settings}
          setUserdata={setUserdata}
          Close={() => changeSett(false)}
        />
      )}
      <GridUi userdata={userdata} setUserdata={setUserdata} />
    </>
  );
}

root.render(<Ui />);
