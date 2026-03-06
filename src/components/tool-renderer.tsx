"use client";

import { JsonFormatter } from "@/components/tools/json-formatter";
import { Base64Tool } from "@/components/tools/base64";
import { JwtDecoder } from "@/components/tools/jwt-decoder";
import { UrlEncoder } from "@/components/tools/url-encoder";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { HashGenerator } from "@/components/tools/hash-generator";
import { RegexTester } from "@/components/tools/regex-tester";
import { TimestampConverter } from "@/components/tools/timestamp-converter";

const toolComponents: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  base64: Base64Tool,
  "jwt-decoder": JwtDecoder,
  "url-encoder": UrlEncoder,
  "uuid-generator": UuidGenerator,
  "hash-generator": HashGenerator,
  "regex-tester": RegexTester,
  "timestamp-converter": TimestampConverter,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = toolComponents[slug];
  if (!Component) return null;
  return <Component />;
}
