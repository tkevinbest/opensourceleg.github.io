import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail, MessageSquare } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerSections = [
    {
      title: "Hardware",
      links: [
        { title: "Overview", href: "/hardware" },
        { title: "Downloads", href: "/hardware/downloads" },
        { title: "Tutorials", href: "/hardware/tutorials" },
      ]
    },
    {
      title: "Software", 
      links: [
        { title: "Overview", href: "/software" },
        { title: "API Documentation", href: "https://neurobionics.github.io/opensourceleg/" },
        { title: "Source", href: "https://github.com/neurobionics/opensourceleg" },
      ]
    },
    {
      title: "Research",
      links: [
        { title: "Controllers", href: "/research/controllers" },
        { title: "Publications", href: "/research" },
        { title: "Add Your Publication", href: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || "#" },
      ]
    },
    {
      title: "Community",
      links: [
        { title: "Forum", href: "https://opensourceleg.discourse.group/" },
        { title: "Contributing", href: "https://neurobionics.github.io/opensourceleg/contributing/" },
        { title: "Contact Us", href: "mailto:opensourceleg@gmail.com" },
      ]
    }
  ]

  const socialLinks = [
    { 
      name: "GitHub", 
      href: "https://github.com/opensourceleg", 
      icon: Github 
    },
    { 
      name: "Forum", 
      href: "https://opensourceleg.discourse.group/", 
      icon: MessageSquare 
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/opensourceleg", 
      icon: Twitter 
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/opensourceleg", 
      icon: Linkedin 
    },
    { 
      name: "Contact", 
      href: "mailto:opensourceleg@gmail.com", 
      icon: Mail 
    }
  ]

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8 lg:max-w-5xl lg:mx-auto">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col items-center">
                <div className="flex flex-col">
                    <h3 className="font-medium text-foreground mb-2 md:mb-3 text-sm">
                        {section.title}
                    </h3>
                    <ul className="space-y-1 md:space-y-2 text-left">
                        {section.links.map((link) => (
                        <li key={link.title}>
                            <Link 
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground hover:underline transition-all text-xs block"
                            >
                            {link.title}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-border mb-6 md:mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <Image
                src="/logo/osl-icon-black.svg"
                alt="Open Source Leg"
                width={20}
                height={20}
              />
            </Link>
            <p className="text-muted-foreground text-xs">
              © {currentYear} Open Source Leg
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  aria-label={social.name}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
