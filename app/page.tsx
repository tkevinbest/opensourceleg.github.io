import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Move3DIcon,
  Github,
  ArrowRight,
  VideotapeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowUpRight,
  ArrowDown
} from "lucide-react"
import { toolPanels } from "@/lib/assets"
import { statsPanels } from "@/lib/stats"
import { researchPapers } from "@/lib/research"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LatestArticleStrip } from "@/components/latest-article-strip"
import LottieAnimation from "@/components/lottie-animation"

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 8rem)' }}>
        {/* Main content - flex-grow to take available space */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-8 pb-12 sm:pt-12 sm:pb-16">
          {/* Lottie Animation */}
          <LottieAnimation />

          {/* Main headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 max-w-5xl leading-tight heading">
            <span className="text-black">Open-Source Leg</span>{" "}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 max-w-2xl sm:max-w-3xl leading-relaxed px-2">
            An end-to-end open-source platform that makes
            prosthetics research more accessible, collaborative, and reproducible.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              href="https://github.com/neurobionics/opensourceleg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              View on GitHub
            </Button>
            <Button
              href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <Move3DIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              View on Onshape
            </Button>
          </div>
        </main>

        {/* Bottom strips - naturally stacked at bottom */}
        <div className="flex-shrink-0">
          {/* Yellow Strip */}
          <div className="bg-[var(--light-green)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="py-6">
                {/* Empty content div to match LatestArticleStrip height */}
              </div>
            </div>
          </div>

          {/* Latest Article Strip */}
          <LatestArticleStrip />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[var(--black)] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[60vh] sm:h-[60vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full h-full py-16 sm:py-20 lg:py-24">
            {/* Left Content - Video */}
            <div className="h-full flex items-center order-2 lg:order-1 mb-8 lg:mb-0">
              {/* YouTube Video Embed */}
              <div className="border border-[var(--white)] relative w-full h-0 pb-[56.25%] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl"
                  src="https://www.youtube.com/embed/xFliFk65l3Q?autoplay=1&mute=1"
                  title="OpenSource Leg Intro"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Right Content - Quote */}
            <div className="h-full flex items-center order-1 lg:order-2">
              <div className="relative w-full">
                {/* Quote SVG Icon */}
                <svg 
                  className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 text-white/20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
                
                <blockquote className="text-white py-4 sm:py-8">
                  <p className="text-lg sm:text-xl lg:text-2xl  leading-relaxed mb-6 sm:mb-8 text-justify">
                    We want to give people access to the tools needed to overcome the barriers preventing these technologies from impacting the lives of people with disabilities.
                  </p>
                  <footer className="text-white/60 text-base sm:text-lg">
                    <cite>— Prof. Elliott Rouse, University of Michigan</cite>
                  </footer>
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Community & Partners Section */}
      <div className="bg-[var(--light-blue)] text-white py-16 sm:py-16 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Centered heading */}
            <h3 className="text-xl sm:text-2xl md:text-3xl  font-serif px-2">
              Trusted by <span className="px-1 sm:px-2 text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--light-green)]">25+</span> research institutions worldwide
            </h3>

            {/* Researchers carousel */}
            <div className="logo-carousel-container">
              <div className="logo-carousel-track slow">
                {/* First set of logos */}
                <Image 
                  src="/logo/other/logo-strip-1.png" 
                  alt="Research institutions - strip 1" 
                  width={600}
                  height={72}
                  className="h-12 sm:h-16 object-contain flex-shrink-0"
                />
                <Image 
                  src="/logo/other/logo-strip-2.png" 
                  alt="Research institutions - strip 2" 
                  width={600}
                  height={72}
                  className="h-12 sm:h-16 object-contain flex-shrink-0"
                />
                {/* Duplicate set for seamless infinite loop */}
                <Image 
                  src="/logo/other/logo-strip-1.png" 
                  alt="Research institutions - strip 1" 
                  width={600}
                  height={72}
                  className="h-12 sm:h-16 object-contain flex-shrink-0"
                />
                <Image 
                  src="/logo/other/logo-strip-2.png" 
                  alt="Research institutions - strip 2" 
                  width={600}
                  height={72}
                  className="h-12 sm:h-16 object-contain flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leverage Section */}
      <div className="py-24 sm:py-32 px-4 sm:px-6 my-16">
        <div className="max-w-7xl mx-auto">
          {/* Main headline */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8">
                <span className="relative heading">
                  Leverage
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                    viewBox="0 0 200 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2 10C60 6 140 6 198 8" 
                      stroke="var(--light-green)" 
                      strokeWidth="6" 
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
              the Open-Source Leg ecosystem
            </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed text-balance px-2">
                Essential tools and resources for building, testing, and iterating<br className="hidden sm:block" />
                on next-generation prosthetics control systems or general robotics applications.
              </p>
          </div>

          {/* Tool panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {toolPanels.map((tool) => {
              const IconComponent = tool.icon
              return (
                <a 
                  key={tool.id}
                  href={tool.href}
                  target="_blank"
                  className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-64 sm:h-80 flex flex-col justify-between border border-[var(--black)] hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-1 flex items-center justify-center relative">
                    <IconComponent 
                      className="w-16 h-16 text-[var(--black)] group-hover:scale-110 group-hover:text-[var(--light-blue)] transition-transform duration-300" 
                      strokeWidth={1.0}
                    />
                    <div className="absolute top-1/2 left-1/2 transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform duration-300">
                      <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                        <Image 
                          src={tool.logo}
                          alt={`${tool.title} logo`}
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-md:hidden">{tool.description}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Hardware Section */}
      <div className="bg-[var(--black)] max-w-7xl mx-auto rounded-2xl sm:rounded-[2rem] text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-20 my-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 flex flex-col gap-3 sm:gap-4 justify-center">
            {/* Main headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  leading-tight">
              Built for <span className="relative text-[var(--light-green)] heading font-medium">engineers
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-blue)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--white)] leading-relaxed mb-6 sm:mb-8">
              The Open-Source Leg hardware is a robust and relatively inexpensive system that 
              can be easily manufactured, assembled, and controlled.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                  <Button
                    href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
                    className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    <Move3DIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    View on Onshape
                  </Button>
                  <Button
                    href="/hardware/tutorials"
                    className="max-xl:hidden bg-transparent text-white border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Tutorials <VideotapeIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button
                    href="/hardware"
                    className="bg-transparent text-white border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Read More <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>                 
              </div>
              
            </div>
          {/* Right Content */}
          <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mt-8 lg:mt-0">
            <Image src="/hardware.webp" alt="Open-Source Leg Hardware" fill className="object-cover" />
          </div>
        </div>
      </div>  

      {/* Software Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 my-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content - Software Screenshot */}
            <div className="w-full lg:w-[80%] xl:w-[90%] rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 border-[var(--black)]">
              <Image src="/software.png" alt="Open-Source Leg Software" width={800} height={800} className="w-full h-auto object-contain" />
            </div>

            {/* Right Content - Description */}
            <div className="space-y-6 sm:space-y-8 flex flex-col gap-3 sm:gap-4 justify-center">
              {/* Main headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  leading-tight">
                Built for <span className="relative text-[var(--light-blue)] heading font-medium">developers
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                    viewBox="0 0 200 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2 10C60 6 140 6 198 8" 
                      stroke="var(--light-green)" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
              The Open-Source Leg software is designed to be modular and flexible to allow for easy integration with a wide variety of sensors and robotics frameworks.
              The software library is written in Python and is compatible with Python 3.9 and above.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <Button
                  href="https://github.com/neurobionics/opensourceleg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--light-blue)] text-white border border-black hover:text-black hover:bg-[var(--light-green)] rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  View on GitHub
                </Button>
                <Button
                  href="https://neurobionics.github.io/opensourceleg/"
                  target="_blank"
                  variant="outline"
                  className="max-xl:hidden bg-transparent text-black border border-black hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Documentation <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button
                  href="/software"
                  variant="outline"
                  className="bg-transparent text-black border border-black hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Read more <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Section */}
      <div className="bg-[var(--light-blue)] max-w-7xl mx-auto rounded-2xl sm:rounded-[2rem] text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-20 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 flex flex-col gap-3 sm:gap-4 justify-center">
            {/* Main headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  leading-tight">
              Built for <span className="relative text-[var(--light-green)] heading font-medium">researchers
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--white)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--white)] leading-relaxed mb-6 sm:mb-8 text-balance">
              The platform was founded to enable direct comparisons between different prosthetic control strategies and algorithms across standardized hardware.
              Explore cutting-edge research publications and datasets from the Open-Source Leg community.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                  <Button
                    href="/research/controllers"
                    className="bg-transparent text-white border border-white hover:bg-[var(--white)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Downloads <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button
                    href="/research"
                    className="bg-transparent text-white border border-white hover:bg-[var(--white)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Publications <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>   
                  <Button
                    href="/research"
                    className="bg-[var(--light-green)] text-black border hover:bg-[var(--white)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    Add Your Publication <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>                                
              </div>
              
            </div>

          {/* Right Content - Research Papers */}
          <div className="relative">
            {/* Desktop Layout - Absolute Positioned */}
            <div className="hidden lg:block relative h-[24rem] lg:h-[26rem] xl:h-[28rem] w-full">
              {researchPapers.slice().reverse().map((paper) => (
                <a 
                  key={paper.id}
                  href={paper.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute ${paper.position.top} ${paper.position.left} w-48 xl:w-72 h-64 xl:h-90 group cursor-pointer transform ${paper.rotation} ${paper.zIndex}`}
                >
                  <Image 
                    src={paper.image} 
                    alt={paper.title} 
                    fill 
                    className="object-cover rounded-md border-2 border-black group-hover:border-[var(--light-green)] shadow-lg group-hover:shadow-2xl group-hover:scale-105 group-hover:z-50 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>  

      {/* Stats Section */}
      <div className="pt-12 sm:pt-10 pb-20 sm:pb-24 px-4 sm:px-6 my-20">
        <div className="max-w-7xl mx-auto">
          {/* Main headline */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  mb-6 sm:mb-8">
              Built and tested by the{" "}
                <span className="relative font-medium heading">
                  Community
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                    viewBox="0 0 200 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2 10C60 6 140 6 198 8" 
                      stroke="var(--light-green)" 
                      strokeWidth="6" 
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
            </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-balance px-2">
                Our open-source tools are continuously improved through community contributions &
                testing across research institutions worldwide.
              </p>
          </div>

          {/* stats panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {statsPanels.map((stat) => {
              const TrendIcon = stat.trend === "up" ? TrendingUpIcon : TrendingDownIcon
              const trendColor = stat.trend === "up" ? "text-green-600" : "text-red-600"
              
              return (
                <Card key={stat.id} className="@container/card bg-[var(--black)] text-white border-gray-700">
                  <CardHeader className="pb-3">
                    <CardDescription className="text-gray-300 text-sm">{stat.title}</CardDescription>
                    <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                      {stat.value.toLocaleString()}
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline" className={`${trendColor} max-md:hidden font-semibold p-1.5 sm:p-2 text-xs sm:text-sm border-gray-600`}>
                        <TrendIcon className="w-3 h-3 mr-1"/>
                        +{stat.trendValue}%
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      <a href={stat.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--light-blue)] transition-colors">
                        View {stat.title} →
                      </a>
                    </div>
                    <div className="text-gray-400 text-xs leading-relaxed">
                      {stat.description}
                    </div>
                  </CardFooter>
                </Card>
                            )
            })}
          </div>
          
          {/* Data timeframe note */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-xs text-muted-foreground">
              Based on data collected over the last 6 months.
            </p>
          </div>
        </div>
      </div>

        {/* Community Section */}
        <div className="bg-[var(--light-blue)] py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white">
                  <span className="relative font-medium heading">
                    Join
                    <svg 
                      className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                      viewBox="0 0 200 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M2 10C60 6 140 6 198 8" 
                        stroke="var(--light-green)" 
                        strokeWidth="12" 
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span> the community!
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                  Join our wonderful community of students, engineers, and researchers driving groundbreaking advancements in prosthetics.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    href="https://opensourceleg.discourse.group/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[var(--light-blue)] border border-white hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Forum <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button
                    href="/about"
                    variant="outline"
                    className="bg-transparent text-white border border-white hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Read More
                  </Button>
                </div>
              </div>

              <div className="relative">
                {/* Desktop Layout - Absolute Positioned */}
                <div className="hidden lg:block relative h-80 lg:h-88 xl:h-96">
                  {/* Image 1 - Top Left */}
                  <div className="absolute top-0 left-0 w-60 lg:w-72 xl:w-80 h-40 lg:h-48 xl:h-64 rounded-2xl overflow-hidden shadow-lg transform -rotate-2 border-4 border-[var(--white)]">
                    <Image 
                      src="/community/ssnr.jpg" 
                      alt="Community member working on prosthetics" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Image 2 - Center Right */}
                  <div className="absolute top-12 lg:top-16 right-0 w-48 lg:w-56 xl:w-64 h-32 lg:h-40 xl:h-48 rounded-2xl overflow-hidden shadow-lg transform rotate-4 border-4 border-[var(--white)]">
                    <Image 
                      src="/community/iros.webp" 
                      alt="Research team collaboration" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Image 3 - Bottom Left */}
                  <div className="absolute -bottom-4 left-44 lg:left-52 xl:left-60 w-36 lg:w-40 xl:w-48 h-24 lg:h-28 xl:h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-2 border-4 border-[var(--white)]">
                    <Image 
                      src="/community/fsu.jpg" 
                      alt="Open source hardware development" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
           
    </div>
  )
}
