import React from "react"
import { Route, Routes } from "react-router-dom"
import { LoginScreen, RegisterScreen } from "./Screens"
import RecoveryPasswordScreen from "./Screens/RecoveryPasswordScreen"
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen"
import HomeScreen from "./Screens/HomeScreen"
import ProductDetailScreen from "./Screens/ProductDetailScreen"

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<LoginScreen/>}/>
				<Route path="/login" element={<LoginScreen/>}/>
				<Route path="/register" element={<RegisterScreen/>}/>
				<Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
				<Route path="/auth/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>} />
				<Route path="/home" element={<HomeScreen/>}/>
				<Route path="/product/:product_id" element={<ProductDetailScreen/>}/>
			</Routes>
		</div>
	)
}

export default App
