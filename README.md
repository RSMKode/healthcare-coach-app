# Health Coaching Dashboard

This is a challenge about creating a Dashboard application for coaching patients and help them to improve their health.

## Building Steps

### Install dependencies

```bash
npm i
# or
yarn i
# or
pnpm i
# or
bun i
```

### Run the prisma command to migrate the database

```bash
npx prisma migrate deploy --name init
```

### Generate the Prisma client

```bash
npx prisma generate
```

### Seed the database

```bash
npx prisma db seed
```

### Build the project

```bash
npm run build
```

### Run the project

```bash
npm run start
```

## Project Description

### Disclaimer

Despite using Next.js 15, the relevant components for the challenge are client-side. Server actions have only been used to simplify the backend mock and simulate fetching from an external API.

### Features

- Logic:
  - Backend mock with server actions:
    - Data persistence using Prisma SQLite.
  - Data access layer that communicates with the backend mock, intercepts responses, and checks statuses to propagate errors.
  - Adapters to transform backend data into application models.
  - Use case layer for business logic. In this case, since the backend is mocked, the use cases are simple and aligned with the mock's endpoints.
  - Controllers layer through custom hooks and React Query to interact with asynchronous functions, cache results, and invalidate this cache.
- Due to time constraints, not all functionalities were implemented, but here are some suggested improvements:
  - Separate the logic into more files to make it easier to locate the tests. Since this is a small application, I did not find it as necessary.
  - Presenters for each component.
  - JSON files to display static text and, in the future, facilitate the implementation of i18n.
- UI:
  - React Query.
  - React Hook Form for form validation.
  - Zod for schema validation.
  - Tailwind and ShadCN for styling:
    - ShadCN is built on Radix, a headless UI component library that allows full control over component styles.
- Assumptions:
  - There could be a large list of patients:
  - Pagination and search filtering in the backend.
  - Allow searching for patients by name, condition, or age.

## Testing Strategy

1. Unit Testing:

   - Focus on testing individual functions, hooks, and components to ensure they work as expected in isolation.
   - Prioritize utility functions (e.g., handleResponseError in src/lib/error.lib.ts) and hooks (e.g., useGetPatients in src/app/patients/\_ui/\_hooks/use-patients.ts).

2. Integration Testing:

   - Test interactions between components and layers, such as the integration of React Query hooks with the backend mock (e.g., useAddCoachingNote in src/app/patients/\_ui/\_hooks/use-coaching-notes.ts).

3. End-to-End (E2E) Testing:

   - Simulate user flows to ensure the application behaves correctly as a whole. For example, test the patient search and pagination functionality in PatientList.

4. Visual Regression Testing:

   - Use snapshot testing for UI components to detect unintended changes in styles or layouts.

5. Accessibility Testing:
   - Ensure components like Sidebar and DropdownMenu meet accessibility standards.

### Components/Features to Prioritize

1. Critical Features:

   - Patient Management: Test CRUD operations for patients (e.g., PatientList, PatientAddDialog, PatientEditDialog).
   - Coaching Notes: Test the addition, editing, and deletion of coaching notes (e.g., CoachingNoteAddForm, CoachingNoteCardList).

2. Reusable Components:

   - UI Components: Test components like Button, Select, and Tooltip since they are widely used.

3. Backend Mock Integration:

   - Ensure the mock backend (e.g., Prisma SQLite) behaves consistently with expected API responses.

4. Pagination and Search:

   - Test the pagination and search functionality in PatientListPagination and PatientSearch.

### Testing Tools and Libraries

1. Unit and Integration Testing:

   - Jest / Vitest: For testing logic and React components.
   - React Testing Library: For testing React components with a focus on user interactions.

2. End-to-End Testing:

   - Cypress: For simulating user flows and testing the entire application.
   - Playwright: For cross-browser testing and simulating user interactions.

3. Mocking:

   - MSW (Mock Service Worker): For mocking API requests during tests.

4. Visual Regression Testing:

   - Storybook: For isolating and testing UI components.

5. Accessibility Testing:

   - axe-core or jest-axe: For accessibility checks.

### Why This Approach?

- Focus on Critical Features: Prioritizing patient and coaching note management ensures the core functionality is robust.
- Layered Testing: Unit tests catch issues early, while integration and E2E tests ensure the system works as a whole.
