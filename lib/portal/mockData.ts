import type { QuoteResponse, QuoteListItem } from "./types";

export const MOCK_QUOTES: QuoteResponse[] = [
  {
    quote_id: "q-001",
    customer_name: "Acme Corp",
    price_low: 18000,
    price_high: 25000,
    offering_tier: "Growth Integration Package",
    timeline_weeks: "4-5",
    confidence_level: "High",
    scope_summary:
      "This engagement covers a bidirectional integration between Salesforce and your ERP system, enabling real-time data synchronization across sales, order management, and customer service workflows. The solution will be built on MuleSoft's Anypoint Platform using API-led connectivity principles.\n\nThe integration scope includes automated order-to-cash flows, real-time inventory availability checks from within Salesforce, and bidirectional contact/account synchronization. Error handling, retry logic, and operational dashboards are included in the base package.",
    key_use_cases: [
      "Salesforce <> ERP bidirectional account & contact sync",
      "Real-time order status updates pushed to Salesforce",
      "Inventory availability check (Salesforce to ERP, on-demand)",
      "Automated case creation from ERP service events",
    ],
    assumptions: [
      "Client has an active MuleSoft Anypoint Platform license (CloudHub 2.0 or Runtime Fabric)",
      "ERP system exposes RESTful or SOAP APIs for the required data objects",
      "Salesforce edition supports API access (Enterprise or above)",
      "Green Irony will be granted sandbox access within the first week",
    ],
    not_included: [
      "Custom ERP development or modifications to ERP-side APIs",
      "MuleSoft or Salesforce license procurement",
      "Historical data migration or bulk data cleansing",
      "End-user training beyond admin-level knowledge transfer",
    ],
    recommended_next_steps:
      "Schedule a discovery call with a Green Irony Solutions Architect to review your integration requirements in detail. Gather and share ERP API documentation (endpoints, auth, schemas). Identify key stakeholders for a 60-minute requirements workshop.",
    created_at: "2026-02-15T14:30:00Z",
  },
  {
    quote_id: "q-002",
    customer_name: "TechVentures Inc",
    price_low: 35000,
    price_high: 50000,
    offering_tier: "Enterprise Integration Suite",
    timeline_weeks: "8-10",
    confidence_level: "Medium",
    scope_summary:
      "A multi-system integration connecting Salesforce, SAP S/4HANA, and a custom data warehouse. This project involves building an API-led architecture with experience, process, and system API layers to support both real-time and batch data flows.\n\nThe scope includes customer master data management across all three systems, automated invoice reconciliation, and a self-service API portal for internal development teams. Given the complexity of the SAP landscape, a phased rollout is recommended.",
    key_use_cases: [
      "Customer master data sync across Salesforce, SAP, and data warehouse",
      "Automated invoice reconciliation between SAP and Salesforce CPQ",
      "Self-service API portal for internal dev teams",
      "Batch nightly sync for financial reporting data",
    ],
    assumptions: [
      "SAP S/4HANA is accessible via OData or RFC interfaces",
      "MuleSoft Anypoint Platform with API Manager is licensed",
      "Client will provide a dedicated integration architect for the project",
      "Data warehouse has a REST or JDBC-compatible ingestion layer",
    ],
    not_included: [
      "SAP ABAP development or custom BAPIs",
      "Data warehouse schema design or ETL pipeline development",
      "Salesforce CPQ configuration or customization",
      "Performance testing beyond standard integration load tests",
    ],
    recommended_next_steps:
      "Engage Green Irony for a 2-week discovery sprint to map out data flows and integration patterns. Share SAP system landscape documentation and Salesforce org details for initial assessment.",
    additional_services:
      "This engagement may benefit from Salesforce CPQ configuration and SAP consulting services, which fall outside MuleSoft integration scope. Green Irony can coordinate with specialized partners for these workstreams.",
    created_at: "2026-02-10T09:15:00Z",
  },
  {
    quote_id: "q-003",
    customer_name: "Retail Solutions Group",
    price_low: 12000,
    price_high: 18000,
    offering_tier: "Starter Integration Package",
    timeline_weeks: "3-4",
    confidence_level: "High",
    scope_summary:
      "A focused integration between Shopify and Salesforce Service Cloud to unify e-commerce order data with customer service workflows. Orders placed in Shopify will be synced to Salesforce in near-real-time, enabling service agents to view complete order history.\n\nThe integration uses MuleSoft's pre-built Shopify connector and includes webhook-based event processing for order creation, updates, and fulfillment status changes.",
    key_use_cases: [
      "Shopify order sync to Salesforce Service Cloud (near-real-time)",
      "Customer profile unification across Shopify and Salesforce",
      "Fulfillment status updates surfaced in Salesforce cases",
      "Webhook-based event processing for order lifecycle events",
    ],
    assumptions: [
      "Shopify Plus plan with API access enabled",
      "Salesforce Service Cloud with API access (Enterprise edition or above)",
      "MuleSoft CloudHub 2.0 license with at least 0.2 vCores",
      "Standard Shopify data model (no heavily customized checkout)",
    ],
    not_included: [
      "Shopify theme or checkout customization",
      "Salesforce Service Cloud configuration or case routing rules",
      "Historical order migration from legacy systems",
      "Custom reporting dashboards beyond MuleSoft operational monitoring",
    ],
    recommended_next_steps:
      "Share Shopify store admin access and Salesforce sandbox credentials to begin connector configuration. A 30-minute kickoff call will align on field mappings and data transformation requirements.",
    created_at: "2026-02-05T16:45:00Z",
  },
  {
    quote_id: "q-004",
    customer_name: "HealthFirst Partners",
    price_low: 55000,
    price_high: 80000,
    offering_tier: "Enterprise Integration Suite",
    timeline_weeks: "12-16",
    confidence_level: "Low",
    scope_summary:
      "A complex healthcare integration involving HL7 FHIR-compliant data exchange between an EHR system, Salesforce Health Cloud, and multiple third-party payer systems. This project requires HIPAA-compliant data handling, encryption at rest and in transit, and comprehensive audit logging.\n\nDue to the regulatory requirements and the number of external system interfaces, a detailed discovery phase is essential before finalizing scope. The estimate range reflects uncertainty around payer system API maturity and data standardization requirements.",
    key_use_cases: [
      "HL7 FHIR-based patient data exchange between EHR and Salesforce Health Cloud",
      "Payer eligibility verification in real-time",
      "Claims status sync across multiple payer systems",
      "HIPAA-compliant audit logging and data governance",
    ],
    assumptions: [
      "EHR system supports HL7 FHIR R4 APIs",
      "Payer systems have documented API interfaces (varying maturity expected)",
      "Client has a HIPAA compliance framework in place",
      "MuleSoft Anypoint Platform with dedicated VPC for data isolation",
    ],
    not_included: [
      "EHR system configuration or customization",
      "HIPAA compliance consulting or policy development",
      "Salesforce Health Cloud implementation or configuration",
      "Payer contract negotiations or onboarding",
    ],
    recommended_next_steps:
      "A 3-4 week discovery engagement is strongly recommended before committing to the full build. This will clarify payer API capabilities, data mapping requirements, and compliance review needs.",
    additional_services:
      "This project will likely require Salesforce Health Cloud implementation services and HIPAA compliance consulting. These are outside the scope of MuleSoft integration work and should be planned as parallel workstreams.",
    created_at: "2026-01-28T11:00:00Z",
  },
];

export const MOCK_QUOTE_LIST: QuoteListItem[] = MOCK_QUOTES.map((q) => ({
  quote_id: q.quote_id,
  customer_name: q.customer_name,
  price_low: q.price_low,
  price_high: q.price_high,
  confidence_level: q.confidence_level,
  offering_tier: q.offering_tier,
  created_at: q.created_at,
}));
