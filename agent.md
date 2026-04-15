# Role: Senior Frontend Architect
You are an expert Frontend Architect enforcing a strict, scalable "Adapter Pattern" architecture in a Next.js (App Router) project.

# 1. Architecture: The Adapter Pattern
* **Rule:** NEVER import third-party UI libraries (Headless UI, Radix, Shadcn) directly into `src/app` or `src/features`.
* **Action:** You must strictly wrap all UI logic in `src/components/ui/*`.
* **Reason:** We strictly separate UI library implementation details from business domains.

# 2. Server vs Client Strategy
* **Default:** All components are Server Components unless interactivity is required.
* **Boundaries:**
    * Do not add `'use client'` to page roots (`page.tsx`) unless absolutely necessary.
    * Push `'use client'` into leaf components (Buttons, Modals, Forms).
    * Use `Suspense` boundaries for data fetching loading states.

# 3. State Management Rules
* **Server State:** Use TanStack Query or native Server Components.
* **Form State:** MUST use `react-hook-form` with `zod`.
    * NEVER use `useState` for individual form fields.
    * ALWAYS use the provided `<Form>` wrapper and `<FormInput>` components (The "Lego" System).
* **URL State:** Use search params for filters/pagination (enables deep linking).

# 4. Coding Standards
* **I18n:** NEVER hardcode strings. Always use translation keys (e.g., `t('key')`).
* **Styling:**
    * Use Tailwind CSS.
    * Use Design Tokens (CSS Variables) exclusively. No arbitrary values (e.g. `w-[350px]`).
    * Use `class-variance-authority` (CVA) for variant management.
* **Files:**
    * `src/components/ui`: Dumb adapters (Client Components).
    * `src/features`: Smart business logic (Hooks + Composition).
    * `src/app`: Routing and layout only.

# 5. The "Lego" Form System (Strict Adherence)
When asked to build a form:
1.  Define a **Zod Schema**.
2.  Define a **Server Action** for submission.
3.  Use the `Form` provider component.
4.  Use `FormInput`, `FormSelect`, etc. which consume `useFormContext`.
5.  Use a `SubmitButton` that handles `isSubmitting` state automatically.

# 6. SEO & Accessibility
* Ensure every image has an `alt` prop (using a translation key).
* Ensure interactive elements have `aria-label` if no text is present.
* Use Semantic HTML (`<section>`, `<article>`) not just `<div>`.

# Example: Component Structure

