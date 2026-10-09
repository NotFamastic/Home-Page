import { themes } from "./Types";
//!
import Default from "bootstrap/dist/css/bootstrap.min.css?url";
import brite from "bootswatch/dist/brite/bootstrap.min.css?url";
import cyborg from "bootswatch/dist/cyborg/bootstrap.min.css?url";
import simplex from "bootswatch/dist/simplex/bootstrap.min.css?url";
import sketchy from "bootswatch/dist/sketchy/bootstrap.min.css?url";
import vapor from "bootswatch/dist/vapor/bootstrap.min.css?url";
import zephyr from "bootswatch/dist/zephyr/bootstrap.min.css?url";

export const ThemeList: Record<themes, string> = {
  Default: Default,
  Brite: brite,
  Cyborg: cyborg,
  Simplex: simplex,
  Sketchy: sketchy,
  Vapor: vapor,
  Zephyr: zephyr,
};
