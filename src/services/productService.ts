export interface Product {
  id: string
  name: string
  description?: string
  price: number
  cost?: number
  sku: string
  barcode?: string
  stock: number
  category: string
  image?: string
  isActive: boolean
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 19.99,
    cost: 8.50,
    sku: 'TSH-001',
    barcode: '1234567890123',
    stock: 50,
    category: 'Apparel',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '2',
    name: 'Denim Jeans',
    description: 'Classic fit denim jeans',
    price: 49.99,
    cost: 22.00,
    sku: 'JEANS-001',
    barcode: '1234567890124',
    stock: 30,
    category: 'Apparel',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '3',
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug',
    price: 12.99,
    cost: 4.50,
    sku: 'MUG-001',
    barcode: '1234567890125',
    stock: 100,
    category: 'Home Goods',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    price: 29.99,
    cost: 12.00,
    sku: 'MOUSE-001',
    barcode: '1234567890126',
    stock: 25,
    category: 'Electronics',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '5',
    name: 'Notebook Set',
    description: 'Set of 3 spiral notebooks',
    price: 15.99,
    cost: 6.00,
    sku: 'NOTE-001',
    barcode: '1234567890127',
    stock: 75,
    category: 'Office Supplies',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '6',
    name: 'Water Bottle',
    description: 'Stainless steel water bottle',
    price: 24.99,
    cost: 10.50,
    sku: 'BOTTLE-001',
    barcode: '1234567890128',
    stock: 40,
    category: 'Sports',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '7',
    name: 'Backpack',
    description: 'Durable canvas backpack',
    price: 39.99,
    cost: 18.00,
    sku: 'BACKPACK-001',
    barcode: '1234567890129',
    stock: 20,
    category: 'Apparel',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
  {
    id: '8',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable arm',
    price: 34.99,
    cost: 15.00,
    sku: 'LAMP-001',
    barcode: '1234567890130',
    stock: 15,
    category: 'Home Goods',
    image: '/api/placeholder/200/200',
    isActive: true,
  },
]

class ProductService {
  private products: Product[] = mockProducts

  async searchProducts(query: string): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    if (!query.trim()) {
      return this.products.filter(p => p.isActive)
    }

    const lowercaseQuery = query.toLowerCase()
    return this.products.filter(product => 
      product.isActive && (
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.sku.toLowerCase().includes(lowercaseQuery) ||
        product.barcode?.includes(query) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    )
  }

  async getProductByBarcode(barcode: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return this.products.find(p => p.barcode === barcode && p.isActive) || null
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 50))
    return this.products.find(p => p.id === id && p.isActive) || null
  }

  async getAllProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.products.filter(p => p.isActive)
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.products.filter(p => p.category === category && p.isActive)
  }

  // Mock method to simulate low stock warning
  async checkStock(productId: string, quantity: number): Promise<{ available: boolean; stock: number }> {
    await new Promise(resolve => setTimeout(resolve, 50))
    const product = this.products.find(p => p.id === productId)
    if (!product) {
      return { available: false, stock: 0 }
    }
    return {
      available: product.stock >= quantity,
      stock: product.stock
    }
  }
}

export const productService = new ProductService()

// TODO: Replace with actual API calls
// export class ProductService {
//   private baseUrl = '/api/products'
//   
//   async searchProducts(query: string): Promise<Product[]> {
//     const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`)
//     return response.json()
//   }
//   
//   async getProductByBarcode(barcode: string): Promise<Product | null> {
//     const response = await fetch(`${this.baseUrl}/barcode/${encodeURIComponent(barcode)}`)
//     return response.json()
//   }
//   
//   // ... other methods
// }