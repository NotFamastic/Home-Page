export {};
import {RuntimeData} from "./variables.js";
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
//let debugperm:boolean = false;
//let BugReport:any = []

chrome.tabs.onCreated.addListener(async (ThisTab: chrome.tabs.Tab) => {
  await chrome.tabs.update(ThisTab.id, { url: "HomePage.html" });
});

chrome.tabs.onUpdated.addListener((ID, changeInfo, ThisTab) => {
  if (ThisTab.active) {
    activetab = ThisTab.id;
  }
  if (ThisTab.audible) {
    audibletab.push(ThisTab.id);
  }
});
