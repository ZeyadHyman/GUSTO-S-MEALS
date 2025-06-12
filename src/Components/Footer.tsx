import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUtensils, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    { name: "Categories", path: "/categories" },
    { name: "Random Meal", path: "/random-meal" },
    { name: "AI Chef", path: "/ai-chef" },
  ];

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/zeyadhyman", label: "GitHub" },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/zeyadhyman",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com/zeyadhyman",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-primary"></div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 h-10 opacity-50"
        style={{
          backgroundColor: "#f4a261",
          background:
            "linear-gradient(135deg, #8a4a2b55 25%, transparent 25%) -40px 0/ 80px 80px, linear-gradient(225deg, #8a4a2b 25%, transparent 25%) -40px 0/ 80px 80px, linear-gradient(315deg, #8a4a2b55 25%, transparent 25%) 0px 0/ 80px 80px, linear-gradient(45deg, #8a4a2b 25%, #f4a261 25%) 0px 0/ 80px 80px",
        }}
      ></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                  className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl"
                >
                  <FaUtensils className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                    Gusto's Meals
                  </h2>
                  <p className="text-sm text-gray-500">
                    Discover culinary excellence
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Your gateway to exploring world cuisines. From traditional recipes
              to modern culinary innovations, we bring the world's flavors to
              your kitchen.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary"></span>
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary"></span>
                Connect
              </h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="mailto:zeyadhyman@gmail.com"
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></span>
                    Email
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="https://zeyadhyman.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></span>
                    Portfolio
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} Gusto's Meals. All rights reserved.
            </p>
            <div className="text-sm text-gray-600 flex items-center">
              Made by{" "}
              <a
                href="https://zeyadhyman.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Zeyad Hyman
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
