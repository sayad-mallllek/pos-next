import { test, expect } from '@playwright/test'

test.describe('Register E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('complete sale flow: add product -> apply discount -> payment -> receipt', async ({ page }) => {
    // Step 1: Add product to cart
    await page.fill('input[placeholder="Search products..."]', 'T-Shirt')
    await page.waitForSelector('text=Classic White T-Shirt')
    await page.click('text=Classic White T-Shirt')
    
    // Verify product added to cart
    await expect(page.locator('text=Classic White T-Shirt')).toBeVisible()
    await expect(page.locator('text=$19.99')).toBeVisible()
    
    // Step 2: Add quantity
    await page.click('button:has-text("+")')
    await expect(page.locator('text=2')).toBeVisible() // Quantity should be 2
    
    // Step 3: Add item discount
    await page.click('text=Add Discount')
    await page.click('button:has-text("Percentage")')
    await page.fill('input[placeholder="10"]', '10')
    await page.click('text=Add Discount')
    
    // Verify discount applied
    await expect(page.locator('text=10% off')).toBeVisible()
    
    // Step 4: Add customer
    await page.click('text=Add Customer')
    await page.fill('input[placeholder="Search customers..."]', 'John')
    await page.click('text=John Doe')
    
    // Verify customer added
    await expect(page.locator('text=John Doe')).toBeVisible()
    
    // Step 5: Add cart discount
    await page.click('text=Add Discount')
    await page.fill('input[placeholder="10"]', '5')
    await page.click('text=Add Discount')
    
    // Step 6: Add payment
    await page.fill('input[placeholder="0.00"]', '40')
    await page.click('text=Add')
    
    // Verify payment added
    await expect(page.locator('text=Cash')).toBeVisible()
    await expect(page.locator('text=$40.00')).toBeVisible()
    
    // Step 7: Preview receipt
    await page.click('text=Preview')
    
    // Verify receipt preview
    await expect(page.locator('text=Receipt Preview')).toBeVisible()
    await expect(page.locator('text=Classic White T-Shirt')).toBeVisible()
    await expect(page.locator('text=John Doe')).toBeVisible()
    await expect(page.locator('text=$40.00')).toBeVisible()
    
    // Step 8: Print receipt (mock)
    await page.click('button:has-text("Print")')
    
    // Should return to register
    await expect(page.locator('text=Point of Sale')).toBeVisible()
  })

  test('barcode scanning flow', async ({ page }) => {
    // Click barcode scanner button
    await page.click('button[title="Start barcode scanning"]')
    
    // Verify barcode overlay appears
    await expect(page.locator('text=Scanning Barcode')).toBeVisible()
    await expect(page.locator('text=Ready to scan')).toBeVisible()
    
    // Simulate manual barcode entry
    await page.fill('input[placeholder="Enter barcode manually..."]', '1234567890123')
    await page.press('input[placeholder="Enter barcode manually..."]', 'Enter')
    
    // Should close overlay and add product
    await expect(page.locator('text=Scanning Barcode')).not.toBeVisible()
    await expect(page.locator('text=Classic White T-Shirt')).toBeVisible()
  })

  test('return mode functionality', async ({ page }) => {
    // Add a product first
    await page.fill('input[placeholder="Search products..."]', 'Coffee')
    await page.click('text=Coffee Mug')
    
    // Switch to return mode
    await page.click('button:has-text("Sale Mode")')
    
    // Verify return mode is active
    await expect(page.locator('text=Return Mode')).toBeVisible()
    
    // Add another product (should be negative quantity)
    await page.fill('input[placeholder="Search products..."]', 'Notebook')
    await page.click('text=Notebook Set')
    
    // Verify negative total display
    await expect(page.locator('text=-$')).toBeVisible()
  })

  test('cart management operations', async ({ page }) => {
    // Add multiple products
    await page.fill('input[placeholder="Search products..."]', 'T-Shirt')
    await page.click('text=Classic White T-Shirt')
    
    await page.fill('input[placeholder="Search products..."]', 'Coffee')
    await page.click('text=Coffee Mug')
    
    // Verify both products in cart
    await expect(page.locator('text=Classic White T-Shirt')).toBeVisible()
    await expect(page.locator('text=Coffee Mug')).toBeVisible()
    
    // Update quantity
    await page.locator('button:has-text("+")').first().click()
    await expect(page.locator('text=2')).toBeVisible()
    
    // Add notes
    await page.click('text=Notes')
    await page.fill('textarea', 'Gift wrap please')
    await page.click('text=Save Notes')
    
    // Remove item
    await page.click('button:has-text("×")').first()
    await expect(page.locator('text=Coffee Mug')).not.toBeVisible()
    await expect(page.locator('text=Classic White T-Shirt')).toBeVisible()
    
    // Clear cart
    await page.click('text=Clear Cart')
    await expect(page.locator('text=Cart is empty')).toBeVisible()
  })

  test('customer selection and creation', async ({ page }) => {
    // Click add customer
    await page.click('text=Add Customer')
    
    // Search existing customer
    await page.fill('input[placeholder="Search customers..."]', 'Jane')
    await page.click('text=Jane Smith')
    
    // Verify customer added
    await expect(page.locator('text=Jane Smith')).toBeVisible()
    
    // Remove customer
    await page.click('text=Add Customer')
    await page.click('text=Remove')
    await expect(page.locator('text=Add Customer')).toBeVisible()
    
    // Create new customer
    await page.click('text=Add Customer')
    await page.click('text=Create New Customer')
    await page.fill('input[placeholder="Enter customer name"]', 'Test Customer')
    await page.fill('input[placeholder="Enter email (optional)"]', 'test@example.com')
    await page.fill('input[placeholder="Enter phone (optional)"]', '555-1234')
    await page.click('text=Create Customer')
    
    // Verify new customer added
    await expect(page.locator('text=Test Customer')).toBeVisible()
  })

  test('payment methods and validation', async ({ page }) => {
    // Add product first
    await page.fill('input[placeholder="Search products..."]', 'T-Shirt')
    await page.click('text=Classic White T-Shirt')
    
    // Test cash payment
    await page.fill('input[placeholder="0.00"]', '20')
    await page.click('text=Add')
    await expect(page.locator('text=Cash')).toBeVisible()
    
    // Test card payment
    await page.selectOption('select', 'card')
    await page.fill('input[placeholder="0.00"]', '10')
    await page.click('text=Add')
    await expect(page.locator('text=Card')).toBeVisible()
    
    // Test gift card payment
    await page.selectOption('select', 'gift_card')
    await page.fill('input[placeholder="0.00"]', '5')
    await page.click('text=Add')
    await expect(page.locator('text=Gift Card')).toBeVisible()
    
    // Remove payment
    await page.click('button:has-text("×")').first()
    await expect(page.locator('text=Gift Card')).not.toBeVisible()
  })

  test('responsive design - mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Should show mobile navigation
    await expect(page.locator('text=Products')).toBeVisible()
    await expect(page.locator('text=Cart')).toBeVisible()
    
    // Should be on products view by default
    await expect(page.locator('input[placeholder="Search products..."]')).toBeVisible()
    
    // Switch to cart view
    await page.click('text=Cart')
    await expect(page.locator('text=Cart is empty')).toBeVisible()
    
    // Switch back to products
    await page.click('text=Products')
    await expect(page.locator('input[placeholder="Search products..."]')).toBeVisible()
  })
})