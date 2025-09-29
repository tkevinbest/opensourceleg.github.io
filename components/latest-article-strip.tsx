import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/mdx'

export function LatestArticleStrip() {
  const posts = getAllPosts()
  
  if (posts.length === 0) {
    return (
      <div className="bg-[var(--light-blue)] border-b border-gray-200 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-6">
            {/* Empty content when no posts */}
          </div>
        </div>
      </div>
    )
  }

  const latestPost = posts[0] // Posts are already sorted by date (newest first)
  const ENABLE_ARTICLES = process.env.NODE_ENV === 'test' ? true : false; // Enable for tests, disable for production

  if (!ENABLE_ARTICLES) {
    return (
      <div className="bg-[var(--light-blue)] border-b border-gray-200 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-6">
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--light-blue)] border-b border-gray-200 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm font-medium text-white/70 shrink-0">
               <div className="w-2 h-2 bg-[var(--light-green)] rounded-full animate-pulse shadow-lg shadow-white/50"/>
               <span className="text-white/70 max-md:hidden">LATEST</span>
             </div>
            
            <Link 
              href={`/articles/${latestPost.slug}`}
              className="group flex items-center gap-3 min-w-0 flex-1 hover:text-[var(--light-green)] transition-colors"
            >
              <span className="text-white font-medium truncate group-hover:text-[var(--light-green)] transition-colors">
                {latestPost.title}
              </span>
              
              <div className="flex items-center gap-2 text-sm text-white/70 shrink-0">
                <Clock className="w-3 h-3" />
                <span>{latestPost.readingTime}</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-[var(--light-green)] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
          
          <Link 
            href="/articles" 
            className="text-sm text-white/70 hover:text-[var(--light-green)] transition-colors shrink-0 ml-4 max-md:hidden"
          >
            View all articles
          </Link>
        </div>
      </div>
    </div>
  )
} 