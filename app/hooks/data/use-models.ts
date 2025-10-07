import { useMemo } from "react";
import { i2vModels } from "~/data/models";

export function useModels(type: "i2v" | "t2v") {
  const list = useMemo(() => {
    if (type === "i2v") return i2vModels;
    else return [];
  }, [type]);

  return list;
}
