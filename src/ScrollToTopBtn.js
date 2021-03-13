import React, {useState} from 'react'; 
import {ReactComponent as ArrowUpIcon} from './assets/img/arrow-up-solid.svg';
import './ScrollToTopBtn.scss';
  
const ScrollToTopBtn = () =>{ 
  
  const [visible, setVisible] = useState(false) 
  
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 300){ 
      setVisible(true) 
    }  
    else if (scrolled <= 300){ 
      setVisible(false) 
    } 
  }; 
  
  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  
  window.addEventListener('scroll', toggleVisible); 
  
  return ( 
    <button className="gtt-btn" onClick={scrollToTop}  
    style={{display: visible ? 'inline' : 'none'}}> 
     <ArrowUpIcon  /> 
    </button> 
  ); 
} 
  
export default ScrollToTopBtn; 