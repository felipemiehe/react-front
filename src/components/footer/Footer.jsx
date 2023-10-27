import React from "react";
import "./styles.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="item2">
                    <span style={{ paddingRight: 5 }}> © </span>

                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} SinDIGITAL
                    </span>
                </div>
                <a
                    href=""
                    target="_blank"
                    className="item3"
                >

                    Política de Privacidade
                </a>
                <a
                    href=""
                    target="_blank"
                    className="item4"
                >

                    Termos de Uso
                </a>
            </div>
        </footer>
    );
};

export default Footer;