import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(clientId)
const Root = ():React.JSX.Element => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <App/>
    </GoogleOAuthProvider>
  )
}

export default Root

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter >
    <StrictMode>      
      <Root/>
    </StrictMode>
  </BrowserRouter>
)
