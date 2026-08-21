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
let debugperm
let BugReport = []
let activetab 
let audibletab = []
/*function filebug(date,success,reason){
    if (debugperm)
    BugReport.push([date,success,reason,navigator.userAgent])
}*/

chrome.tabs.onCreated.addListener(async (tab) => {
  let ThisTab
  try { ThisTab = await chrome.tabs.update(tab.id, {url: "https://example.com"});
  } catch (error) {
    console.log("Failed:", error);
  }
  if (ThisTab.active){
    activetab = ThisTab.id
  }
  if (ThisTab.audible){
    audibletab.push(ThisTab.id)
  }
});
const website = chrome.runtime.connect("YOUR_EXTENSION_ID");

website.postMessage({
  type: "hello",
  data: "test"
});

website.onMessage.addListener((message) => {
  console.log(message);
});
