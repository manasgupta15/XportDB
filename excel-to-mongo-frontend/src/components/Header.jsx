// const Header = () => {
//   return (
//     <header className="w-full bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-2xl font-bold">XportDB</h1>

//         {/* Navigation Links */}
//         <nav className="hidden md:flex space-x-6">
//           <a href="#" className="hover:underline">
//             Home
//           </a>
//           <a href="#" className="hover:underline">
//             Features
//           </a>
//           <a href="#" className="hover:underline">
//             Pricing
//           </a>
//           <a href="#" className="hover:underline">
//             Contact
//           </a>
//         </nav>

//         {/* Get Started Button */}
//         <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
//           Get Started
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div
              className={`w-8 h-8 rounded-full ${
                scrolled ? "bg-blue-600" : "bg-blue-600"
              }`}
            ></div>
            <span
              className={`text-2xl font-bold ${
                scrolled ? "text-blue-600" : "text-blue-600"
              }`}
            >
              XportDB
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`relative text-sm font-medium group ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                    scrolled ? "bg-blue-600" : "bg-white"
                  } transition-all duration-300 group-hover:w-full`}
                ></span>
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 hover:bg-gray-100"
              }`}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`md:hidden p-2 rounded-md focus:outline-none ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 space-y-6">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 5 }}
                      className="block text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-200">
                  <motion.a
                    href="#get-started"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
