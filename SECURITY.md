# Security & Setup Guide

## Critical Security Changes

### 1. Admin Credentials (BREAKING CHANGE)
**Before**: Admin credentials were hardcoded in the source code (visible on GitHub)
**After**: Credentials are now stored in environment variables

**Action Required**: Set these environment variables in your deployment:
```
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_password_here
ADMIN_API_TOKEN=unique_api_token_for_admin_access
```

### 2. Protected Admin APIs
The following endpoints now require authentication:

#### `GET /api/orders`
- **Old**: Publicly accessible (anyone could download all orders with emails)
- **New**: Requires `Authorization: Bearer {ADMIN_API_TOKEN}` header

#### `GET /api/debug-telegram`
- **Old**: Publicly accessible (anyone could trigger Telegram notifications)
- **New**: Requires `Authorization: Bearer {ADMIN_API_TOKEN}` header

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in all required values:

```bash
cp .env.example .env.local
# Then edit .env.local with your actual credentials
```

**Required Variables**:
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password (min 6 chars)
- `ADMIN_API_TOKEN` - Bearer token for admin API access (use a strong, random value)

**Optional Variables**:
- `TELEGRAM_BOT_TOKEN` - For order notifications
- `TELEGRAM_CHAT_ID` - Telegram chat ID for notifications

## Shopify-Style UI Improvements

### Cart Integration
- Cart button now opens modal drawer (instead of external link)
- "Add to Cart" buttons added to hero, product showcase, and CTA sections
- Dual CTA approach: primary "Add to Cart" + secondary "View Checkout"
- Better visual feedback with shopping cart icons

### Header Enhancements
- Added announcement bar with key selling points
- Improved cart button styling
- Better mobile menu integration

### Trust Signals
- Removed misleading ISO 9001 badge (you're not certified)
- Removed false "Secured by PayPal" claim (using Stripe)
- Updated to show "Authorized Reseller" status
- Kept 30-Day Money Back Guarantee (real)
- Kept "Instant Delivery" (real)

## Local Development Setup

1. **Install dependencies**:
```bash
pnpm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

3. **Run development server**:
```bash
pnpm dev
```

4. **Access admin**:
- Navigate to `http://localhost:3000/admin/login`
- Use credentials from `ADMIN_EMAIL` and `ADMIN_PASSWORD`

## Cloudflare Deployment

1. **Set environment variables in Cloudflare**:
   - Go to your Cloudflare Pages project
   - Settings → Environment Variables
   - Add all variables from `.env.example`

2. **Deploy**:
```bash
git push origin main
```

The site will auto-deploy on Cloudflare Pages.

## Admin API Usage

### Example: Fetch Orders
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_TOKEN" \
  https://yourdomain.com/api/orders
```

### Example: Test Telegram
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_TOKEN" \
  https://yourdomain.com/api/debug-telegram
```

## Compliance

✅ **Terms Page**: Updated to mention "Authorized Reseller" status
✅ **Privacy Policy**: Covers data collection and usage
✅ **Refund Policy**: Clear 30-day money-back guarantee
✅ **Delivery Policy**: Explains instant digital delivery

All policies accurately reflect your business practices.

## Notes

- Cart state is persisted in browser localStorage as "lightburn-cart"
- Currency is auto-detected based on visitor IP (EUR/USD/GBP)
- All payment processing goes through Stripe (no sensitive data stored locally)
- Admin sessions use sessionStorage (cleared on browser close)

## Questions?

If you have issues with the security setup or need to change credentials:
1. Update environment variables
2. Redeploy the site
3. Existing sessions will be invalidated (users must log back in)
