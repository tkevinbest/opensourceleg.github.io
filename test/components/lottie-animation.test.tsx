import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LottieAnimation from '@/components/lottie-animation'

// Mock the Lottie component
vi.mock('lottie-react', () => ({
  default: ({ animationData, loop }: { animationData: any; loop: boolean }) => (
    <div data-testid="lottie-animation" data-loop={loop}>
      Mocked Lottie Animation
    </div>
  )
}))

// Mock the animation data
vi.mock('@/public/landing.json', () => ({
  default: { 
    v: '5.7.4',
    fr: 30,
    ip: 0,
    op: 120,
    w: 400,
    h: 400,
    nm: 'MockAnimation',
    ddd: 0,
    assets: [],
    layers: []
  }
}))

describe('LottieAnimation Component', () => {
  it('renders the Lottie animation component', () => {
    render(<LottieAnimation />)
    
    const animation = screen.getByTestId('lottie-animation')
    expect(animation).toBeInTheDocument()
  })

  it('sets loop to true', () => {
    render(<LottieAnimation />)
    
    const animation = screen.getByTestId('lottie-animation')
    expect(animation).toHaveAttribute('data-loop', 'true')
  })

  it('renders with correct container classes', () => {
    const { container } = render(<LottieAnimation />)
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('w-56', 'h-56', 'sm:w-64', 'sm:h-64', 'md:w-72', 'md:h-72', 'lg:w-90', 'lg:h-90', 'mb-2', 'sm:mb-4')
  })

  it('has responsive sizing classes', () => {
    const { container } = render(<LottieAnimation />)
    
    const wrapper = container.firstChild as HTMLElement
    
    // Check that responsive classes are present
    const classString = wrapper.className
    expect(classString).toContain('w-56') // base size
    expect(classString).toContain('sm:w-64') // small screens
    expect(classString).toContain('md:w-72') // medium screens  
    expect(classString).toContain('lg:w-90') // large screens
  })
}) 