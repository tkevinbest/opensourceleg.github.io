import { PageHero } from "@/components/page-hero";
import { ArrowDown, ExternalLink, Zap, Plane, DollarSign, Download, FileText, ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { hardwareCostData, getTotalCost, formatPrice } from "@/lib/hardware/hardware-cost";
import { hardwareSpecs, specNotes } from "@/lib/hardware/hardware-specs";
import { diyBenefits } from "@/lib/hardware/build-process";
import BuildProcessDiagram from "@/components/build-process-diagram";
import SystemOverviewDiagram from "@/components/system-overview-diagram";
import Image from "next/image";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function Hardware() {
    return (
      <div className="min-h-screen pt-12">
        <PageHero 
          title={
            <>
              Open-Source Leg{" "}
              <span className="font-bold italic">Hardware</span>
            </>
          }
          description="Designed to be easy to manufacture, assemble, and repair"
          primaryButton={{
            href: "#specsheet",
            text: "View Specsheet",
            icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          }}
          secondaryButton={{
            href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
            text: "View on Onshape",
            icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
            target: "_blank"
          }}
        />
        
        {/* Hardware Video Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <video 
              className="w-full rounded-2xl shadow-2xl border-2 border-black"
              autoPlay
              muted
              loop
              preload="metadata"
            >
              <source src="/videos/opensourceleg-hardware.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Text Content */}
            <div className="space-y-6 max-w-6xl mx-auto">
              <p className="text-base text-gray-600 leading-relaxed text-justify">
                The Open-Source Leg hardware is a robust and relatively inexpensive system that can be easily manufactured, assembled, and controlled. Through this website, researchers have access to downloadable hardware files so that they can enter the research field without having to design a prosthetic leg themselves. Ultimately, having a ubiquitous leg will help facilitate comparison between control strategies, potentially streamlining the field towards highly functional robotic prosthetic legs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Design Philosophy Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Design{" "}
                <span className="relative font-medium italic">
                  Philosophy
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
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                The OSL is assembled from both machined and stock components. In selecting components, we minimized 
                price, lead times for machined parts, and the number of vendors. To ensure broad accessibility for 
                researchers across diverse backgrounds, we adhered to key design principles.
              </p>
            </div>
            
            {/* Design Principles */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Simplicity */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl text-[var(--white)] font-semibold flex items-center gap-2 justify-center">
                  Simplicity
                  <Zap className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  The OSL is designed to be assembled, controlled, and maintained with moderate &apos;hands-on&apos; skills. 
                  We streamlined the number of components and suppliers, with the majority of parts machined from 
                  a single supplier, minimizing dependencies on precision machine components.
                </p>
              </div>
              
              {/* Portability */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--white)] flex items-center gap-2 justify-center">
                  Portability
                  <Plane className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  We prioritized portability by ensuring the OSL weighs less than its biological counterpart. 
                  Each joint is equipped with on-board batteries, sensing, and control, facilitating research 
                  activities outside of traditional laboratory settings.
                </p>
              </div>
              
              {/* Economical */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--white)] flex items-center gap-2 justify-center">
                  Economical
                  <DollarSign className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  The OSL is a cost-effective solution, ranging from approximately $10,500 to $23,000, depending 
                  on degrees of freedom and sensing options. This stands in stark contrast to commercial powered 
                  prostheses, which can cost up to $100,000.
                </p>
              </div>
            </div>
            
            {/* Cost Breakdown Table */}
            <div className="bg-transparent rounded-2xl p-8 border border-black shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-black text-center">Hardware Cost Breakdown</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-gray-900">Component</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900">Price (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hardwareCostData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-700">{item.component}</TableCell>
                      <TableCell className="text-right text-gray-700">{formatPrice(item.price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-gray-300 font-semibold">
                    <TableCell className="sm:text-xl text-black font-medium italic">Total</TableCell>
                    <TableCell className="sm:text-xl text-right text-black font-bold italic">{formatPrice(getTotalCost())}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-gray-500 mt-4 italic text-center">
                Thanks to <span className="font-bold italic">Rachel Gehlhar Humann</span> for providing the latest prices for machined parts, actuators, bearings, and fasteners.
              </p>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                  <Button 
                    variant="outline"
                    href="https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=share_link&ouid=101976074095932955884&rtpof=true&sd=true"
                    target="_blank"
                    className="bg-transparent border-black text-black hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Detailed BOM
                  </Button>
                  
                  <Button 
                    className="bg-[var(--light-blue)] text-black border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
                    href="/hardware/downloads"
                    target="_blank"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                    Downloads
                  </Button>
                </div>              
            </div>
            
            {/* Customization Note */}
            <p className="bg-transparent text-black/70 leading-relaxed text-justify">
              The OSL is designed to be highly customizable. Researchers have the flexibility to tailor the device to their 
              specific needs, including adjusting the knee&apos;s series elastic element, selecting the foot type, and incorporating 
              a load cell, among other options. Both the knee and ankle function either as a series elastic actuator (SEA) or 
              rigid actuator, and the stiffness can be selected using custom designed spring disks that fit inside the output 
              pulley without changing the OSL&apos;s volume.
            </p>
          </div>
        </section>

        {/* Hardware Comparison Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Title and Changes */}
              <div className="space-y-6 flex flex-col gap-4 justify-between h-full">
                <h2 className="text-3xl font-light text-gray-900">
                  Open-Source Leg <span className="relative font-bold italic">
                    v2.0
                    <svg 
                      className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                      viewBox="0 0 200 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M2 10C60 6 140 6 198 8" 
                        stroke="var(--light-blue)" 
                        strokeWidth="12" 
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  The OSL v2 represents a significant evolution informed by community feedback, 
                  focusing on simplicity, portability, and enhanced technical capabilities.
                </p>

                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--light-blue)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Simplified from 3-stage to single-stage belt drive transmission</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--light-blue)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Reduced hardware costs and simplified assembly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--light-blue)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Identical knee and ankle drivetrains for part sharing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--light-blue)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Doubled ankle range of motion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--light-blue)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Improved belt tensioning system with precision adjustment</span>
                  </li>
                </ul>
              </div>
              
              {/* Right Column - Comparison Slider */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-black">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage 
                      src="/hardware/osl-v1-info.svg" 
                      alt="Open-Source Leg Version 1" 
                      style={{ objectFit: 'contain' }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage 
                      src="/hardware/osl-v2-info.svg" 
                      alt="Open-Source Leg Version 2" 
                      style={{ objectFit: 'contain' }}
                    />
                  }
                  position={35}
                  className="w-full aspect-auto"
                />
                
                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Version 1
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Version 2
                </div>
              </div>
            </div>
          </div>
        </section>


        
        {/* System Overview Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                System{" "}
                <span className="relative font-medium italic">
                  Overview
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                    viewBox="0 0 200 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2 10C60 6 140 6 198 8" 
                      stroke="var(--light-blue)" 
                      strokeWidth="6" 
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto py-4">
                The Open-Source Leg is a modular and extensible platform designed to support a wide range of research applications.
                Researchers can swap out any of the components described below to create a custom system for their specific research needs and share their designs with the community.
              </p>
            </div>
            
            {/* System Diagram */}
            <div className="mb-12">
              <SystemOverviewDiagram />
            </div>
          </div>
        </section>
        

        {/* Build Your OSL Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Build{" "}
                <span className="relative font-medium italic">
                  Your
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
                {" "}Open-Source Leg
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Build your own Open-Source Leg with complete design files, detailed documentation, and video tutorials.
                This approach offers maximum flexibility and learning opportunities.
              </p>
            </div>
            
            {/* Build Process Diagram */}
            <div className="mb-16">
              <BuildProcessDiagram />
            </div>
            
            {/* Benefits and Actions Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                                 {/* Left Column - Action Buttons Grid */}
                 <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full">
                   <Button 
                     href="https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=share_link&ouid=101976074095932955884&rtpof=true&sd=true"
                     target="_blank"
                     className="w-full h-full bg-[var(--white)] text-black hover:bg-[var(--light-green)] hover:text-black border border-black rounded-lg p-4 text-sm sm:text-base font-medium flex flex-col items-center justify-center gap-3 text-center"
                   >
                     <FileText className="w-6 h-6 flex-shrink-0" />
                     <span className="leading-tight">Bill of Materials</span>
                   </Button>
                   
                   <Button 
                     href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
                     target="_blank"
                     className="w-full h-full bg-[var(--black)] text-white hover:bg-[var(--light-blue)] border border-black rounded-lg p-4 text-sm sm:text-base font-medium flex flex-col items-center justify-center gap-3 text-center"
                   >
                     <ExternalLink className="w-6 h-6 flex-shrink-0" />
                     <span className="leading-tight">Edit on Onshape</span>
                   </Button>
                   
                   <Button 
                     href="/hardware/downloads"
                     target="_blank"
                     className="w-full h-full bg-[var(--black)] text-white hover:bg-[var(--light-blue)] border border-black rounded-lg p-4 text-sm sm:text-base font-medium flex flex-col items-center justify-center gap-3 text-center"
                   >
                     <Download className="w-6 h-6 flex-shrink-0" />
                     <span className="leading-tight">Download Design Files</span>
                   </Button>
                   
                   <Button 
                     href="/tutorials"
                     className="w-full h-full bg-[var(--white)] text-black hover:bg-[var(--light-green)] hover:text-black border border-black rounded-lg p-4 text-sm sm:text-base font-medium flex flex-col items-center justify-center gap-3 text-center"
                   >
                     <ArrowUpRight className="w-6 h-6 flex-shrink-0" />
                     <span className="leading-tight">How to Assemble</span>
                   </Button>
                 </div>
                
                {/* Right Column - Benefits */}
                <div className="space-y-4 border border-black rounded-2xl p-8 shadow-xl">
                  {diyBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Commercial Option & Partnership */}
            <div className="mt-36 max-w-6xl mx-auto bg-[var(--black)] text-white border-2 border-black rounded-3xl p-16 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl text-white mb-2">
                    <span className="relative font-medium italic">
                      Commercial
                      <svg 
                        className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                        viewBox="0 0 200 12" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M2 10C60 6 140 6 198 8" 
                          stroke="var(--light-blue)" 
                          strokeWidth="6" 
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    {" "}Option
                  </h3>
                </div>
                <div className="p-3">
                  <Image 
                    src="/logo/other/humotech-logo.svg" 
                    alt="Humotech Logo" 
                    width={120}
                    height={32}
                    className="h-6 w-auto"
                  />
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Full Width Paragraph */}
                <p className="text-white/90 leading-relaxed text-justify">
                  For research groups who prefer to purchase rather than build, you can get either a preassembled Open-Source Leg or a kit of parts from{" "}
                  Humotech, a commercial supplier of wearable robotics devices. 
                  Humotech has supplied 7+ OSLs across USA, Canada, and Europe. <span className="font-bold">We do not profit from any of the commercial services that Humotech offers</span>, 
                  our collaboration with Humotech is designed only to occasionally help them support their customers with any technical questions and make the Open-Source Leg platform readily accessible for the research community.
                </p>
                
                {/* Pricing Boxes & Actions */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-transparent text-white rounded-2xl p-6 border border-white/30 text-center shadow-xl">
                    <div className="mb-4">
                      <h4 className="font-medium text-lg mb-1">Fully Assembled</h4>
                    </div>
                    <div className="border-t border-white/40 pt-4">
                      <p className="text-3xl font-semibold mb-1">$100,000+</p>
                      <p className="text-white/50 text-xs uppercase tracking-wide">USD</p>
                    </div>
                  </div>
                  
                  <div className="bg-transparent text-white rounded-2xl p-6 border border-white/30 text-center shadow-xl">
                    <div className="mb-4">
                      <h4 className="font-medium text-lg mb-1">Parts Kit</h4>
                    </div>
                    <div className="border-t border-white/40 pt-4">
                      <p className="text-3xl font-semibold mb-1">$55,000+</p>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">USD</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 h-full">
                    <Button 
                      href="https://humotech.com"
                      target="_blank"
                      className="flex-1 bg-[var(--light-blue)] text-black border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-4 text-base sm:text-lg flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Humotech
                    </Button>
                    
                    <Button 
                      variant="outline"
                      href="mailto:opensourceleg@gmail.com"
                      className="flex-1 bg-white border-black text-black hover:bg-[var(--light-green)] hover:text-black rounded-lg px-4 text-base sm:text-lg flex items-center justify-center gap-2"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Spec Sheet Section */}
        <section id="specsheet" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Technical{" "}
                <span className="relative font-medium italic">
                  Specifications
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
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Complete technical specifications for the Open-Source Leg hardware platform
              </p>
            </div>
            
            {/* Spec Table */}
            <div className="bg-[var(--black)] rounded-2xl p-8 border-2 border-black shadow-2xl">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/20">
                    <TableHead className="text-left font-light text-white/70 text-lg">Property</TableHead>
                    <TableHead className="text-right font-light text-white/70 text-lg">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hardwareSpecs.map((spec, index) => (
                    <TableRow key={index} className="border-b border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-light py-4">{spec.property}</TableCell>
                      <TableCell className="text-right text-white py-4">
                        <span className="font-semibold text-[var(--white)]">{spec.value}</span>
                        {spec.unit && <span className="text-[var(--white)] ml-1">{spec.unit}</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Notes Section */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="space-y-2">
                  {specNotes.map((note, index) => (
                    <p key={index} className="text-sm text-white/70 leading-relaxed">
                      • {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
      
    );
  }