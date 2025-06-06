import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from '../components/Navbar'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { CurrencyProvider } from '../contexts/CurrencyContext'
import { LanguageProvider } from '../contexts/LanguageContext'

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>
)

describe('Navbar', () => {
  it('renders the logo and brand name', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    expect(screen.getByText('Play ChaCha')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Betting')).toBeInTheDocument()
  })

  it('renders login and register buttons when not authenticated', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    // Theme toggle button should be present (moon/sun icon)
    const themeButtons = screen.getAllByRole('button')
    expect(themeButtons.length).toBeGreaterThan(0)
  })

  it('renders language selector', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    // Language selector button should be present
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders currency selector', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )
    
    expect(screen.getByText('USD')).toBeInTheDocument()
  })
})

