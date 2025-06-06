import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { LoginPage } from '../pages/LoginPage'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { LanguageProvider } from '../contexts/LanguageContext'

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>
)

describe('LoginPage', () => {
  it('renders login form elements', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('allows user to type in email and password fields', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )
    
    const passwordInput = screen.getByLabelText('Password')
    const toggleButton = screen.getByRole('button', { name: '' }) // Eye icon button
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('shows forgot password link', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )
    
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
  })

  it('shows sign up link', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })
})

