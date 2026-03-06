export interface Tool {
  name: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Format, minify, and validate JSON",
    seoTitle: "Online JSON Formatter & Validator - EigenTools",
    seoDescription: "Free online JSON formatter, validator, and minifier. Paste your JSON to format, minify, or validate instantly. No data sent to any server.",
    icon: "{ }",
  },
  {
    name: "Base64",
    slug: "base64",
    description: "Encode and decode Base64 strings",
    seoTitle: "Base64 Encode & Decode Online - EigenTools",
    seoDescription: "Free online Base64 encoder and decoder with full UTF-8 support. Convert text to Base64 and back instantly in your browser.",
    icon: "B64",
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    description: "Decode and inspect JSON Web Tokens",
    seoTitle: "JWT Decoder Online - Decode JSON Web Tokens - EigenTools",
    seoDescription: "Free online JWT decoder. Paste a JSON Web Token to decode the header, payload, and signature. Check token expiration instantly.",
    icon: "JWT",
  },
  {
    name: "URL Encoder",
    slug: "url-encoder",
    description: "Encode and decode URLs",
    seoTitle: "URL Encoder & Decoder Online - EigenTools",
    seoDescription: "Free online URL encoder and decoder. Encode special characters for URLs or decode percent-encoded strings instantly.",
    icon: "%20",
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate random v4 UUIDs",
    seoTitle: "UUID Generator Online - Generate v4 UUIDs - EigenTools",
    seoDescription: "Free online UUID v4 generator. Generate one or many random UUIDs instantly. Copy to clipboard with one click.",
    icon: "ID",
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    description: "Generate SHA-1, SHA-256, SHA-512 hashes",
    seoTitle: "Hash Generator Online - SHA-256, SHA-1, SHA-512 - EigenTools",
    seoDescription: "Free online hash generator. Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text instantly in your browser.",
    icon: "#",
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test regular expressions with live matching",
    seoTitle: "Regex Tester Online - Test Regular Expressions - EigenTools",
    seoDescription: "Free online regex tester with live highlighting. Test your regular expressions against sample text, see matches and capture groups in real time.",
    icon: ".*",
  },
  {
    name: "Timestamp",
    slug: "timestamp-converter",
    description: "Convert between Unix timestamps and dates",
    seoTitle: "Unix Timestamp Converter Online - EigenTools",
    seoDescription: "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates instantly. Supports seconds and milliseconds.",
    icon: "T",
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert between HEX, RGB, and HSL colors",
    seoTitle: "Color Converter Online - HEX RGB HSL - EigenTools",
    seoDescription: "Free online color converter. Convert between HEX, RGB, and HSL color formats instantly with live color preview. No data leaves your browser.",
    icon: "C",
  },
  {
    name: "Markdown Preview",
    slug: "markdown-preview",
    description: "Live markdown-to-HTML preview with GFM support",
    seoTitle: "Markdown Preview Online - Live GitHub Flavored Markdown - EigenTools",
    seoDescription: "Free online markdown preview tool. Render GitHub-flavored markdown to HTML in real time. Supports tables, code blocks, and more.",
    icon: "MD",
  },
  {
    name: "Diff Checker",
    slug: "diff-checker",
    description: "Compare two texts and highlight differences",
    seoTitle: "Diff Checker Online - Compare Text Differences - EigenTools",
    seoDescription: "Free online diff checker. Compare two texts side by side and see additions, deletions, and changes highlighted. Fast and private.",
    icon: "+-",
  },
  {
    name: "YAML / JSON",
    slug: "yaml-json",
    description: "Convert between YAML and JSON formats",
    seoTitle: "YAML to JSON Converter Online - EigenTools",
    seoDescription: "Free online YAML to JSON and JSON to YAML converter. Bidirectional conversion with instant results. All processing in your browser.",
    icon: "Y/J",
  },
  {
    name: "CSV to JSON",
    slug: "csv-json",
    description: "Convert CSV data to JSON array",
    seoTitle: "CSV to JSON Converter Online - EigenTools",
    seoDescription: "Free online CSV to JSON converter. Paste CSV data with headers and convert to a JSON array instantly. Handles quoted fields and commas.",
    icon: "CSV",
  },
  {
    name: "Cron Parser",
    slug: "cron-parser",
    description: "Parse cron expressions with next run times",
    seoTitle: "Cron Expression Parser Online - EigenTools",
    seoDescription: "Free online cron expression parser. Enter a cron expression to see a human-readable schedule and the next 5 run times. Supports all standard cron syntax.",
    icon: "*/5",
  },
];
