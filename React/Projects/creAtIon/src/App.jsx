import Team from './components/Team';
import CompayList from './components/CompayList';
import Hero from './components/Hero';
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
import Services from './components/Services';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
function App() {

  const [theme, setTheme] = useState(
    () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      } else {
        return 'light'
      }
    }
  );

  useEffect(() => {
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <main className='bg-canvas dark:bg-canvas-dark'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <CompayList />
      <Services />
      <Work/>
      <Team/>
      <Contact/>
      <Footer/>
    </main>
  )
}

export default App
