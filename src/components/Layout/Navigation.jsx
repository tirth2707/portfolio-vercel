import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#home", type: "anchor" },
  { name: "About", href: "#about", type: "anchor" },
  { name: "Experience", href: "#experience", type: "anchor" },
  { name: "Certifications", href: "#certifications", type: "anchor" },
  { name: "Skills", href: "#skills", type: "anchor" },
  { name: "Education", href: "#education", type: "anchor" },
  { name: "Contact", href: "#contact", type: "anchor" },
  { name: "Blogs", href: "/blog", type: "link" },
];

const Navigation = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Only run scroll logic if we are on the homepage
    if (window.location.pathname !== "/") return;
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, item) => {
    console.log("🚀 ~ handleClick ~ item:", item)
    console.log("🚀 ~ handleClick ~ e:", e)
    if (item.type === "link") {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    const element = document.querySelector(item.href);
    console.log("🚀 ~ handleClick ~ element:", element)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      navigate(`/${item.href}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleClick(e, item)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {item.name}
              </Link>
            )
          }
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === item.href.substring(1)
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              {item.name}
            </a>
          )
        })}
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col">
              {navItems.map((item) => {
                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleClick(e, item)}
                      className={`px-6 py-3 text-sm font-medium transition-colors ${
                        activeSection === item.href.substring(1)
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                }
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item)}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${
                      activeSection === item.href.substring(1)
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
