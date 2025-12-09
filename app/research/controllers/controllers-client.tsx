"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatControllerAuthors, getControllerDownloadUrl, type Controller } from "@/lib/research/controllers"
import { X, Search, Download, Info } from "lucide-react"
import Link from "next/link"
import Fuse from 'fuse.js'
import Image from "next/image"

interface ControllersPageClientProps {
  controllers: Controller[]
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'

export function ControllersPageClient({ controllers }: ControllersPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedController, setSelectedController] = useState<Controller | null>(null)
  
  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(controllers, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'authors', weight: 0.3 },
        { name: 'institution', weight: 0.2 },
        { name: 'lab', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.2,
      distance: 100,
      minMatchCharLength: 2,
      ignoreLocation: true,
      includeScore: false,
      shouldSort: false
    })
  }, [controllers])
  
  // Calculate top tags for filtering
  const topTags = useMemo(() => {
    const tagCounts = new Map<string, number>()
    
    controllers.forEach(controller => {
      controller.tags?.forEach(tag => {
        const cleanTag = tag.trim()
        if (cleanTag) {
          tagCounts.set(cleanTag, (tagCounts.get(cleanTag) || 0) + 1)
        }
      })
    })
    
    return Array.from(tagCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5) // Show top 5 filter tags
      .map(([tag]) => tag)
  }, [controllers])
  
  // Helper function to parse date strings like "Dec 20th, 2023"
  const parseControllerDate = (dateStr: string): Date => {
    // Remove ordinal suffixes (st, nd, rd, th) and parse
    const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1')
    return new Date(cleanDate)
  }

  // Filter and sort controllers
  const filteredAndSortedControllers = useMemo(() => {
    let filtered = controllers
    
    // Apply fuzzy search filter
    if (searchTerm.trim()) {
      const searchResults = fuse.search(searchTerm.trim())
      filtered = searchResults.map(result => result.item)
    }
    
    // Apply tag filter
    if (activeFilter) {
      filtered = filtered.filter(controller => 
        controller.tags?.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      )
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return parseControllerDate(b.date).getTime() - parseControllerDate(a.date).getTime()
        case 'date-asc':
          return parseControllerDate(a.date).getTime() - parseControllerDate(b.date).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })
    
    return sorted
  }, [controllers, activeFilter, sortBy, searchTerm, fuse])

  const handleFilterChange = (tag: string) => {
    setActiveFilter(tag === activeFilter ? null : tag)
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <>
      {/* Filters, Search, and Sort */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Tag Filters */}
          {topTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-center font-light italic text-black/70">Filter By Tags</span>
              <div className="flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant={activeFilter === tag ? "default" : "outline"}
                    onClick={() => handleFilterChange(tag)}
                    className={`text-xs cursor-pointer ${
                      activeFilter === tag 
                        ? "bg-[var(--light-blue)] text-white border-black hover:bg-[var(--light-blue)]" 
                        : "bg-white text-black border-black hover:bg-[var(--light-green)] hover:text-black"
                    }`}
                  >
                    {tag}
                    {activeFilter === tag && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex flex-col gap-2 min-w-0 flex-1 max-w-md">
            <span className="text-sm text-center font-light italic text-black/70">Search</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title, author, institution, or tag..."
                className="w-full text-sm bg-white border border-black rounded-md pl-10 pr-4 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-col gap-2">
            <span className="text-sm italic text-center font-light text-black/70">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="text-sm bg-white border border-black rounded-md px-3 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-colors cursor-pointer"
            >
              <option value="date-desc">Date ↓</option>
              <option value="date-asc">Date ↑</option>
              <option value="title-asc">Title ↑</option>
              <option value="title-desc">Title ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Controllers Table */}
      <div className="border-black">
        <div className="">
          {filteredAndSortedControllers.length === 0 ? (
            // No Results State
            <div className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <Search className="h-8 w-8 text-black/70 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No controllers found</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {searchTerm ? (
                    <>No results match your search for <strong>&ldquo;{searchTerm}&rdquo;</strong></>
                  ) : activeFilter ? (
                    <>No controllers found with the tag <strong>&ldquo;{activeFilter}&rdquo;</strong></>
                  ) : (
                    'Try adjusting your search or filter criteria'
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {activeFilter && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFilterChange(activeFilter)}
                      className="bg-white text-black border-black hover:bg-[var(--light-green)] hover:text-black"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove filter
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Results Table
            <div className="rounded-md border border-black">
              <Table>
                <TableHeader>
                  <TableRow className="border-black/60">
                    <TableHead className="w-[35%] text-gray-900 font-semibold">Controller & Authors</TableHead>
                    <TableHead className="w-[20%] text-gray-900 font-semibold">Institution/Lab</TableHead>
                    <TableHead className="w-[10%] text-gray-900 font-semibold">Date</TableHead>
                    <TableHead className="w-[15%] text-gray-900 font-semibold">License</TableHead>
                    <TableHead className="w-[15%] text-gray-900 font-semibold">Tags</TableHead>
                    <TableHead className="w-[5%] text-gray-900 font-semibold">Info</TableHead>
                    <TableHead className="w-[5%] text-gray-900 font-semibold">Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedControllers.map((controller) => (
                    <TableRow key={controller.id} className="border-black/60 hover:bg-gray-50">
                      <TableCell>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm leading-tight text-gray-900">
                            {controller.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {formatControllerAuthors(controller.authors)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{controller.institution}</div>
                          <div className="text-xs text-gray-600">{controller.lab}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900 text-sm">{controller.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">{controller.license}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {controller.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-[var(--white)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-white">
                              {tag}
                            </Badge>
                          ))}
                          {controller.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{controller.tags.length - 3}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="hover:bg-[var(--light-green)] border border-black cursor-pointer"
                          onClick={() => setSelectedController(controller)}
                        >
                          <Info className="h-4 w-4 text-black" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={getControllerDownloadUrl(controller)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="ghost" className="hover:bg-[var(--light-blue)] border border-black cursor-pointer">
                            <Download className="h-4 w-4 text-black" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Controller Details Modal */}
      {selectedController && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 pr-4">{selectedController.title}</h2>
                <button
                  onClick={() => setSelectedController(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col justify-between">
                  <Image
                    src={selectedController.image}
                    alt={selectedController.title}
                    width={400}
                    height={400}
                    className="w-full h-2/3 object-cover rounded-lg mb-4"
                  />
                  

                  <div>
                    <h4 className="font-medium text-gray-900 italic">Authors</h4>
                    <p className="text-sm text-gray-600">{selectedController.authors}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 italic">License</h4>
                    <p className="text-sm text-gray-600">{selectedController.license}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 italic">Tags</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedController.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                </div>
                
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 italic">Description</h4>
                    <p className="text-sm text-gray-600 mb-3 text-justify">{selectedController.description.short}</p>
                    <p className="text-sm text-gray-600 text-justify">{selectedController.description.long}</p>
                  </div>                  
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 italic">Citation</h4>
                      {selectedController.citation ? (
                        Array.isArray(selectedController.citation) ? (
                          <ul className="list-disc pl-5 space-y-1 bg-gray-50 p-3 rounded border font-mono text-xs text-gray-600">
                            {selectedController.citation.map((c, i) => (
                              <li key={i} className="m-0">{c}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded border font-mono">
                            {selectedController.citation}
                          </p>
                        )
                      ) : (
                        <p className="text-xs text-gray-500">No citation provided.</p>
                      )}
                  </div>               
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 italic">Copyright</h4>
                    <p className="text-xs text-gray-600">
                      © {selectedController.copyright.year} {selectedController.copyright.line1}
                      <br />
                      {selectedController.copyright.line2}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      href={getControllerDownloadUrl(selectedController)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[var(--light-blue)] text-white border border-black hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 py-2 text-sm font-medium transition-colors w-full justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Controller
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 