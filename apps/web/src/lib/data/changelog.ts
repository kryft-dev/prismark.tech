export const changelog = [
  {
    version: 'v2.4.0',
    date: 'Sep 28, 2026',
    title: 'Double-entry ledger',
    description:
      "We've completely rewritten our financial backend. Every transaction now creates balanced debits and credits automatically, giving your accountant the rigor they expect while keeping the interface simple for your team.",
    type: 'new' as const,
  },
  {
    version: 'v2.3.2',
    date: 'Sep 15, 2026',
    title: 'GitHub sync for tasks',
    description:
      'Engineering agencies can now link tasks directly to GitHub PRs. When a PR is merged, the associated task is automatically marked complete and the client is notified via the portal.',
    type: 'new' as const,
  },
  {
    version: 'v2.3.1',
    date: 'Sep 04, 2026',
    title: 'Improved document signing flow',
    description:
      "We've streamlined the document signing process. You can now request signatures from multiple stakeholders in a specific order, and we've added a new dashboard to track pending signatures.",
    type: 'improved' as const,
  },
  {
    version: 'v2.3.0',
    date: 'Aug 29, 2026',
    title: 'Client portal document signing',
    description:
      'Clients can now sign SOWs and contracts directly inside their portal without creating a separate login. All signed documents are automatically archived in the project folder.',
    type: 'new' as const,
  },
  {
    version: 'v2.2.5',
    date: 'Aug 18, 2026',
    title: 'Faster task board rendering',
    description:
      "We've optimized the Kanban board to handle projects with 1000+ tasks without dropping frames. Drag and drop is now buttery smooth regardless of project size.",
    type: 'improved' as const,
  },
  {
    version: 'v2.2.4',
    date: 'Aug 12, 2026',
    title: 'Fix invoice PDF generation',
    description:
      'Resolved an issue where some multi-page invoices would cut off line items at the page break. PDFs now paginate perfectly every time.',
    type: 'fixed' as const,
  },
  {
    version: 'v2.2.3',
    date: 'Aug 02, 2026',
    title: 'Customizable invoice prefixes',
    description:
      'You can now set custom prefixes for your invoice numbers (e.g., INV-2026-001 or ACME-001) to match your existing accounting practices.',
    type: 'improved' as const,
  },
]

export const changelogEntries = changelog
