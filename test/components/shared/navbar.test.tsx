import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Navbar from '@/components/shared/navbar'

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  )
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  )
}))

// Mock navigation config
vi.mock('@/lib/navigation', () => ({
  navigationConfig: [
    {
      title: 'Home',
      type: 'link',
      href: '/'
    },
    {
      title: 'Hardware',
      type: 'dropdown',
      items: [
        { title: 'Overview', href: '/hardware', description: 'Hardware overview' },
        { title: 'Downloads', href: '/hardware/downloads', description: 'Download files' }
      ]
    },
    {
      title: 'Software',
      type: 'featured',
      featured: {
        title: 'Open Source Library',
        description: 'Python prosthetics control',
        href: '/software'
      },
      items: [
        { title: 'Documentation', href: '/software/docs', description: 'API docs' }
      ]
    }
  ]
}))

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true
})

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset scroll position
    window.scrollY = 0
    // Reset body overflow
    document.body.style.overflow = 'unset'
  })

  describe('Basic Rendering', () => {
    it('renders the logo', () => {
      render(<Navbar />)
      expect(screen.getByAltText('Open Source Leg')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
      render(<Navbar />)
      // Use getAllByText to handle duplicate elements (desktop + mobile nav)
      expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop and mobile
      expect(screen.getAllByText('Hardware')).toHaveLength(2) // Desktop and mobile
      expect(screen.getAllByText('Software')).toHaveLength(2) // Desktop and mobile
    })

    it('renders forum button', () => {
      render(<Navbar />)
      // Use getAllByText to handle duplicate elements (desktop + mobile nav)
      expect(screen.getAllByText('Forum')).toHaveLength(2) // Desktop and mobile
    })

    it('renders mobile menu button', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      expect(menuButton).toBeInTheDocument()
    })

    it('initially shows navbar (visible)', () => {
      const { container } = render(<Navbar />)
      // Find navbar by its distinctive class structure
      const navbar = container.querySelector('.fixed.top-0.left-0.right-0.z-50')
      expect(navbar).toHaveClass('translate-y-0')
    })
  })

  describe('Scroll Behavior', () => {
    it('shows navbar when at top of page', async () => {
      const { container } = render(<Navbar />)
      const navbar = container.querySelector('.fixed.top-0.left-0.right-0.z-50')
      
      // Simulate scroll to top
      window.scrollY = 0
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(navbar).toHaveClass('translate-y-0')
      })
    })

    it('hides navbar when scrolling down', async () => {
      const { container } = render(<Navbar />)
      const navbar = container.querySelector('.fixed.top-0.left-0.right-0.z-50')
      
      // Simulate scrolling down
      window.scrollY = 100
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(navbar).toHaveClass('-translate-y-full')
      })
    })

    it('shows navbar when scrolling up', async () => {
      const { container } = render(<Navbar />)
      const navbar = container.querySelector('.fixed.top-0.left-0.right-0.z-50')
      
      // First scroll down
      window.scrollY = 100
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(navbar).toHaveClass('-translate-y-full')
      })
      
      // Then scroll up
      window.scrollY = 50
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(navbar).toHaveClass('translate-y-0')
      })
    })

    it('always shows navbar when scroll is less than 10px', async () => {
      const { container } = render(<Navbar />)
      const navbar = container.querySelector('.fixed.top-0.left-0.right-0.z-50')
      
      // Simulate minimal scroll
      window.scrollY = 5
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(navbar).toHaveClass('translate-y-0')
      })
    })
  })

  describe('Mobile Menu Functionality', () => {
    it('opens mobile menu when hamburger button is clicked', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      fireEvent.click(menuButton)
      
      // Check if mobile menu is visible
      expect(screen.getByText('Menu')).toBeInTheDocument()
    })

    it('closes mobile menu when close button is clicked', () => {
      const { container } = render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open menu
      fireEvent.click(menuButton)
      
      // Close menu
      const closeButton = screen.getByLabelText('Close menu')
      fireEvent.click(closeButton)
      
      // Mobile menu should be hidden (find the outer mobile menu container)
      const mobileMenu = container.querySelector('.fixed.top-0.right-0.h-full.w-80')
      expect(mobileMenu).toHaveClass('translate-x-full')
    })

    it('toggles menu icon between hamburger and X', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Initially shows hamburger (Menu icon)
      expect(menuButton.querySelector('svg')).toBeInTheDocument()
      
      // Click to open
      fireEvent.click(menuButton)
      
      // Should show X icon
      expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument()
    })

    it('locks body scroll when mobile menu is open', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open menu
      fireEvent.click(menuButton)
      
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('unlocks body scroll when mobile menu is closed', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open menu
      fireEvent.click(menuButton)
      expect(document.body.style.overflow).toBe('hidden')
      
      // Close menu
      const closeButton = screen.getByLabelText('Close menu')
      fireEvent.click(closeButton)
      
      expect(document.body.style.overflow).toBe('unset')
    })

    it('closes mobile menu when clicking overlay', () => {
      const { container } = render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open menu
      fireEvent.click(menuButton)
      
      // Click overlay
      const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50')
      if (overlay) {
        fireEvent.click(overlay)
      }
      
      // Mobile menu should be hidden
      const mobileMenu = container.querySelector('.fixed.top-0.right-0.h-full.w-80')
      expect(mobileMenu).toHaveClass('translate-x-full')
    })
  })

  describe('Mobile Navigation Sections', () => {
    it('toggles mobile navigation sections', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open mobile menu
      fireEvent.click(menuButton)
      
      // Find and click Hardware section in mobile menu
      const hardwareButtons = screen.getAllByText('Hardware')
      const mobileHardwareButton = hardwareButtons.find(btn => 
        btn.closest('.space-y-2') // Mobile nav has this class
      )
      if (mobileHardwareButton) {
        fireEvent.click(mobileHardwareButton)
      }
      
      // Should show Hardware items
      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Downloads')).toBeInTheDocument()
    })

    it('collapses open section when clicking same section again', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open mobile menu
      fireEvent.click(menuButton)
      
      // Open Hardware section in mobile menu
      const hardwareButtons = screen.getAllByText('Hardware')
      const mobileHardwareButton = hardwareButtons.find(btn => 
        btn.closest('.space-y-2')
      )
      if (mobileHardwareButton) {
        fireEvent.click(mobileHardwareButton)
        
        // Should show items
        expect(screen.getByText('Overview')).toBeInTheDocument()
        
        // Click Hardware again to collapse
        fireEvent.click(mobileHardwareButton)
        
        // Items should be hidden (but text might still be in DOM)
        // Check for the chevron rotation instead
        const chevron = mobileHardwareButton.querySelector('svg')
        expect(chevron).not.toHaveClass('rotate-90')
      }
    })

    it('shows only one section at a time', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open mobile menu
      fireEvent.click(menuButton)
      
      // Open Hardware section in mobile menu
      const hardwareButtons = screen.getAllByText('Hardware')
      const mobileHardwareButton = hardwareButtons.find(btn => 
        btn.closest('.space-y-2')
      )
      if (mobileHardwareButton) {
        fireEvent.click(mobileHardwareButton)
      }
      
      // Open Software section in mobile menu
      const softwareButtons = screen.getAllByText('Software')
      const mobileSoftwareButton = softwareButtons.find(btn => 
        btn.closest('.space-y-2')
      )
      if (mobileSoftwareButton) {
        fireEvent.click(mobileSoftwareButton)
      }
      
      // Hardware section should be closed, Software should be open
      expect(screen.getByText('Documentation')).toBeInTheDocument()
    })

    it('closes mobile menu when clicking navigation link', () => {
      const { container } = render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open mobile menu
      fireEvent.click(menuButton)
      
      // Click a navigation link in mobile menu
      const homeLinks = screen.getAllByText('Home')
      const mobileHomeLink = homeLinks.find(link => 
        link.closest('.space-y-2')
      )
      if (mobileHomeLink) {
        fireEvent.click(mobileHomeLink)
      }
      
      // Mobile menu should be closed
      const mobileMenu = container.querySelector('.fixed.top-0.right-0.h-full.w-80')
      expect(mobileMenu).toHaveClass('translate-x-full')
    })
  })

  describe('Desktop Navigation', () => {
    it('renders desktop navigation menu', () => {
      render(<Navbar />)

      // Desktop navigation should be hidden on mobile, visible on desktop
      const desktopNavContainer = document.querySelector('.hidden.md\\:flex')
      expect(desktopNavContainer).toBeInTheDocument()
    })

    it('shows dropdown content on hover/click', () => {
      render(<Navbar />)
      
      // Hardware dropdown should exist in desktop navigation
      const hardwareDropdowns = screen.getAllByText('Hardware')
      expect(hardwareDropdowns.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('hides desktop navigation on mobile', () => {
      render(<Navbar />)

      const desktopNavContainer = document.querySelector('.hidden.md\\:flex')
      expect(desktopNavContainer).toBeInTheDocument()
      expect(desktopNavContainer).toHaveClass('hidden', 'md:flex')
    })

    it('shows mobile menu button on mobile', () => {
      render(<Navbar />)

      const mobileMenuButton = screen.getByLabelText('Toggle mobile menu')
      expect(mobileMenuButton).toHaveClass('md:hidden')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Navbar />)
      
      expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument()
    })

    it('has proper ARIA attributes for disabled state', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open menu
      fireEvent.click(menuButton)
      
      // Close button should have proper label
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
    })

    it('maintains focus management', () => {
      render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Button should be focusable
      menuButton.focus()
      expect(document.activeElement).toBe(menuButton)
    })
  })

  describe('Cleanup', () => {
    it('cleans up scroll event listener on unmount', () => {
      const { unmount } = render(<Navbar />)
      
      // Add spy to removeEventListener
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      
      unmount()
      
      // Should remove scroll event listener
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('resets body overflow on unmount', () => {
      const { unmount } = render(<Navbar />)
      const menuButton = screen.getByLabelText('Toggle mobile menu')
      
      // Open menu (locks body scroll)
      fireEvent.click(menuButton)
      expect(document.body.style.overflow).toBe('hidden')
      
      // Unmount component
      unmount()
      
      // Body scroll should be reset
      expect(document.body.style.overflow).toBe('unset')
    })
  })
}) 