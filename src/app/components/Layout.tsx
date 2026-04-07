import { Heart, Package, Truck, Shield, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = location.pathname.split("/")[1];
const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

  const getNavItems = () => {
    switch (role) {
      case "donor":
        return [
          { path: "/donor", label: "Dashboard", icon: Heart },
          { path: "/donor/add-donation", label: "Add Donation", icon: Package },
          { path: "/donor/tracking", label: "Tracking", icon: Truck },
        ];
      case "recipient":
        return [
          { path: "/recipient", label: "Dashboard", icon: Heart },
          { path: "/recipient/request", label: "Request Items", icon: Package },
          { path: "/recipient/tracking", label: "Tracking", icon: Truck },
          { path: "/recipient/feedback", label: "Feedback", icon: Shield },
        ];
      case "admin":
        return [
          { path: "/admin", label: "Dashboard", icon: Shield },
          { path: "/admin/drives", label: "Manage Drives", icon: Package },
        ];
      case "logistics":
        return [
          { path: "/logistics", label: "Dashboard", icon: Truck },
          { path: "/logistics/panel", label: "Delivery Panel", icon: Package },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-xl font-semibold">DonateConnect</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-md w-full"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
