//!
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { SearchIcon } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
//!
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/Components/ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandGroup,
  CommandSeparator,
  CommandEmpty,
} from "@/Components/ui/command";

//!
import type { WidgDTI } from "../../shared/Widget";
import { BaseWidg } from "../../shared/Widget";
import { UserData } from "@/shared/userdata/Functions";
//!
import { siBrave, siGoogle, siDuckduckgo, siDedge } from "simple-icons";
import type { SimpleIcon } from "simple-icons";
//*type
type engine = (typeof SearchList)[number]["value"];
type query = string;
type suggest = string;

export const SearchList = [
  { value: "b", label: "Brave" },
  { value: "g", label: "Google" },
  { value: "d", label: "DuckDuckGo" },
  { value: "e", label: "Bing" },
] as const;

const links: {
  [k in engine]: [
    `https://${string}.com/${string}=`, // search url
    `https://${string}.com/${string}=`, // suggestion url
    SimpleIcon,
  ];
} = {
  b: [
    "https://search.brave.com/search?q=",
    "https://search.brave.com/api/suggest?q=",
    siBrave,
  ],
  g: [
    "https://www.google.com/search?q=",
    "https://suggestqueries.google.com/complete/search?client=firefox&q=",
    siGoogle,
  ],
  d: [
    "https://duckduckgo.com/?q=",
    "https://duckduckgo.com/ac/?q=",
    siDuckduckgo,
  ],
  e: [
    "https://www.bing.com/search?q=",
    "https://api.bing.com/osjson.aspx?query=",
    siDedge,
  ],
};

const proxyPaths: Record<engine, string> = {
  b: "/brave-suggest",
  g: "/google-suggest",
  d: "/ddg-suggest",
  e: "/bing-suggest",
};

async function fetchSuggestions(
  q: query,
  e: engine,
  s: AbortSignal,
): Promise<suggest[]> {
  const url = links[e][1] + encodeURIComponent(q);
  const requestUrl = import.meta.env.DEV
    ? `${proxyPaths[e]}${new URL(url).search}`
    : url;

  const res = await fetch(requestUrl, { signal: s });
  if (!res.ok) return [];
  const data = await res.json();

  switch (e) {
    case "d":
      return data.map((o: { phrase: string }) => o.phrase);
    default:
      return data[1] ?? [];
  }
}

function SearchInput({
  className,
  icon,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  icon: React.ReactNode;
}) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none!">
        <InputGroupAddon>{icon}</InputGroupAddon>
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "min-w-0 flex-1 bg-transparent px-2 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </InputGroup>
    </div>
  );
}

function Ui(): React.ReactElement {
  const engine = useStore(UserData, (UD) => UD.Settings.search) as engine;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState<query>("");
  const [suggestlist, setSuggestlist] = useState<[query, suggest[]]>(["", []]);

  useEffect(() => {
    if (!q.trim()) {
      setSuggestlist(["", []]);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      fetchSuggestions(q, engine, ctrl.signal)
        .then((value) => {
          if (!ctrl.signal.aborted) {
            setSuggestlist([q, value]);
          }
        })
        .catch((e) => {
          if (e.name !== "AbortError")
            console.error("Suggestion call failed:", e);
        });
    }, 200);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, engine]);

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      setQ("");
      setSuggestlist(["", []]);
    }
  }

  function search(text: query) {
    const q = text.trim();
    if (!q) return;

    const url = links[engine][0] + encodeURIComponent(q);
    if (typeof chrome !== "undefined" && chrome.tabs?.create) {
      chrome.tabs.create({ url });
    } else {
      window.open(url, "_blank", "noopener");
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger nativeButton={false} render={<div />}>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." readOnly tabIndex={-1} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="button" variant="default" tabIndex={-1}>
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <Command defaultValue={q} shouldFilter={false}>
          <SearchInput
            value={q}
            onValueChange={setQ}
            placeholder="Search..."
            icon={
              <svg
                role="img"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d={links[engine][2].path} />
              </svg>
            }
          />
          <CommandList>
            <CommandEmpty>
              <span>No results found</span>
            </CommandEmpty>
            {suggestlist[0] && (
              <>
                <CommandGroup heading="Search Results">
                  <CommandItem
                    key={-1}
                    value={q}
                    onSelect={() => search(suggestlist[0])}
                  >
                    {suggestlist[0]}
                  </CommandItem>
                  {suggestlist[1].map(
                    (s, i) =>
                      s !== q && (
                        <CommandItem
                          key={i}
                          value={s}
                          onSelect={() => search(s)}
                        >
                          <SearchIcon />
                          {s}
                        </CommandItem>
                      ),
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default class searchbar extends BaseWidg {
  constructor(id: string) {
    super(id, "searchbar");
  }
  Render(_: WidgDTI["searchbar"]): React.ReactElement {
    return <Ui />;
  }
}
