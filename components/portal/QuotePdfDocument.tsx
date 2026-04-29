import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Defs,
  Stop,
  LinearGradient,
  Rect,
  pdf,
} from "@react-pdf/renderer";
import type { QuoteResponse } from "../../lib/portal/types";

/* ── Brand tokens ─────────────────────────────────────── */
const C = {
  navy: "#061E4B",
  green: "#5AAD5A",
  darkGreen: "#3F8A3F",
  midGreen: "#7ECF7E",
  pink: "#C40084",
  black: "#141415",
  gray: "#58595B",
  line: "#D1D1D6",
  lightLine: "#f0f1f3",
  fog: "#EEF1F6",
  white: "#FFFFFF",
  totalBg: "#f8fafb",
  greenCalloutBg: "#F0F7F0",
};


/* ── Styles ───────────────────────────────────────────── */
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: C.black,
    padding: 0,
    paddingBottom: 50,
  },

  /* Navy header */
  header: {
    backgroundColor: C.navy,
    paddingTop: 30,
    paddingBottom: 26,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: { flexDirection: "column", flex: 1, marginRight: 16 },
  headerTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    color: C.white,
    lineHeight: 1.3,
  },
  headerSubtitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.pink,
    letterSpacing: 0.4,
    marginTop: 6,
  },
  logo: { width: 130, height: 26 },

  /* Accent bar */
  accentBar: { width: "100%", height: 3 },

  /* Body */
  body: { paddingHorizontal: 40, paddingTop: 28 },

  /* Section label — green uppercase */
  sectionLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: C.darkGreen,
    marginBottom: 10,
  },

  /* Scope paragraph */
  scopeText: {
    fontSize: 11,
    lineHeight: 1.7,
    color: C.black,
    marginBottom: 6,
  },

  /* Bullet list */
  bulletRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.lightLine,
    alignItems: "flex-start",
  },
  bulletRowLast: { borderBottomWidth: 0 },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.green,
    marginTop: 3,
    marginRight: 8,
  },
  bulletText: { flex: 1, fontSize: 11, lineHeight: 1.5, color: C.black },

  /* Paragraph section */
  paragraph: { fontSize: 11, lineHeight: 1.7, color: C.black, marginBottom: 4 },

  /* Green callout */
  callout: {
    backgroundColor: C.greenCalloutBg,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
    borderRadius: 4,
    padding: 14,
    marginTop: 4,
  },
  calloutHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textTransform: "uppercase" as const,
    letterSpacing: 1.2,
    color: C.darkGreen,
    marginBottom: 6,
  },
  calloutBody: { fontSize: 11, color: C.black, lineHeight: 1.5 },

  /* Total bar */
  totalBar: {
    marginTop: 28,
    backgroundColor: C.totalBg,
    borderTopWidth: 2,
    borderTopColor: C.line,
    paddingVertical: 22,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.gray,
    textTransform: "uppercase" as const,
    letterSpacing: 0.6,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: C.green,
    letterSpacing: -0.2,
  },

  /* Navy footer (fixed) */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.navy,
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerDisclaimer: {
    fontSize: 7,
    color: "rgba(255,255,255,0.45)",
    maxWidth: "70%",
    lineHeight: 1.4,
  },
  footerRight: { alignItems: "flex-end" },
  footerBrand: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "rgba(255,255,255,0.45)",
    marginBottom: 2,
  },
  footerPage: { fontSize: 7, color: "rgba(255,255,255,0.35)" },

  /* Spacer between sections */
  sectionGap: { marginTop: 24 },
});

/* ── Helpers ──────────────────────────────────────────── */
function formatPrice(low: number, high: number) {
  const fmt = (n: number) =>
    Number(n).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  return `${fmt(low)} – ${fmt(high)}`;
}

