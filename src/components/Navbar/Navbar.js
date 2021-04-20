import {useState,useEffect} from 'react';
import axios from "../../axios";
import './Navbar.css';

const Navbar = () => {

const [nav,setNav] = useState('');

useEffect(()=>{
	axios.get("/nav")
	.then(res => setNav(res.data))
},[nav])

 const menuToggle = () =>{

	 document.getElementById('menu-menu').style.display === 'none' ?
	 document.getElementById('menu-menu').style.display =   'block':
	 document.getElementById('menu-menu').style.display = 'none' ;

 }
	return (
		<div className="nav-main">
			<div className="nav-heading">
				<h1><a href="/" >WP-REST-PLAYGROUND </a> </h1>
				<span><i className="fas fa-bars icon" onClick={()=> menuToggle()}></i></span>
			</div>
			<div dangerouslySetInnerHTML={{ __html: nav }} ></div>

		</div>
	)
}

export default Navbar;
