import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import Router from './utils/Router';
import Route from "./utils/Route";
import Root from "./pages/Root" 
import About from "./pages/About"; 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<Route path="/" component={<Root />} />
		<Route path="/about" component={<About />} />
	</Router>
);
