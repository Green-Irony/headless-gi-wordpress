import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { QuoteResponse } from "../../lib/portal/types";

/* ── Brand tokens ─────────────────────────────────────── */
const C = {
  navy: "#061E4B",
  green: "#5AAD5A",
  gray: "#58595B",
  line: "#E9E9EF",
  fog: "#EEF1F6",
  white: "#FFFFFF",
  amber: "#D97706",
  amberBg: "#FFFBEB",
  amberBorder: "#FDE68A",
  red: "#DC2626",
};

const CONFIDENCE_COLOR: Record<QuoteResponse["confidence_level"], string> = {
  High: C.green,
  Medium: C.amber,
  Low: C.red,
};

/* ── Styles ───────────────────────────────────────────── */
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: C.navy,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
  },

  /* header */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  logo: { width: 140, height: 30 },
  headerRight: { alignItems: "flex-end" },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    color: C.navy,
    marginBottom: 4,
  },
  meta: { fontSize: 9, color: C.gray, marginBottom: 1 },

  /* summary grid */
  grid: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: C.fog,
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
  },
  cardLast: { marginRight: 0 },
  cardLabel: {
    fontSize: 8,
    color: C.gray,
    marginBottom: 3,
    textTransform: "uppercase" as const,
  },
  cardValue: { fontFamily: "Helvetica-Bold", fontSize: 13, color: C.navy },

  /* confidence badge */
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  badgeText: { fontFamily: "Helvetica-Bold", fontSize: 11 },

  /* section */
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: C.navy,
    marginBottom: 6,
    marginTop: 16,
  },
  paragraph: { fontSize: 10, lineHeight: 1.5, color: C.gray, marginBottom: 4 },

  /* bullet list */
  bulletRow: { flexDirection: "row", marginBottom: 3, paddingLeft: 4 },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.green,
    marginTop: 3,
    marginRight: 6,
  },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 1.5, color: C.gray },

  /* amber callout */
  callout: {
    backgroundColor: C.amberBg,
    borderWidth: 1,
    borderColor: C.amberBorder,
    borderRadius: 6,
    padding: 10,
    marginTop: 16,
  },
  calloutHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#92400E",
    marginBottom: 4,
  },
  calloutBody: { fontSize: 10, color: "#92400E", lineHeight: 1.4 },

  /* footer */
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 8,
  },
  footerDisclaimer: { fontSize: 7, color: C.gray, maxWidth: "70%" },
  footerRight: { alignItems: "flex-end" },
  footerUrl: { fontSize: 8, color: C.green, marginBottom: 2 },
  footerPage: { fontSize: 7, color: C.gray },
});

/* ── Helpers ──────────────────────────────────────────── */
function formatPrice(low: number, high: number) {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  return `${fmt(low)} – ${fmt(high)}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Bullet list ──────────────────────────────────────── */
function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, i) => (
        <View key={i} style={s.bulletRow} wrap={false}>
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
  logoUrl: string;
}

function QuotePdfDocument({ quote, logoUrl }: QuotePdfDocumentProps) {
  const scopeParagraphs = quote.scope_summary.split("\n").filter(Boolean);
  const confColor = CONFIDENCE_COLOR[quote.confidence_level];

  return (
    <Document
      title={`Green Irony Quote – ${quote.customer_name}`}
      author="Green Irony"
    >
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.headerRow}>
          <Image src={logoUrl} style={s.logo} />
          <View style={s.headerRight}>
            <Text style={s.title}>Quote Estimate</Text>
            <Text style={s.meta}>{quote.customer_name}</Text>
            <Text style={s.meta}>ID: {quote.quote_id}</Text>
            <Text style={s.meta}>{formatDate(quote.created_at)}</Text>
          </View>
        </View>

        {/* Quote Summary Grid */}
        <View style={s.grid}>
          <View style={s.card}>
            <Text style={s.cardLabel}>Price Range</Text>
            <Text style={s.cardValue}>
              {formatPrice(quote.price_low, quote.price_high)}
            </Text>
          </View>
          <View style={s.card}>
            <Text style={s.cardLabel}>Offering Tier</Text>
            <Text style={s.cardValue}>{quote.offering_tier}</Text>
          </View>
          <View style={s.card}>
            <Text style={s.cardLabel}>Timeline</Text>
            <Text style={s.cardValue}>~{quote.timeline_weeks} weeks</Text>
          </View>
          <View style={[s.card, s.cardLast]}>
            <Text style={s.cardLabel}>Confidence</Text>
            <View style={[s.badge, { backgroundColor: `${confColor}18` }]}>
              <Text style={[s.badgeText, { color: confColor }]}>
                {quote.confidence_level}
              </Text>
            </View>
          </View>
        </View>

        {/* Scope Summary */}
        <Text style={s.sectionTitle}>Scope Summary</Text>
        {scopeParagraphs.map((para, i) => (
          <Text key={i} style={s.paragraph}>
            {para}
          </Text>
        ))}

        {/* Bulleted Sections */}
        {[
          { heading: "Integration Use Cases", items: quote.key_use_cases },
          { heading: "Assumptions", items: quote.assumptions },
          { heading: "Not Included", items: quote.not_included },
        ].map((section) => (
          <View key={section.heading} wrap={false}>
            <Text style={s.sectionTitle}>{section.heading}</Text>
            <BulletList items={section.items} />
          </View>
        ))}

        {/* Recommended Next Steps */}
        <Text style={s.sectionTitle}>Recommended Next Steps</Text>
        <Text style={s.paragraph}>{quote.recommended_next_steps}</Text>

        {/* Additional Services */}
        {quote.additional_services && (
          <View style={s.callout} wrap={false}>
            <Text style={s.calloutHeading}>
              Additional Services Identified
            </Text>
            <Text style={s.calloutBody}>{quote.additional_services}</Text>
            <Text style={[s.calloutBody, { marginTop: 4 }]}>
              Contact your Green Irony AE to discuss these services.
            </Text>
          </View>
        )}

        {/* Footer (fixed to bottom of every page) */}
        <View style={s.footer} fixed>
          <Text style={s.footerDisclaimer}>
            This quote was generated by Green Irony&apos;s AI-powered quoting
            engine. For a detailed, customer-ready SOW, connect with your Green
            Irony AE.
          </Text>
          <View style={s.footerRight}>
            <Text style={s.footerUrl}>greenirony.com</Text>
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
  const logoUrl = `${window.location.origin}/logos/green-irony/green-logo-long.png`;

  const blob = await pdf(
    <QuotePdfDocument quote={quote} logoUrl={logoUrl} />,
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
