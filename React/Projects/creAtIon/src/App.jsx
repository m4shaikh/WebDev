import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
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
    <Navbar theme={theme} setTheme={setTheme} />
  )
}

export default App
