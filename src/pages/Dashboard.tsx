
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  User, 
  FileText, 
  Phone, 
  Settings, 
  LogOut,
  Edit,
  Eye,
  Plus,
  BookOpen,
  Users,
  MessageSquare
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const loginUser = localStorage.getItem("loginUser");
    
    if (loginStatus === "true" && loginUser) {
      setIsLoggedIn(true);
      setUser(loginUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginUser");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const managementCards = [
    {
      title: "Homepage Management",
      description: "Edit homepage content, hero section, and featured services",
      icon: Home,
      color: "bg-blue-500",
      action: () => navigate("/")
    },
    {
      title: "About Us Page",
      description: "Manage company information and team details",
      icon: User,
      color: "bg-green-500",
      action: () => navigate("/about")
    },
    {
      title: "Services Management",
      description: "Add, edit, and organize legal services offered",
      icon: FileText,
      color: "bg-purple-500",
      action: () => navigate("/services")
    },
    {
      title: "Contact Information",
      description: "Update contact details and office information",
      icon: Phone,
      color: "bg-orange-500",
      action: () => navigate("/contact")
    },
    {
      title: "Blog Management",
      description: "Create and manage blog posts and articles",
      icon: BookOpen,
      color: "bg-red-500",
      action: () => navigate("/blog")
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      color: "bg-indigo-500",
      action: () => toast({ title: "Feature", description: "User management coming soon!" })
    }
  ];

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user}!</h1>
              <p className="text-primary-foreground/80">Manage your website content and settings from here</p>
            </div>
            <Button variant="secondary" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pages</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blog Posts</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Services</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <Settings className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Website Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={card.action}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${card.color} text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{card.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/blog")}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Blog Post
            </Button>
            <Button variant="outline" onClick={() => navigate("/services")}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              <Eye className="w-4 h-4 mr-2" />
              Preview Website
            </Button>
            <Button variant="outline" onClick={() => navigate("/contact")}>
              <Settings className="w-4 h-4 mr-2" />
              Update Contact Info
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
