//!
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
//!
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";

import { GlobeOff } from "lucide-react";
import { Plus } from "lucide-react";
//!
import { BaseWidg } from "../../shared/Widget";
//*type
import { UserData } from "../../shared/userdata/Functions";
import type { WidgDTI } from "../../shared/Widget";
export type SCD = {
  id: number;
  name: string;
  url: `${"https" | "http"}://${string}.${string}`;
  logo: string;
  key: string;
}[];
//!
function Ui(): React.ReactElement {
  const list = useStore(UserData, (ud) => ud.SCD);
  return (
    <>
      <div key="Shortcuts">
        {list?.map((obj) => (
          <Avatar key={obj.id}>
            <AvatarImage src={obj.logo} />
            <AvatarFallback>
              <GlobeOff />
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <Button key="addbtn">
        <Plus />
      </Button>
    </>
  );
}
//!
export default class ShortCuts extends BaseWidg {
  constructor(id: string) {
    super(id, "ShortCuts");
  }
  Render(_: WidgDTI["ShortCuts"]): React.ReactElement {
    return <Ui />;
  }
}
