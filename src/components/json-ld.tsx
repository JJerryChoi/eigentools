export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EigenTools",
    description:
      "Fast, free, client-side developer tools. JSON formatter, Base64 encoder, JWT decoder, UUID generator, hash generator, regex tester, and more.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "JSON Formatter & Validator",
      "Base64 Encoder & Decoder",
      "JWT Decoder",
      "URL Encoder & Decoder",
      "UUID Generator",
      "Hash Generator (SHA-256, SHA-1, SHA-512)",
      "Regex Tester",
      "Unix Timestamp Converter",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