/* ── Bullet list ──────────────────────────────────────── */
function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, i) => (
        <View
          key={i}
          style={
            i === items.length - 1
              ? [s.bulletRow, s.bulletRowLast]
              : s.bulletRow
          }
          wrap={false}
        >
          <View style={s.bulletDot} />
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

/* ── Document ─────────────────────────────────────────── */
interface QuotePdfDocumentProps {
  quote: QuoteResponse;
  reverseLogoUrl: string;
}

function QuotePdfDocument({
  quote,
  reverseLogoUrl,
}: QuotePdfDocumentProps) {
  const scopeParagraphs = quote.scope_summary.split("\n").filter(Boolean);
  const disclaimerText =
    quote.disclaimer ??
    "This quote was generated by Green Irony\u2019s AI-powered quoting engine. Pricing subject to scope confirmation.";

  return (
    <Document
      title={`Green Irony Quote – ${quote.customer_name}`}
      author="Green Irony"
    >
      <Page size="LETTER" style={s.page}>
        {/* ── Navy header ── */}
        <View style={s.header} fixed>
          <View style={s.headerLeft}>
            <Text style={s.headerTitle}>
              {quote.customer_name} — {quote.offering_tier}
            </Text>
            <Text style={s.headerSubtitle}>Salesforce Services Proposal</Text>
          </View>
          <Image src={reverseLogoUrl} style={s.logo} />
        </View>

        {/* ── Accent gradient bar ── */}
        <View style={s.accentBar} fixed>
          <Svg width="612" height="3" viewBox="0 0 612 3">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="612" y2="0" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor={C.green} />
                <Stop offset="0.5" stopColor={C.midGreen} />
                <Stop offset="1" stopColor={C.pink} />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="612" height="3" fill="url(#grad)" />
          </Svg>
        </View>

        {/* ── Body ── */}
        <View style={s.body}>
          {/* Scope Summary */}
          <Text style={s.sectionLabel}>Scope</Text>
          {scopeParagraphs.map((para, i) => (
            <Text key={i} style={s.scopeText}>
              {para}
            </Text>
          ))}

          {/* Bullet sections */}
          {[
            { heading: "Integration Use Cases", items: quote.key_use_cases },
          ].map((section) => (
            <View key={section.heading} style={s.sectionGap}>
              <Text style={s.sectionLabel}>{section.heading}</Text>
              <BulletList items={section.items} />
            </View>
          ))}

          {/* Recommended Next Steps */}
          <View style={s.sectionGap}>
            <Text style={s.sectionLabel}>Recommended Next Steps</Text>
            <Text style={s.paragraph}>{quote.recommended_next_steps}</Text>
          </View>

          {/* Additional Services */}
          {quote.additional_services && (
            <View style={s.sectionGap} wrap={false}>
              <View style={s.callout}>
                <Text style={s.calloutHeading}>
                  Additional Services Identified
                </Text>
                <Text style={s.calloutBody}>{quote.additional_services}</Text>
                <Text style={[s.calloutBody, { marginTop: 4 }]}>
                  Contact your Green Irony AE to discuss these services.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ── Total price bar ── */}
        <View style={s.totalBar} wrap={false}>
          <Text style={s.totalLabel}>Estimated Price Range</Text>
          <Text style={s.totalPrice}>
            {formatPrice(quote.price_low, quote.price_high)}
          </Text>
        </View>

        {/* ── Navy footer (fixed to every page) ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerDisclaimer}>{disclaimerText}</Text>
          <View style={s.footerRight}>
            <Text style={s.footerBrand}>Green Irony</Text>
            <Text
              style={s.footerPage}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}

/* ── Download helper ──────────────────────────────────── */
export async function downloadQuotePdf(quote: QuoteResponse) {
  const reverseLogoUrl = `${window.location.origin}/logos/green-irony/Green-Irony-Logo-Reverse.png`;

  const blob = await pdf(
    <QuotePdfDocument quote={quote} reverseLogoUrl={reverseLogoUrl} />,
  ).toBlob();

  const slug = quote.customer_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const filename = `GreenIrony-Quote-${slug}-${quote.quote_id}.pdf`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default QuotePdfDocument;
