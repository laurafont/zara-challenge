# Zara – Product Catalogue

A mobile-first ecommerce product catalogue built with **Next.js 16 App Router**, **React 19**, and **TypeScript**. Browse products, filter by search, view product detail pages, and manage a persistent shopping cart.

**[Live demo →](https://zara-challenge-red.vercel.app/)**

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the products REST API | Yes |
| `NEXT_PUBLIC_API_KEY` | Value sent as the `x-api-key` header on every request | Yes |

> **Note:** Both variables are prefixed with `NEXT_PUBLIC_` because product fetching happens on both the server (SSR/ISR) and the client (live search). Never commit real keys to the repository.

### 3. Run

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Serve production build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm test` | Run Jest unit and integration tests |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:e2e` | Run Playwright end-to-end tests (requires built server) |
| `npm run test:e2e:ui` | Playwright with interactive UI |

---

## Project Structure

```
app/                    # Next.js App Router pages and layouts
  layout.tsx            # Root layout: global metadata, providers, header
  page.tsx              # Home — product listing (ISR)
  loading.tsx           # Home loading skeleton
  product/[id]/
    page.tsx            # Product detail (ISR + generateStaticParams)
    loading.tsx         # Product detail skeleton
  cart/
    page.tsx            # Cart page (client shell)
  not-found.tsx         # 404 page

api/                    # Data fetching layer
  config.ts             # Reads env vars; throws at startup if missing
  client.ts             # Central fetch wrapper (injects x-api-key, ISR revalidate)
  fetchProducts.ts      # GET /products (with optional search query)
  getProduct.ts         # GET /products/:id

types/                  # Shared TypeScript interfaces
  product.ts            # BaseProductProps, ProductProps, ProductDetailProps, etc.
  cart.ts               # CartItem

constants/
  routes.ts             # ROUTES object + productPath() helper

context/
  CartContext.tsx        # Cart state (useReducer), CartProvider, useCart hook
  cartStorage.ts        # localStorage read/write helpers
  providers.tsx         # Composes all React providers

hooks/
  useProductList.ts     # React Query hook for product list + live search
  useDebounce.ts        # Generic debounce hook

components/
  UI/                   # Design system primitives
    Button/             # Button (default | outline | text variants), supports href
    Typography/         # Heading, Text
    Container/          # Layout width constraint
    Icons/              # SVG icon components (CartIcon, CartIconFilled, HomeIcon, ArrowLeftIcon)
    Input/              # Base input
    Checkbox/           # Styled checkbox (used for colour swatches)
    Carousel/           # Horizontal scroll carousel
  Header/               # Site header (Server Component)
  CartIcon/             # Client component: cart link + item count badge
  SearchBar/            # Controlled search input with result count
  ProductListing/       # ProductCard, ProductList, ProductsSection
  ProductDetail/        # ProductItem, ProductOptions, ProductItemSpecs
  SimilarItems/         # Similar products carousel (Server Component)
  Cart/                 # Cart, CartItems, CartFooter

styles/
  _variables.scss       # Design tokens (colours, spacing, typography, breakpoints)
  globals.scss          # CSS reset and base styles

utils/
  formatPrice.ts        # Formats a number as "1199 EUR"

e2e/                    # Playwright end-to-end tests
```

---

## Architecture

### Rendering strategy

| Route | Strategy | Why |
|---|---|---|
| `/` | ISR (`revalidate: 3600`) | Product catalogue changes infrequently; static HTML is served instantly |
| `/product/[id]` | ISR + `generateStaticParams` | All known product pages pre-built at build time; unknown IDs rendered on-demand and cached |
| `/cart` | Client-only shell | Cart state is local (localStorage); no server data needed |

### Data flow

1. **Server** fetches product data during build or on the first cache-miss request via `getProduct` / `fetchProducts`, both of which call `apiRequest` in `api/client.ts`.
2. The fetched data is passed as props to client components (`ProductsSection`, `ProductItem`).
3. **React Query** on the client receives this data as `initialData` with `initialDataUpdatedAt: Date.now()` and `staleTime: 3600 * 1000`, so no redundant background re-fetch fires on hydration.
4. For **live search**, React Query fires client-side fetches as the user types, debounced at 300 ms, with `keepPreviousData` to avoid blank states between queries.
5. The `x-api-key` header is injected centrally in `api/client.ts`; no individual fetch call manages auth.

### Cart state

- Managed with `useReducer` in `CartContext`.
- Persisted to `localStorage` via a `useEffect` on every state change.
- Hydrated from `localStorage` after mount via a `useEffect` — server and client start with the same empty state to avoid hydration mismatches.
- Items are identified by a UUID assigned at dispatch time; removal is always by `id` (never by index).

---

## Features

- **Product listing** with live client-side search (debounced, `keepPreviousData`)
- **Product detail** with colour and storage variant selection
- **Add to cart** with navigation to cart on confirmation
- **Persistent cart** survives page refresh via localStorage
- **Cart page** with per-item removal, running total, and a fixed mobile footer
- **ISR** for both listing and detail pages — fast TTFB without stale data
- **Skeleton loading states** (`loading.tsx`) for both routes
- **Per-product Open Graph and Twitter metadata** generated server-side
- **Responsive layout** — mobile-first SCSS with breakpoints from design tokens
- **Accessible markup** — semantic HTML, ARIA labels, `role` attributes, keyboard-navigable

---

## Design Principles

### Clean code

- **Single responsibility** — each file does one thing: `api/client.ts` handles auth headers, `api/fetchProducts.ts` handles the products endpoint, `CartContext.tsx` owns cart business logic.
- **No magic strings** — all route paths come from `constants/routes.ts`; all design values come from `styles/_variables.scss`.
- **Typed throughout** — TypeScript strict mode; shared interfaces in `types/`; no `any`.
- **Defensive API layer** — `fetchProducts` and `getProduct` validate the response shape and throw typed errors rather than silently returning wrong data.
- **Dead code eliminated** — no unused types, constants, or CSS files.

### Architecture

- **Server Components by default** — `Header`, `SimilarItems`, all page components are Server Components. `"use client"` is only added where interactivity genuinely requires it (`CartIcon`, `ProductsSection`, `ProductItem`, `Cart`).
- **Prop drilling minimised** — shared state lives in `CartContext`; data is passed down only one level from page → section component.
- **Stable identifiers** — cart items get a UUID at creation; the reducer only exposes id-based removal, eliminating index-based fragility.
- **Consistent error handling** — API functions throw on non-ok responses with the server's message; the `config.ts` module throws at startup if required env vars are missing.

### Performance

- **No redundant re-fetches** — React Query's `staleTime` and `initialDataUpdatedAt` prevent background re-fetches when the server has just provided fresh data.
- **ISR cache alignment** — `next: { revalidate: 3600 }` on the fetch matches the page-level `revalidate`, so both caching layers expire together.
- **Next.js fetch deduplication** — `generateMetadata` and `ProductPage` both call `getProduct` for the same ID in the same render pass; Next.js deduplicates them to one HTTP request.
- **`priority` image** on product detail above the fold — avoids LCP penalty.

### Testing

- **Unit tests** — pure functions (`formatPrice`, `useDebounce`, API functions) tested in isolation with Jest.
- **Integration tests** — key user flows (add to cart, search, cart removal) tested with React Testing Library against real providers and reducers, not mocks.
- **Accessibility tests** — `jest-axe` runs on rendered components to catch ARIA and contrast violations.
- **End-to-end tests** — Playwright covers the full add-to-cart happy path in Chromium.

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | SCSS Modules + design tokens |
| Server state | Native `fetch` with Next.js ISR cache |
| Client state | TanStack React Query v5 |
| Cart state | React `useReducer` + `localStorage` |
| Testing (unit/integration) | Jest 30 + React Testing Library + jest-axe |
| Testing (e2e) | Playwright |
| Compiler optimisation | React Compiler (`babel-plugin-react-compiler`) |
| Formatting | Prettier |
| Linting | ESLint (Next.js config) |
