import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src="/press-and-parcel-logo.png" alt="Press & Parcel logo" />
          <div>
            <strong>Press & Parcel</strong>
            <span>Brand. Print. Deliver.</span>
          </div>
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav className={open ? "main-nav open" : "main-nav"}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          <NavLink to="/industries" onClick={closeMenu}>Industries</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <Link className="nav-cta" to="/quote" onClick={closeMenu}>
            Get a Quote <ArrowUpRight size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
