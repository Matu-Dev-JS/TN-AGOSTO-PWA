import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
		
	</BrowserRouter>
)
