import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Menu, User, Settings, LogOut, LayoutDashboard } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Find Restaurants", href: "/search" },
    { name: "Cuisines", href: "/cuisines" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0 cursor-pointer">
              <h1 className="text-2xl font-bold font-poppins text-saffron">AaharLink</h1>
              <p className="text-xs text-warm-gray -mt-1">Global Indian Restaurant Directory</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="text-charcoal hover:text-saffron px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/add-restaurant">
                  <Button className="bg-saffron text-white hover:bg-orange-600 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Restaurant
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl || ""} alt={user?.email || ""} />
                        <AvatarFallback className="bg-saffron text-white text-sm">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName && user?.lastName 
                          ? `${user.firstName} ${user.lastName}`
                          : user?.email
                        }
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLocation("/dashboard")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocation("/profile")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = "/api/logout"}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/add-restaurant">
                  <Button className="bg-saffron text-white hover:bg-orange-600 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Restaurant
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost"
                  onClick={() => window.location.href = "/api/login"}
                  className="text-charcoal hover:text-saffron"
                >
                  <User className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a 
                          className="text-charcoal hover:text-saffron px-3 py-2 text-base font-medium transition-colors block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    
                    {!isAuthenticated && (
                      <Button 
                        onClick={() => {
                          window.location.href = "/api/login";
                          setMobileMenuOpen(false);
                        }}
                        className="bg-saffron hover:bg-orange-600 mt-4"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
