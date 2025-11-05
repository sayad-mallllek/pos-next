# POS Next.js

A modern, responsive Point of Sale (POS) system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🛒 **Cart Management**: Add, remove, and update items with real-time calculations
- 🔍 **Product Search**: Typeahead search with barcode scanning support
- 💳 **Multiple Payment Methods**: Cash, card, and gift card payments
- 🎫 **Discounts**: Item-level and cart-level percentage/fixed discounts
- 👥 **Customer Management**: Attach customers and track loyalty points
- 🧾 **Receipt Generation**: Print-friendly receipts with detailed breakdown
- 🔄 **Return Mode**: Handle returns and exchanges
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💾 **Offline Support**: State persists with localStorage
- ♿ **Accessibility**: Full keyboard navigation support

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Try the register**:
   Click "Open Register" to start using the POS system

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests in watch mode
- `npm run test:run` - Run unit tests once
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

### Testing

**Unit Tests**:
```bash
npm run test:run
```

**E2E Tests**:
```bash
npm run test:e2e
```

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── register/           # Main register page
│   └── register/receipt/  # Receipt preview
├── components/             # React components
│   ├── ui/               # Reusable UI components
│   ├── cart.tsx           # Main cart component
│   ├── product-search.tsx # Product search
│   ├── barcode-input.tsx   # Barcode scanner
│   └── ...
├── store/                 # Zustand state management
│   └── cart.ts           # Cart store with persistence
├── services/              # API services (mock)
│   └── productService.ts
└── lib/                  # Utility functions
    └── utils.ts
```

## Usage

### Basic Sale Flow

1. **Add Products**: Search or scan products to add to cart
2. **Adjust Cart**: Modify quantities, add notes, or apply discounts
3. **Add Customer**: (Optional) Select or create a customer
4. **Process Payment**: Choose payment method and enter amount
5. **Print Receipt**: Preview and print the receipt

### Barcode Scanning

- **Hardware Scanner**: Connect a barcode scanner and scan products
- **Manual Entry**: Type SKUs or barcodes manually
- **Keyboard Detection**: Automatic detection of rapid key sequences

### Return Mode

Toggle between Sale and Return modes to handle:
- Product returns with refunds
- Exchanges with price adjustments
- Negative totals for refunds

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Build Tool**: Turbopack

## Mock Data

The system uses mock data for demonstration:
- 8 sample products with various categories
- 3 sample customers with loyalty points
- All barcode numbers work (e.g., 1234567890123)

## TODOs

- [ ] Replace mock services with real API calls
- [ ] Add printer integration
- [ ] Implement user authentication
- [ ] Add sales reporting
- [ ] Add inventory management
- [ ] Add tax configuration
- [ ] Add multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

MIT License - feel free to use this project for your own POS needs!