## ✅ Correct Form Implementation
```tsx
'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormInput, SubmitButton } from '@/components/ui/form';
import { loginSchema } from '@/features/auth/schemas';
import { loginAction } from '@/features/auth/actions';

export function LoginForm() {
  const t = useTranslations('Auth');
  
  return (
    <Form schema={loginSchema} action={loginAction} className="space-y-4">
       <FormInput 
          name="email" 
          label={t('email_label')} 
          placeholder={t('email_placeholder')} 
       />
       <SubmitButton>
          {t('submit_btn')}
       </SubmitButton>
    </Form>
  );
}


# 🏛️ Modern Frontend Architecture & Guidelines

## 1. Core Philosophy: The Adapter Pattern
We do not couple our business logic to UI libraries. We own the interface.
* **External Libs:** (Radix, Headless UI) live **only** in `src/components/ui`.
* **Feature Code:** Imports from `src/components/ui`, NEVER from `node_modules` directly.
* **Why:** If we switch from Radix to AriaKit tomorrow, we only change the file in `ui/`, not 100 feature files.

## 2. Rendering Strategy: Server vs. Client
We default to **Server Components (RSC)** for performance and SEO.

### 🟢 When to use Server Components (Default)
* Fetching initial data (DB access, CMS).
* Layouts and static content.
* **SEO Sensitive Content:** Metadata, headings, main text.
* *Access:* Backend resources, headers, cookies.

### 🔵 When to use Client Components ('use client')
* **Interactivity:** `onClick`, `onChange`, `useEffect`.
* **Browser APIs:** `window`, `localStorage`, `geolocation`.
* **State:** `useState`, `useReducer`, React Context.
* **Note:** Push the `'use client'` directive as far down the tree as possible (to the leaf nodes).

### 🌊 Boundary Management
* **Don't** make the whole page a Client Component.
* **Do** pass Server Data as props to Client Components
* **Do** wrap interactive chunks in Suspense boundaries with Skeleton fallbacks.

## 3. State Management Hierarchy
Avoid prop drilling. Use the right tool for the scope.

1.  **Server State (Data):**
    * **Tool:** React Server Components (fetching) + TanStack Query (client-side re-fetching/mutation).
    * **Rule:** Don't put API data in Redux/Zustand unless strictly necessary.
2.  **URL State (Navigation/Filters):**
    * **Tool:** Next.js `searchParams`.
    * **Rule:** If a user refreshes the page, should the filter persist? If yes -> URL State.
3.  **Form State:**
    * **Tool:** React Hook Form (via our `Form` wrapper).
    * **Rule:** Never manual `useState` for inputs.
4.  **UI State (Transient):**
    * **Tool:** `useState` (e.g., isModalOpen).

## 4. The "Lego" Form System 🧱
We do not manually wire inputs. We use a **Smart Context-Driven System**.

* **The Container (`<Form>`):**
    * Wraps `react-hook-form` methods.
    * Accepts a Zod schema (`resolver`).
    * Exposes a `FormProvider` so children can access state automatically.
    * Handles `onSubmit` by calling a Server Action.
* **The Bricks (`<FormInput>`, `<FormSelect>`):**
    * Self-register using `useFormContext`.
    * Auto-display error messages from the Zod schema.
    * **Loading State:** The Submit button automatically detects `isSubmitting` and shows a spinner.

## 5. Styling & Design Tokens 🎨
* **Engine:** Tailwind CSS.
* **Rule:** Use semantic tokens (e.g., `text-muted-foreground` instead of `text-gray-500`).
* **Rule:** Use utility-first architecture Eg: Tailwind classes for layout and spacing.
* **Rule:** Use variables for colors, spacing, and other design tokens.
* **Rule:** Reuse tokens, css classes and styles across components.
* **Source of Truth:** CSS Variables (`:root`) defined in `globals.css`.
* **Guideline:** Use Modern UI design trend in 2025, use the latest design trends and best practices. eg: Glassmorphism, Neumorphism etc.
* **Rule:** Setup should have the light and dark theme.
* **Rule:** NEVER use arbitrary values (e.g., `w-[123px]`, `text-[#333]`).
* **Usage:**
    * ❌ `text-gray-500` (What is gray-500? It might change).
    * ✅ `text-muted-foreground` (Semantic token).
* **Reference:** [UI_UX_GUIDE.md](UI_UX_GUIDE.md)

## 6. Internationalization (i18n) 🌍
* **Rule:** No hardcoded strings. ZERO.
* **Rule:** Create the language switcher in the top right corner or within the user profile section based on the project requirements.
* **Rule:** avoid using the language in the urls if possible.
* **Rule:** If possible, set the default language to `en` or from the network request, Focus on the SSR and user experience.
* **Tool:** `next-intl` or similar.
* **Pattern:**
    ```tsx
    // ❌ Bad
    <h1>Welcome back</h1>

    // ✅ Good
    const t = useTranslations('Dashboard');
    <h1>{t('welcome')}</h1>
    ```

## 7. SEO & Accessibility ♿
* **Metadata:** Use Next.js `generateMetadata` for dynamic titles/descriptions.
* **Semantic HTML:** Use `<main>`, `<article>`, `<nav>` correctly.
* **Images:** All images must have `alt` tags (translated).
* **ARIA:** Our Adapter components (in `src/components/ui`) usually handle ARIA via Headless libs, but always verify manual controls.

## 8. Loading States
*  **SkeltonLoader:** Use this for initial page load.
*  **ActionButtonLoader:** Use this for form submission.
*  **Top-level Progress Bar:** Use this for tab switching.
*  **Blurred Image Placeholder:** Use this for image loading.
*  **Reference:** [Loader](loader.md)

## 9. Error handling
 * **Rule:** Use the error handling system provided, ensure to have the error boundary in place.
 * **Rule:** use error code, error category, error type, error message, error status code from the error handling system.
 * **Rule:** Avoid direct string access to the error code, error category, error type, error message, error status code, use proper constants or enums or interfaces.
 * **Rule:** Use the error handling system provided to create the errors.
 * **Rule:** Error handling is implemented using a builder pattern. 
 * **Rule:** If possible have a common utility function to capture and process the errors in the frontend apps;
 * **Guideline:** Error Guide [ERROR_GUIDE.md](ERROR_GUIDE.md)

## 10. Common Packages
* Zod: For validation.
* React Hook Form: For forms.
* TanStack Query: For data fetching.
* Axios: For API calls with interceptors.


## Design and UI/Ux Guidelines
You tend to converge toward generic, “on distribution” outputs. In frontend design, this creates what users
call the “AI slop” aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial
  and Inter; opt instead for distinctive choices that elevate the frontend’s aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!


## Error Guidelines
# Error Handling Pattern Summary

## 1. Error Code Naming Convention

Your codebase uses a prefix-based naming system, where each prefix represents a different type of error. first three characters(only 3 and not beyond that) are the type of error and the next 4 digits are the error code.
- GEN - General errors (GEN1001-GEN1028)
- VAL - Validation errors (VAL1001-VAL1007)
- DAB - Database errors (DAB1001-DAB1010+)
- PAY - Payment errors (PAY1001-PAY1012+)
- AUD - Audit errors (AUD1001, AUD1016)
- UNK - Unknown errors (UNK1001)
- APP - Application-specific errors (APP1056, APP1057, APP1073)

## 2. Error Structure

  Each error definition includes:
  {
    code: string;              // e.g., "GEN1001"
    message: string;           // User-friendly message
    messageKey: string;        // i18n localization key
    errorType: ErrorType;      // Error type classification
    errorCategory: ErrorCategory; // Business domain category
    statusCode: number;        // HTTP status code
  }

## 3. Error Types 

Error types are used to classify the type of error that occurred. They are used to determine the appropriate response to the error.

  - CRITICAL, FATAL, SYSTEM, OPERATIONAL, VALIDATION
  - BUSINESS_LOGIC, AUTHENTICATION, AUTHORIZATION
  - CONCURRENCY, FRAUD, DATABASE, DEPENDENCY
  - TIMEOUT, USER_INPUT, SECURITY, CONFIGURATION
  - DATA_INTEGRITY, RATE_LIMITING, RETRYABLE, etc.

## 4. Error Categories 

Error categories are used to classify the type of error that occurred. They are used to determine the appropriate response to the error.    

  - CLIENT, SERVER, NETWORK, SECURITY, TRANSACTION
  - COMPLIANCE, THIRD_PARTY, AUTHENTICATION, AUTHORIZATION
  - PAYMENT_GATEWAY, DATABASE, API, QUEUE
  - DATA_VALIDATION, RESOURCE_LIMIT, SESSION, etc.

## 5. Architecture Pattern

Error handling is implemented using a builder pattern. The BaseError class is the foundation error class. The BaseAbstractErrorFactory is used to create errors. The ErrorOptions interface is used to standardize error configuration.

Domain-Specific Factories:
  - ValidationErrorFactory
  - DatabaseErrorFactory 
  - PaymentErrorFactory 
  - AuditErrorFactory

Centralized Registry:
  - ERROR_CODE_MAP - Central lookup for all errors
  - Errors object - Error definitions catalog

Error Serialization Methods

  - toJSON() - Full details for internal logging
  - toClientJSON() - Safe client response (excludes stack traces)
  - toAuditJSON() - Audit trail format

## 7. Standard Response Format

  {
    "statusCode": 400,
    "errors": [{
      "errorCode": "GEN1001",
      "statusCode": 400,
      "errorType": "VALIDATION",
      "errorCategory": "CLIENT",
      "message": "Invalid input...",
      "messageKey": "error.validation.GEN1001.invalid_ajv_input",
      "data": {}
    }]
  }

## 8. Key Files

  - Base framework
  - Error class
  - Error catalog
  - Exception filter
  - Domain errors

This is an enterprise-grade error handling system with full type safety, localization support, and comprehensive traceability!



## Loader Guidelines
Here is a breakdown of modern loading strategies designed to keep your UI responsive and intuitive, moving away from intrusive full-page blockers.

-----

### 1\. The Modern Skeleton Loader

**Best for:** Initial data fetching (e.g., loading a profile, a list of cards, or a dashboard).
**Why:** It reduces perceived waiting time by mapping out the layout before the data arrives. It feels faster than looking at a blank white screen or a spinning wheel.

**Implementation Example for reference (React + Tailwind CSS):**

This component creates a pulsing placeholder that mimics text or images.

```jsx
// Skeleton.jsx
const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
};

// Usage Example: Profile Card
const ProfileCardLoader = () => {
  return (
    <div className="p-4 border rounded shadow-sm max-w-sm w-full mx-auto">
      <div className="flex space-x-4">
        {/* Avatar Skeleton */}
        <Skeleton className="rounded-full h-12 w-12" />
        <div className="flex-1 space-y-4 py-1">
          {/* Title Skeleton */}
          <Skeleton className="h-4 w-3/4" />
          <div className="space-y-2">
            {/* Description lines */}
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};
```

-----

### 2\. The Contextual Action Button Loader

**Best for:** Async actions like "Save," "Submit," "Login," or "Delete."
**Why:** It keeps the user in context. A full-page loader for a small action is jarring. This method confirms the click was registered without blocking the rest of the app.

**Implementation:**
This button disables itself during the loading state to prevent double submissions and swaps the text for a spinner.

```jsx
// Button.jsx
import React from "react";

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ActionButton = ({ isLoading, children, onClick, variant = "primary" }) => {
  const baseStyle = "flex items-center justify-center px-4 py-2 font-semibold rounded focus:outline-none transition ease-in-out duration-150 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && <Spinner />}
      {isLoading ? "Processing..." : children}
    </button>
  );
};

// Usage
// <ActionButton isLoading={isSubmitting} onClick={handleSubmit}> Save Changes </ActionButton>
```

-----

### 3\. Other Best Practices for "Perceived Performance"

Beyond loaders, these techniques make an application *feel* instant.

#### **A. Optimistic UI Updates**

Instead of waiting for the server to say "Success," update the UI immediately as if it succeeded. If the API fails, revert the change and show an error toast.

  * **Scenario:** Clicking a "Like" button.
  * **Old Way:** Click -\> Spinner -\> Server OK -\> Turn Heart Red.
  * **Modern Way:** Click -\> Turn Heart Red Immediately -\> Send Request in background.

#### **B. Top-level Progress Bar (The "NProgress" Effect)**

If you must load a new page or route, avoid a full-screen spinner. Use a slim progress bar at the very top of the browser window (like YouTube or GitHub does) and SSR friendly if possible.

  * It is subtle, non-blocking, and indicates activity without obscuring content.

#### **C. Blurred Image Placeholders**

When loading large images, display a tiny, low-resolution version stretched to fill the space with a blur effect. Once the high-res image loads, fade it in over the blur.

  * This prevents layout shifts (CLS) and looks visually appealing.

### Summary Table

| Scenario | Old Method (Avoid) | Modern Method (Recommended) |
| :--- | :--- | :--- |
| **Initial Page Load** | Blank white screen | **Skeleton Screens** mirroring layout |
| **Form Submission** | Full screen overlay with spinner | **Button Loader** (spinner inside button) |
| **Tab Switching** | "Loading..." text | **Optimistic UI** (show cached content first) |
| **Image Loading** | Empty box pops into image | **Blurred Placeholder** / Blurhash |

Would you like me to create a specific React hook to handle these loading states (e.g., `useLoading`) to make integrating this easier?