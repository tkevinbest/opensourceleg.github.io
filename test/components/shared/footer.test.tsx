import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Footer from '@/components/shared/footer'

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ href, children, className, target, rel, ...props }: any) => (
    <a href={href} className={className} target={target} rel={rel} {...props}>
      {children}
    </a>
  )
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  )
}))

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Github: ({ className }: any) => <svg data-testid="github-icon" className={className} />,
  Twitter: ({ className }: any) => <svg data-testid="twitter-icon" className={className} />,
  Linkedin: ({ className }: any) => <svg data-testid="linkedin-icon" className={className} />,
  Mail: ({ className }: any) => <svg data-testid="mail-icon" className={className} />,
  MessageSquare: ({ className }: any) => <svg data-testid="message-square-icon" className={className} />
}))

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders footer with correct structure', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('bg-background', 'border-t', 'border-border', 'mt-20')
    })

    it('applies correct layout classes', () => {
      const { container } = render(<Footer />)
      
      const mainContainer = container.querySelector('.max-w-7xl.mx-auto.px-4')
      expect(mainContainer).toBeInTheDocument()
      
      const gridContainer = container.querySelector('.grid.grid-cols-2.md\\:grid-cols-2.lg\\:grid-cols-4')
      expect(gridContainer).toBeInTheDocument()
    })
  })

  describe('Dynamic Year Display', () => {
    it('displays current year in copyright', () => {
      const currentYear = new Date().getFullYear()
      render(<Footer />)
      
      expect(screen.getByText(`© ${currentYear} Open Source Leg`)).toBeInTheDocument()
    })

    it('updates year when date changes', () => {
      // Mock Date to return a specific year
      const mockDate = new Date('2025-06-15')
      vi.spyOn(global, 'Date').mockImplementation(() => mockDate)
      vi.spyOn(mockDate, 'getFullYear').mockReturnValue(2025)
      
      render(<Footer />)
      
      expect(screen.getByText('© 2025 Open Source Leg')).toBeInTheDocument()
      
      vi.restoreAllMocks()
    })
  })

  describe('Footer Sections Structure', () => {
    it('renders all four main sections', () => {
      render(<Footer />)
      
      expect(screen.getByText('Hardware')).toBeInTheDocument()
      expect(screen.getByText('Software')).toBeInTheDocument()
      expect(screen.getByText('Research')).toBeInTheDocument()
      expect(screen.getByText('Community')).toBeInTheDocument()
    })

    it('renders section headings with correct styling', () => {
      render(<Footer />)
      
      const hardwareHeading = screen.getByText('Hardware')
      expect(hardwareHeading).toHaveClass('font-medium', 'text-foreground', 'mb-2', 'md:mb-3', 'text-sm')
    })

    describe('Hardware Section', () => {
      it('renders all hardware links', () => {
        render(<Footer />)
        
        // Find hardware overview link specifically
        const overviewLinks = screen.getAllByRole('link', { name: 'Overview' })
        const hardwareOverview = overviewLinks.find(link => 
          link.getAttribute('href') === '/hardware'
        )
        expect(hardwareOverview).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute('href', '/hardware/downloads')
        
        // Find hardware tutorials link specifically
        const tutorialsLinks = screen.getAllByRole('link', { name: 'Tutorials' })
        const hardwareTutorials = tutorialsLinks.find(link => 
          link.getAttribute('href') === '/hardware/tutorials'
        )
        expect(hardwareTutorials).toBeInTheDocument()
      })

      it('applies correct link styling', () => {
        render(<Footer />)
        
        // Find hardware overview link specifically for styling test
        const overviewLinks = screen.getAllByRole('link', { name: 'Overview' })
        const hardwareOverview = overviewLinks.find(link => 
          link.getAttribute('href') === '/hardware'
        )
        expect(hardwareOverview).toHaveClass(
          'text-muted-foreground',
          'hover:text-foreground',
          'hover:underline',
          'transition-all',
          'text-xs',
          'block'
        )
      })
    })

    describe('Software Section', () => {
      it('renders all software links with correct URLs', () => {
        render(<Footer />)
        
        const softwareLinks = screen.getAllByRole('link')
        const apiDocLink = softwareLinks.find(link => 
          link.getAttribute('href') === 'https://neurobionics.github.io/opensourceleg/'
        )
        
        // Find software overview link specifically
        const overviewLinks = screen.getAllByRole('link', { name: 'Overview' })
        const softwareOverview = overviewLinks.find(link => 
          link.getAttribute('href') === '/software'
        )
        expect(softwareOverview).toBeInTheDocument()
        expect(apiDocLink).toBeInTheDocument()
        expect(screen.getByText('API Documentation')).toBeInTheDocument()
      })
    })

    describe('Research Section', () => {
      it('renders all research links', () => {
        render(<Footer />)
        
        // Find research overview link specifically
        const overviewLinks = screen.getAllByRole('link', { name: 'Publications' })
        const researchOverview = overviewLinks.find(link => 
          link.getAttribute('href') === '/research'
        )
        expect(researchOverview).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Controllers' })).toHaveAttribute('href', '/research/controllers')
        expect(screen.getByRole('link', { name: 'Add Your Publication' })).toHaveAttribute('href', process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '#')
      })
    })

    describe('Community Section', () => {
      it('renders all community links', () => {
        render(<Footer />)
        
        // Find forum link in community section specifically
        const forumLinks = screen.getAllByRole('link', { name: 'Forum' })
        const communityForumLink = forumLinks.find(link => 
          link.textContent === 'Forum' && 
          link.getAttribute('href') === 'https://opensourceleg.discourse.group/'
        )
        expect(communityForumLink).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Contributing' })).toHaveAttribute('href', 'https://neurobionics.github.io/opensourceleg/contributing/')
        expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', 'mailto:opensourceleg@gmail.com')
      })

      it('handles email links correctly', () => {
        render(<Footer />)
        
        const contactLink = screen.getByRole('link', { name: 'Contact Us' })
        expect(contactLink).toHaveAttribute('href', 'mailto:opensourceleg@gmail.com')
      })
    })
  })

  describe('Logo and Copyright Section', () => {
    it('renders logo with correct attributes', () => {
      render(<Footer />)
      
      const logo = screen.getByRole('img', { name: 'Open Source Leg' })
      expect(logo).toHaveAttribute('src', '/logo/osl-icon-black.svg')
      expect(logo).toHaveAttribute('width', '20')
      expect(logo).toHaveAttribute('height', '20')
    })

    it('logo links to homepage', () => {
      render(<Footer />)
      
      const logoLink = screen.getByRole('img', { name: 'Open Source Leg' }).closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
      expect(logoLink).toHaveClass('flex-shrink-0', 'hover:opacity-80', 'transition-opacity')
    })

    it('renders copyright with correct styling', () => {
      render(<Footer />)
      
      const copyright = screen.getByText(/© \d+ Open Source Leg/)
      expect(copyright).toHaveClass('text-muted-foreground', 'text-xs')
    })
  })

  describe('Social Links Section', () => {
    it('renders all social media icons', () => {
      render(<Footer />)
      
      expect(screen.getByTestId('github-icon')).toBeInTheDocument()
      expect(screen.getByTestId('message-square-icon')).toBeInTheDocument()
      expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
    })

    it('applies correct accessibility labels', () => {
      render(<Footer />)
      
      expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
      expect(screen.getByLabelText('Forum')).toBeInTheDocument()
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
      expect(screen.getByLabelText('Contact')).toBeInTheDocument()
    })

    it('applies correct styling to social links', () => {
      render(<Footer />)
      
      const githubLink = screen.getByLabelText('GitHub')
      expect(githubLink).toHaveClass(
        'p-1.5',
        'text-muted-foreground',
        'hover:text-foreground',
        'hover:bg-accent',
        'rounded-md',
        'transition-colors'
      )
    })

    it('renders social icons with correct size classes', () => {
      render(<Footer />)
      
      const githubIcon = screen.getByTestId('github-icon')
      expect(githubIcon).toHaveClass('h-3.5', 'w-3.5')
    })
  })

  describe('External Link Security', () => {
    it('adds target="_blank" for external links', () => {
      render(<Footer />)
      
      const githubLink = screen.getByLabelText('GitHub')
      const forumLink = screen.getByLabelText('Forum')
      const twitterLink = screen.getByLabelText('Twitter')
      const linkedinLink = screen.getByLabelText('LinkedIn')
      
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(forumLink).toHaveAttribute('target', '_blank')
      expect(twitterLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
    })

    it('adds rel="noopener noreferrer" for external links', () => {
      render(<Footer />)
      
      const githubLink = screen.getByLabelText('GitHub')
      const forumLink = screen.getByLabelText('Forum')
      const twitterLink = screen.getByLabelText('Twitter')
      const linkedinLink = screen.getByLabelText('LinkedIn')
      
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(forumLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('does not add target="_blank" for internal links', () => {
      render(<Footer />)
      
      const contactLink = screen.getByLabelText('Contact')
      expect(contactLink).not.toHaveAttribute('target')
      expect(contactLink).not.toHaveAttribute('rel')
    })

    it('correctly identifies external vs internal links in social section', () => {
      render(<Footer />)
      
      // Only social media links have external link detection logic
      const socialExternalLinks = [
        'https://github.com/opensourceleg',
        'https://opensourceleg.discourse.group/',
        'https://twitter.com/opensourceleg',
        'https://linkedin.com/company/opensourceleg'
      ]
      
      socialExternalLinks.forEach(href => {
        const socialLink = screen.getByLabelText(
          href.includes('github') ? 'GitHub' :
          href.includes('discourse') ? 'Forum' :
          href.includes('twitter') ? 'Twitter' :
          href.includes('linkedin') ? 'LinkedIn' : ''
        )
        expect(socialLink).toHaveAttribute('target', '_blank')
        expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer')
      })
      
      // Internal social links should not have target="_blank"
      const contactSocialLink = screen.getByLabelText('Contact')
      expect(contactSocialLink).not.toHaveAttribute('target')
      expect(contactSocialLink).not.toHaveAttribute('rel')
    })
  })

  describe('Link Structure and URLs', () => {
    it('has correct social media URLs', () => {
      render(<Footer />)
      
      expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/opensourceleg')
      expect(screen.getByLabelText('Twitter')).toHaveAttribute('href', 'https://twitter.com/opensourceleg')
      expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/company/opensourceleg')
      expect(screen.getByLabelText('Contact')).toHaveAttribute('href', 'mailto:opensourceleg@gmail.com')
    })

    it('has correct external documentation URLs', () => {
      render(<Footer />)
      
      const apiDocLink = screen.getByRole('link', { name: 'API Documentation' })
      expect(apiDocLink).toHaveAttribute('href', 'https://neurobionics.github.io/opensourceleg/')
      
      const contributingLink = screen.getByRole('link', { name: 'Contributing' })
      expect(contributingLink).toHaveAttribute('href', 'https://neurobionics.github.io/opensourceleg/contributing/')
    })

    it('handles forum link duplication correctly', () => {
      render(<Footer />)
      
      // Forum appears in both community section and social links
      const forumLinks = screen.getAllByRole('link', { name: 'Forum' })
      expect(forumLinks).toHaveLength(2)
      
      forumLinks.forEach(link => {
        expect(link).toHaveAttribute('href', 'https://opensourceleg.discourse.group/')
      })
    })
  })

  describe('Responsive Layout', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(<Footer />)
      
      const gridContainer = container.querySelector('.grid')
      expect(gridContainer).toHaveClass('grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-4')
    })

    it('applies responsive spacing classes', () => {
      const { container } = render(<Footer />)
      
      const mainContainer = container.querySelector('.py-8.md\\:py-12')
      expect(mainContainer).toBeInTheDocument()
      
      const bottomSection = container.querySelector('.flex-col.sm\\:flex-row')
      expect(bottomSection).toBeInTheDocument()
    })

    it('applies responsive margin classes for section headings', () => {
      render(<Footer />)
      
      const heading = screen.getByText('Hardware')
      expect(heading).toHaveClass('mb-2', 'md:mb-3')
    })

    it('applies responsive spacing for lists', () => {
      const { container } = render(<Footer />)
      
      const list = container.querySelector('.space-y-1.md\\:space-y-2')
      expect(list).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('includes horizontal divider', () => {
      const { container } = render(<Footer />)
      
      const divider = container.querySelector('hr.border-border')
      expect(divider).toBeInTheDocument()
      expect(divider).toHaveClass('mb-6', 'md:mb-8')
    })

    it('positions copyright and social links correctly', () => {
      const { container } = render(<Footer />)
      
      const bottomSection = container.querySelector('.flex.flex-col.sm\\:flex-row.justify-between.items-center')
      expect(bottomSection).toBeInTheDocument()
    })

    it('groups copyright elements correctly', () => {
      const { container } = render(<Footer />)
      
      const copyrightSection = container.querySelector('.flex.items-center.gap-2')
      expect(copyrightSection).toBeInTheDocument()
      
      const logo = copyrightSection?.querySelector('img')
      const copyright = copyrightSection?.querySelector('p')
      
      expect(logo).toBeInTheDocument()
      expect(copyright).toBeInTheDocument()
    })

    it('groups social links correctly', () => {
      const { container } = render(<Footer />)
      
      const socialSection = container.querySelector('.flex.items-center.gap-1')
      expect(socialSection).toBeInTheDocument()
      
      const socialLinks = socialSection?.querySelectorAll('a')
      expect(socialLinks).toHaveLength(5) // GitHub, Forum, Twitter, LinkedIn, Contact
    })
  })

  describe('Content Validation', () => {
    it('has all expected footer sections', () => {
      render(<Footer />)
      
      const expectedSections = ['Hardware', 'Software', 'Research', 'Community']
      expectedSections.forEach(section => {
        expect(screen.getByText(section)).toBeInTheDocument()
      })
    })

    it('has minimum expected links per section', () => {
      render(<Footer />)
      
      // Each section should have at least 3 links
      const sections = ['Hardware', 'Software', 'Research', 'Community']
      
      sections.forEach(sectionName => {
        const sectionElement = screen.getByText(sectionName).closest('div')
        const links = sectionElement?.querySelectorAll('a')
        expect(links?.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('includes required contact information', () => {
      render(<Footer />)
      
      expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', 'mailto:opensourceleg@gmail.com')
      expect(screen.getByLabelText('Contact')).toHaveAttribute('href', 'mailto:opensourceleg@gmail.com')
    })
  })

  describe('Accessibility', () => {
    it('uses semantic footer element', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer.tagName).toBe('FOOTER')
    })

    it('provides accessible labels for social links', () => {
      render(<Footer />)
      
      const socialLabels = ['GitHub', 'Forum', 'Twitter', 'LinkedIn', 'Contact']
      socialLabels.forEach(label => {
        const link = screen.getByLabelText(label)
        expect(link).toHaveAttribute('aria-label', label)
      })
    })

    it('uses proper heading hierarchy', () => {
      render(<Footer />)
      
      const headings = screen.getAllByRole('heading', { level: 3 })
      expect(headings).toHaveLength(4) // Hardware, Software, Research, Community
    })

    it('provides alt text for logo', () => {
      render(<Footer />)
      
      const logo = screen.getByRole('img', { name: 'Open Source Leg' })
      expect(logo).toHaveAttribute('alt', 'Open Source Leg')
    })
  })
}) 