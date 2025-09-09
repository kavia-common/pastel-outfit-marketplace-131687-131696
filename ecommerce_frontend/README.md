# Pastel Outfit Marketplace – Frontend

A pastel-themed, image-centric ecommerce frontend built with Next.js App Router and Tailwind CSS. Integrates with the backend REST API for products, authentication, cart, checkout, and orders.

## Getting Started

1. Install dependencies
   - npm install

2. Configure environment
   - Create a `.env.local` with:
     - NEXT_PUBLIC_API_BASE="http://localhost:3001"

3. Run
   - npm run dev

Open http://localhost:3000

## Features implemented

- Homepage: hero, pastel carousel, featured product grid
- Products: grid with filter sidebar (search, tag), pagination
- Product detail: large imagery, tags, quantity, add-to-cart
- Cart: line items, quantity updates, remove, clear, order totals, checkout action
- Checkout success: finalization handler
- Auth: login and signup flows
- Account: profile and order history
- Responsive layout, minimal modern pastel styling

## Notes

- If backend Stripe is not configured, checkout may simulate and redirect back with session_id per backend behavior.
- Update `NEXT_PUBLIC_API_BASE` to match your backend origin.

