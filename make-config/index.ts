import.meta.glob("./*.ts", { eager: true });

const ignorePath = ["_template"];
export const contents = Object.entries(
  import.meta.glob("./*.ts", {
    eager: true,
    import: "default",
  }),
).reduce(
  (acc, [key, value]) => {
    const keyName = key.split("/").pop()?.split(".")[0]!;
    if (ignorePath.includes(keyName)) return acc;
    acc[keyName] = value;
    return acc;
  },
  {} as Record<string, any>,
);
