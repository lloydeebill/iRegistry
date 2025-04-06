import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import PoweredBy from './components/PoweredBy'
import AboutSection from './components/AboutSection'
import CalltoAction from './components/CalltoAction'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F1F1F1] container mx-auto px-12 py-4">
      <Navbar/>
      <div className="container mt-20 mx-auto px-12 py-0">
        <HeroSection/>
        <AboutSection/>
        <CalltoAction/>
        <Footer/>
      </div>
    </main>
  )
}
