import { GlobeOff, Plus } from "lucide-react";
//!
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";

//!
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup,
  ItemFooter,
} from "@/components/ui/item";

import type { WidgDTI } from "../../shared/Widget";

//*type
import { UserData } from "../../shared/userdata/Functions";
//!
import { BaseWidg } from "../../shared/Widget";
type SC = {
  id: number;
  name: string;
  url: `${"https" | "http"}://${string}.${string}`;
  logo: string;
  key: string;
};
export type SClist = SC[];
//!
function Ui(): React.ReactElement {
  const Shortcutlist: SClist =
    // useStore(
    //   UserData,
    //   (ud) => ud.SharedData.Shortcuts,
    // );
    [
      {
        id: 1,
        name: "string",
        url: `https://github.com/NotFamastic/Home-Page/pull/11`,
        logo: "https://avatars.githubusercontent.com/u/158486761?v=4&size=64",
        key: "string",
      },
    ];
  return (
    <ItemGroup key="shortcuts">
      <div key={"shortcuts"}>
        {Shortcutlist?.map((data: SC) => (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            key={data.id}
            aria-label={data.name}
          >
            <Item key={data.id} variant={"outline"}>
              <ItemContent>
                <svg viewBox="0 0 200 200" width="200" height="200">
                  <image href={data.logo} x="0" y="0" preserveAspectRatio="xMidYMid slice" />
                </svg>
              </ItemContent>

              <ItemFooter>{data.name}</ItemFooter>
            </Item>
          </a>
        ))}
      </div>

      <Item key={"actions"} variant={"muted"}>
        <ItemActions>
          <Button>
            <Plus />
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
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
