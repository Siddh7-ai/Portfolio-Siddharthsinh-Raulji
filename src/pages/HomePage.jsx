import Footer   from '../components/Footer'
import Hero     from '../sections/Hero'
import About    from '../sections/About'
import Skills   from '../sections/Skills'
import Projects from '../sections/Projects'
import Contact  from '../sections/Contact'

export default function HomePage() {
  return (
    <>

      {/*
        HOW THIS WORKS:
        - main has no paddingBottom — footer sits naturally after contact
        - Contact is position:sticky top:0 so when scrolling DOWN it sticks
          and when scrolling UP from footer it slides back DOWN covering the footer
        - Footer is position:relative, normal flow — sits below contact
        - This gives the "curtain" effect: contact covers footer on scroll up
      */}
      <main style={{ position: 'relative' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />

        {/* Contact is sticky — slides over footer when scrolling up */}
        <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  )
}