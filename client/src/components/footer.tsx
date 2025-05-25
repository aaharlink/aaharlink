import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Mail
} from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "Find Restaurants", href: "/search" },
    { name: "Gujarati Cuisine", href: "/search?cuisineType=gujarati" },
    { name: "Punjabi Cuisine", href: "/search?cuisineType=punjabi" },
    { name: "South Indian Cuisine", href: "/search?cuisineType=south-indian" },
    { name: "Popular Cities", href: "/cities" },
  ],
  forOwners: [
    { name: "Add Your Restaurant", href: "/add-restaurant" },
    { name: "Owner Dashboard", href: "/dashboard" },

  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ],
};



export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/">
              <h3 className="text-2xl font-bold font-poppins text-saffron mb-4 cursor-pointer">
                AaharLink
              </h3>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The world's leading directory for authentic Gujarati, Punjabi, and South Indian restaurants. 
              Connecting food lovers with authentic flavors globally.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3" />
                <a href="mailto:support@aaharlink.com" className="hover:text-saffron transition-colors">
                  support@aaharlink.com
                </a>
              </div>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-saffron transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Restaurant Owners */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Restaurant Owners</h4>
            <ul className="space-y-3">
              {footerLinks.forOwners.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-saffron transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-saffron transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-gray-600" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-300 text-center md:text-left">
            <p>© {currentYear} AaharLink. All rights reserved.</p>
            <p>Connecting authentic Indian cuisine lovers worldwide.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-gray-300 text-sm">
              Made with ❤️ for food lovers everywhere
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
}
