import React from "react";

export default function Header() {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img
                        src="https://bulma.io/images/bulma-logo-white.png"
                        alt="Bulma: a modern CSS framework based on Flexbox"
                        width="112"
                        height="28"
                    />
                </a>
            </div>
        </nav>
    );
}
