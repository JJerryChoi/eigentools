"use client";

import { JsonFormatter } from "@/components/tools/json-formatter";
import { Base64Tool } from "@/components/tools/base64";
import { JwtDecoder } from "@/components/tools/jwt-decoder";
import { UrlEncoder } from "@/components/tools/url-encoder";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { HashGenerator } from "@/components/tools/hash-generator";
import { RegexTester } from "@/components/tools/regex-tester";
import { TimestampConverter } from "@/components/tools/timestamp-converter";
import { ColorConverter } from "@/components/tools/color-converter";
import { MarkdownPreview } from "@/components/tools/markdown-preview";
import { DiffChecker } from "@/components/tools/diff-checker";
import { YamlJsonConverter } from "@/components/tools/yaml-json";
import { CsvToJson } from "@/components/tools/csv-json";
import { CronParser } from "@/components/tools/cron-parser";

const toolComponents: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  base64: Base64Tool,
  "jwt-decoder": JwtDecoder,
  "url-encoder": UrlEncoder,
  "uuid-generator": UuidGenerator,
  "hash-generator": HashGenerator,
  "regex-tester": RegexTester,
  "timestamp-converter": TimestampConverter,
  "color-converter": ColorConverter,
  "markdown-preview": MarkdownPreview,
  "diff-checker": DiffChecker,
  "yaml-json": YamlJsonConverter,
  "csv-json": CsvToJson,
  "cron-parser": CronParser,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = toolComponents[slug];
  if (!Component) return null;
  return <Component />;
}
