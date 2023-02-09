import { Box } from '@mui/system'
import React from 'react'
import "./details.css"
import {Link} from 'react-scroll'
function Details() {
  return (
    <Box className="detailsContainer">
      
<footer id="dk-footer" class="dk-footer">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-4">
                    <div class="dk-footer-box-info">
                        
                        <p class="footer-info-text">
                        A premier barbershop offering expert haircuts, shaves and grooming services in a welcoming atmosphere.                        </p>
                        <div class="footer-social-link">
                            <h3>Follow us</h3>
                            <ul>
                                <li>
                                    <a href="">
                                        <i class="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i class="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i class="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i class="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                       
                    </div>
                    
                    <div class="footer-awarad">
                        <img src="images/icon/best.png" alt=""/>
                        <p>invisable</p>
                    </div>
                </div>
                
                <div class="col-md-12 col-lg-8">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="contact-us">
                                <div class="contact-icon">
                                    <i class="fa fa-map-o" aria-hidden="true"></i>
                                </div>
                               
                                <div class="contact-info">
                                    <h3>Ramat-Gan,Israel</h3>
                                    <p>Hilazon 3</p>
                                </div>
                                
                            </div>
                           
                        </div>
                        
                        <div class="col-md-6">
                            <div class="contact-us contact-us-last">
                                <div class="contact-icon">
                                    <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                                </div>
                                
                                <div class="contact-info">
                                    <h3>+972-50-858-0143</h3>
                                    <p>Give us a call</p>
                                </div>
                               
                            </div>
                            
                        </div>
                        
                    </div>
                   
                    <div class="row">
                        <div class="col-md-12 col-lg-6">
                            <div class="footer-widget footer-left-widget">
                                <div class="section-heading">
                                    <h3>Useful Links</h3>
                                    <span class="animate-border border-black"></span>
                                </div>
                                <ul>
                                    <li>
                                        <a href=""><Link  to="about" spy={true} smooth={true}> About us</Link></a>
                                    </li>
                                    <li>
                                    <a href="">Contact us</a>
                                    </li>
                                    <li>
                                        <a href=""><Link  to="results" spy={true} smooth={true}>Our Results</Link></a>
                                    </li>
                                    <li>
                                        <a href=""><Link  to="team" spy={true} smooth={true} >Our team</Link></a>
                                    </li>
                                </ul>
                               
                            </div>
                           
                        </div>
                        
                        <div class="col-md-12 col-lg-6">
                            <div class="footer-widget">
                                <div class="section-heading">
                                    <h3>Subscribe</h3>
                                    <span class="animate-border border-black"></span>
                                </div>
                                <p>
                                Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
                                <form action="">
                                    <div class="form-row">
                                        <div class="col dk-footer-form">
                                            <input type="email" class="form-control" placeholder="Email Address"/>
                                            <button type="submit">
                                                <i class="fa fa-send"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                               
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            
        </div>
       

        <div class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <span>Copyright © 2019, All Right Reserved Seobin</span>
                    </div>
                   
                    <div class="col-md-6">
                        <div class="copyright-menu">
                            <ul>
                                
                                <li>
                                    <a href="">Terms</a>
                                </li>
                                <li>
                                    <a href="">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        
        
        
        
</footer>

        {/* <Box component="p" sx={{fontSize:{lg:'5vw',xs:'12vw'}}} className='detailsHeader'>Details</Box> */}

    </Box>
  )
}

export default Details