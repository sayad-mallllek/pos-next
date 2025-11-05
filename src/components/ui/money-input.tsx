'use client'

import { forwardRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

export interface MoneyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number
  onChange: (value: number) => void
  error?: string
}

const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, value, onChange, error, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('')

    useEffect(() => {
      if (value === 0) {
        setDisplayValue('')
      } else {
        setDisplayValue(formatCurrency(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^0-9.]/g, '')
      
      if (rawValue === '') {
        setDisplayValue('')
        onChange(0)
        return
      }

      // Ensure only one decimal point
      const parts = rawValue.split('.')
      if (parts.length > 2) {
        return
      }

      // Limit to 2 decimal places
      if (parts[1] && parts[1].length > 2) {
        return
      }

      const numericValue = parseFloat(rawValue)
      if (!isNaN(numericValue)) {
        setDisplayValue(rawValue)
        onChange(numericValue)
      }
    }

    const handleBlur = () => {
      if (value > 0) {
        setDisplayValue(formatCurrency(value))
      }
    }

    const handleFocus = () => {
      setDisplayValue(value > 0 ? value.toString() : '')
    }

    return (
      <div className="relative">
        <input
          type="text"
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="0.00"
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

MoneyInput.displayName = 'MoneyInput'

export { MoneyInput }