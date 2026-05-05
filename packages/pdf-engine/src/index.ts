export type PdfDocConfig = { id: string; title: string; templatePath: string };
export const tenantRentalPdfDocuments: PdfDocConfig[] = [
  { id: "lease-agreement", title: "Lease Agreement", templatePath: "templates/lease-agreement.hbs" },
  { id: "payment-receipt", title: "Payment Receipt", templatePath: "templates/payment-receipt.hbs" }
];
