import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { ENVIRONMENT, PROJECT_ROOT } from "../../config/";

export const getDirname = (importMetaUrl: string) => {
  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
};

export const DIRNAME =
  ENVIRONMENT === "production"
    ? PROJECT_ROOT || ""
    : getDirname(import.meta.url);

export const resolveImagePath = (file: string) =>
  ENVIRONMENT === "production"
    ? path.join(DIRNAME, "public/images", file)
    : path.join(DIRNAME, "../../../public/images", file);
