"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronRight } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navigationConfig } from "@/lib/navigation"

export default function Navbar() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [openMobileSection, setOpenMobileSection] = React.useState<string | null>(null)

  React.useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true)
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Add scroll event listener
    window.addEventListener('scroll', controlNavbar)
    
    // Cleanup
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileSection = (sectionTitle: string) => {
    setOpenMobileSection(openMobileSection === sectionTitle ? null : sectionTitle)
  }

  return (
    <>
      <div className={`
        fixed top-0 left-0 right-0 z-50 
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}>
        <div className="flex justify-center w-full py-4 px-4 md:px-0">
          <div className="border border-border rounded-lg px-6 py-3 bg-background shadow-sm w-full max-w-none md:max-w-fit md:px-4 md:py-2 md:w-auto">
            <div className="flex items-center justify-between md:justify-start gap-8">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo/osl-icon-black.svg"
                  alt="Open Source Leg"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
              
              {/* Desktop Navigation Menu */}
              <div className="hidden md:flex md:items-center md:gap-4">
                <NavigationMenu viewport={false}>
                  <NavigationMenuList>
                    {navigationConfig.map((section) => (
                      <NavigationMenuItem key={section.title}>
                        {section.type === 'link' ? (
                          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={section.href!}>{section.title}</Link>
                          </NavigationMenuLink>
                        ) : (
                          <>
                            <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                              {section.type === 'featured' && section.featured ? (
                                <div className="flex gap-3 p-2 md:w-[400px] lg:w-[500px]">
                                  <div className="flex-[0.75]">
                                    <NavigationMenuLink asChild>
                                      <Link
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md min-h-[150px]"
                                        href={section.featured.href}
                                      >
                                        <div className="mt-4 mb-2 text-lg font-medium">
                                          {section.featured.title}
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight">
                                          {section.featured.description}
                                        </p>
                                      </Link>
                                    </NavigationMenuLink>
                                  </div>
                                  <div className="flex-1 flex flex-col justify-center space-y-2">
                                    {section.items?.map((item) => (
                                      <div key={item.title} className="flex-1 flex items-center">
                                        <NavigationMenuLink asChild className="w-full">
                                          <Link href={item.href} className="block p-3 rounded-md hover:bg-accent transition-colors h-full flex flex-col justify-center">
                                            <div className="text-sm leading-none font-medium mb-1">{item.title}</div>
                                            <p className="text-muted-foreground text-xs leading-snug">
                                              {item.description}
                                            </p>
                                          </Link>
                                        </NavigationMenuLink>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : section.type === 'dropdown' && section.items ? (
                                <ul className={`grid ${
                                  section.items.length > 3 
                                    ? 'gap-2 w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]' 
                                    : 'gap-4 w-[300px]'
                                }`}>
                                  {section.items.map((item) => (
                                    item.description ? (
                                      <ListItem key={item.title} href={item.href} title={item.title}>
                                        {item.description}
                                      </ListItem>
                                    ) : (
                                      <li key={item.title}>
                                        <NavigationMenuLink asChild>
                                          <Link href={item.href}>
                                            <div className="font-medium">{item.title}</div>
                                          </Link>
                                        </NavigationMenuLink>
                                      </li>
                                    )
                                  ))}
                                </ul>
                              ) : null}
                            </NavigationMenuContent>
                          </>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
                
                {/* Forum Button */}
                <Link
                  href="https://opensourceleg.discourse.group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--light-green)] text-black border border-black rounded-md px-4 py-2 text-sm font-medium hover:bg-[var(--light-blue)] transition-colors -mr-2"
                >
                  Forum
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 md:hidden
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Menu</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigationConfig.map((section) => (
                <div key={section.title}>
                  {section.type === 'link' ? (
                    <Link
                      href={section.href!}
                      className="block px-3 py-2 rounded-md hover:bg-accent transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {section.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleMobileSection(section.title)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-accent transition-colors font-medium"
                      >
                        {section.title}
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          openMobileSection === section.title ? 'rotate-90' : ''
                        }`} />
                      </button>
                      
                      {openMobileSection === section.title && (
                        <div className="mt-2 ml-4 space-y-1">
                          {section.featured && (
                            <Link
                              href={section.featured.href}
                              className="block px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="font-medium">{section.featured.title}</div>
                              <div className="text-muted-foreground text-xs mt-1">
                                {section.featured.description}
                              </div>
                            </Link>
                          )}
                          {section.items?.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="block px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="font-medium">{item.title}</div>
                              {item.description && (
                                <div className="text-muted-foreground text-xs mt-1">
                                  {item.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Forum Button */}
              <div className="pt-4 border-t border-border">
                <Link
                  href="https://opensourceleg.discourse.group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[var(--light-green)] text-black border border-black rounded-lg px-3 py-2 text-center font-medium hover:bg-[var(--light-green)]/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Forum
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
