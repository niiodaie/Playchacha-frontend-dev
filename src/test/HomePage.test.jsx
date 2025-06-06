import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { HomePage } from '../pages/HomePage'
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

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Peer-to-Peer Sports Betting')).toBeInTheDocument()
  })

  it('renders the hero subtitle', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Bet against other users on real sports events globally')).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Start Betting Now')).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Secure Escrow')).toBeInTheDocument()
    expect(screen.getByText('Global Events')).toBeInTheDocument()
    expect(screen.getByText('Instant Payouts')).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    )
    
    expect(screen.getByText('1.2M+')).toBeInTheDocument()
    expect(screen.getByText('Active Users')).toBeInTheDocument()
    expect(screen.getByText('94.7%')).toBeInTheDocument()
    expect(screen.getByText('Win Rate')).toBeInTheDocument()
  })

  it('renders live events section', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Live Events')).toBeInTheDocument()
    expect(screen.getByText('Manchester United vs Liverpool')).toBeInTheDocument()
    expect(screen.getByText('Lakers vs Warriors')).toBeInTheDocument()
  })
})

