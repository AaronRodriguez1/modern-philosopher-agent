export type ExportRecord = {
  input: string;
  output: string;
  label: "positive" | "negative";
};

export function toJsonl(records: ExportRecord[]): string {
  return records.map((record) => JSON.stringify(record)).join("\n");
}
