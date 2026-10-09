import type { UserD, SettD } from "../Types";
import type { Layout } from "react-grid-layout";
import DefaultData from "./DefaultUD";

var localdata: UserD = getUserData(); //local user data

export function getUserData(): UserD {
  localdata =
    localdata ??
    JSON.parse(localStorage.getItem("Data") ?? JSON.stringify(DefaultData));
  return localdata;
}
type typelist = {
  layout: Layout;
  Setting: SettD;
  Custom: any;
};

/*export function UpdateUserD<Namelist extends (keyof typelist)>(
  Type: Namelist,
  ND: typelist[Namelist],
): UserD {
  const OD = localdata ?? getUserData();
  switch (Type) {
    case "layout":
      localdata = {
        ...OD,
        SharedData: {
          ...OD.SharedData,
          layout: [...(ND as Layout)],
        },
      };
      break;
    case "Settings":
      localdata = {
        ...OD,
        Settings: {
          ...OD.Settings,
        },
      };
      break;
    default:
      throw new Error(`UserDataUpdateBug ${Type}`);
  }
  localStorage.setItem("Data", JSON.stringify(localdata));
  return localdata;
}*/
export function UpdateUserD<Namelist extends keyof typelist>(
  Type: Namelist,
  NewD: typelist[Namelist],
): UserD {
  const OldD = localdata ?? getUserData();
  switch (Type) {
    case "layout":
      localdata = {
        ...OldD,
        SharedData: {
          ...OldD.SharedData,
          layout: [...(NewD as Layout)],
        },
      };
      break;
    case "Setting":
      localdata = {
        ...OldD,
        Settings: {
          ...(NewD as SettD),
        },
      };
      break;
    case "Custom":
      localdata = NewD;
      break;
    default:
      throw new Error(`UserDataUpdateBug ${Type}`);
  }

  localStorage.setItem("Data", JSON.stringify(localdata));

  return localdata;
}
