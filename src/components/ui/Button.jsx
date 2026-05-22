import React from 'react'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled,
  type = 'button',
  ...props 
}) {
  const baseClasses = 'cursor-pointer inline-flex items-center justify-center gap-1.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    danger: 'text-red-600 hover:text-red-700 hover:bg-red-50',
    ghost: 'text-slate-600 hover:text-slate-800',
    icon: 'text-slate-400 hover:text-slate-600',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-lg',
    none: ''
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
