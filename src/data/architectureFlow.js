export const architectureFlow = [
  {
    id: 'frontend',
    label: 'Frontend',
    short: 'Workflow-first interface',
    recruiterValue: 'Turns complex cloud workflows into usable product experiences.',
    engineerDetail:
      'Start with the user workflow, then shape React or Angular components around state boundaries, loading states, validation, accessibility, and motion that clarifies hierarchy.',
    tools: ['React', 'Angular', 'Tailwind CSS', 'Framer Motion'],
    decisions: ['Component ownership', 'State boundary', 'Error/loading UX', 'Accessibility'],
    risk: 'Avoid building UI screens that hide backend or operational complexity until too late.',
  },
  {
    id: 'api',
    label: 'API',
    short: 'Contract-driven service layer',
    recruiterValue: 'Creates maintainable product systems that can scale beyond one-off screens.',
    engineerDetail:
      'Define clean request/response contracts, validation boundaries, service responsibilities, and observability points before the frontend depends on unstable behavior.',
    tools: ['Node.js', 'Express', 'TypeScript', 'REST'],
    decisions: ['DTO shape', 'Validation', 'Idempotency', 'Service ownership'],
    risk: 'Avoid unclear service boundaries that make features slow to change later.',
  },
  {
    id: 'auth',
    label: 'Auth',
    short: 'Identity and permission boundary',
    recruiterValue: 'Protects enterprise workflows while keeping user access predictable.',
    engineerDetail:
      'Treat identity, roles, session handling, and permission checks as architecture concerns instead of UI-only conditionals.',
    tools: ['IAM thinking', 'RBAC', 'JWT/session patterns', 'Secure routing'],
    decisions: ['Role model', 'Token/session lifecycle', 'Route guards', 'Auditability'],
    risk: 'Avoid spreading authorization logic across disconnected components.',
  },
  {
    id: 'database',
    label: 'Database',
    short: 'Reliable data and migration path',
    recruiterValue: 'Reduces downtime and operational risk during modernization.',
    engineerDetail:
      'Design schema, access patterns, migration automation, validation checks, and rollback strategy together so data movement is controlled.',
    tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Python automation'],
    decisions: ['Schema shape', 'Indexes', 'Migration validation', 'Rollback plan'],
    risk: 'Avoid migration plans that only prove the happy path.',
  },
  {
    id: 'cloud-runtime',
    label: 'Cloud Runtime',
    short: 'Deployment and operations layer',
    recruiterValue: 'Brings Google Cloud architecture into real delivery, cost, and reliability decisions.',
    engineerDetail:
      'Containerize responsibly, define runtime boundaries, environment strategy, IAM constraints, observability, and deployment safety.',
    tools: ['GCP', 'Docker', 'Kubernetes', 'Cloud Build'],
    decisions: ['Runtime choice', 'IAM', 'Config/secrets', 'Monitoring'],
    risk: 'Avoid cloud designs that are impressive on paper but hard to operate.',
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    short: 'Quality gates and delivery loop',
    recruiterValue: 'Improves team speed without lowering engineering discipline.',
    engineerDetail:
      'Use linting, unit tests, E2E checks, SonarQube, and review habits as a delivery system that catches issues early.',
    tools: ['Git', 'CI/CD', 'Jest', 'Cypress', 'SonarQube'],
    decisions: ['Gate placement', 'Test pyramid', 'Review policy', 'Release safety'],
    risk: 'Avoid process-heavy pipelines that teams bypass because they are too slow or noisy.',
  },
];
