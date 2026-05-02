import React, { Component } from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaInfinity, FaFlask, FaLinux, FaCloud } from 'react-icons/fa';
import "./vendors/css/grid.css";

class ServicesSection extends Component {
  render() {
    return (
        <section className="section-services section-features js--section-features" id="services">
            <div className="row">
                <h2>Service that fits your culture</h2>
                <p className="long-copy">
                    At LaMill, we don't strive for excellence. We start from excellence. We work with you so you can attain your goals faster. You're busy enough getting your valuable idea to market. Let us help you with other aspects of your product development.
                </p>
            </div>

            <Fade left>
                <div className="row">
                    <div className="col span-1-of-4 box">
                        <FaInfinity className="icon-big" />
                        <h3>Full stack</h3>
                        <p>
                            LaMill has successfully executed several full stack projects. Whether your project is Ruby-on-Rails (RoR) with Javascript front end (Reactjs, d3js), or Golang, Python, or even Perl... LaMill can assist you.
                        </p>
                    </div>
                    <div className="col span-1-of-4 box">
                        <FaFlask className="icon-big" />
                        <h3>Hardware Bringup</h3>
                        <p>
                            LaMill also has experience with several bringup projects on various hardware boards. You might need to provide BSP, optimize performance, apply OS bringup on new boards, define new boards - these are all tasks where LaMill can assist you.
                        </p>
                    </div>
                    <div className="col span-1-of-4 box">
                        <FaLinux className="icon-big" />
                        <h3>Linux</h3>
                        <p>
                            At LaMill, we live and breathe Linux. So if you're looking for OS bringup, uboot, boot optimization, advanced TCP/IP optimization, driver development, troubleshooting - look to LaMill. We're ready to assist you.
                        </p>
                    </div>
                    <div className="col span-1-of-4 box">
                        <FaCloud className="icon-big" />
                        <h3>IoT</h3>
                        <p>
                            If you're in the Internet of Things startup industry, you know it has many different areas of technology focus. This makes LaMill your natural IoT ally, since we have deep experience in a wide variety of technology domains. Bonus: LaMill is also ready to assist you with BLE firmware.
                        </p>
                    </div>
                </div>
            </Fade>
        </section>
    );
  }
}

export default ServicesSection;