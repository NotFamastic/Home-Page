//!
import React from "react";
import { useStore } from "zustand";
import { SearchIcon } from "lucide-react";
//!
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
//!
//*
import type { WidgDTI } from "../../shared/Widget";
type searchkey = (typeof SearchList)[number]["value"];

import { UserData } from "@/shared/userdata/Functions";
import { BaseWidg } from "../../shared/Widget";
//!
export const SearchList = [
  { value: "b", label: "Brave" },
  { value: "g", label: "Google" },
] as const;
const links: {
  [k in searchkey]: `https://${string}.com/${string}?q=`;
} = {
  b: "https://search.brave.com/search?q=",
  g: "https://www.google.com/search?q=",
};
//!
function Ui(): React.ReactElement {
  const engine = useStore(UserData, (UD) => UD.Settings.search);

  function search(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    if (!q) return;

    const url = links[engine] + encodeURIComponent(q);
    chrome.tabs.create({ url });
  }

  return (
    <form onSubmit={search}>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput name="q" placeholder="Search..." autoComplete="on" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" variant="default">
            image
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
//!
export default class searchbar extends BaseWidg {
  constructor(id: string) {
    super(id, "searchbar");
  }
  Render(_: WidgDTI["searchbar"]): React.ReactElement {
    return <Ui />;
  }
}
