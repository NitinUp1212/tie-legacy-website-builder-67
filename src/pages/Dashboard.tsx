
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  User, 
  FileText, 
  Phone, 
  Settings, 
  LogOut,
  BookOpen,
  Users,
  MessageSquare,
  Plus,
  Eye
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogManager from "@/components/BlogManager";
import NewsManager from "@/components/NewsManager";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveTab("blog")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Manage Blog
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("news")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Manage News
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => navigate("/")} className="h-20 flex flex-col">
                    <Home className="w-6 h-6 mb-2" />
                    Homepage
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/about")} className="h-20 flex flex-col">
                    <User className="w-6 h-6 mb-2" />
                    About Us
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/services")} className="h-20 flex flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    Services
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/contact")} className="h-20 flex flex-col">
                    <Phone className="w-6 h-6 mb-2" />
                    Contact
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/blog")} className="h-20 flex flex-col">
                    <BookOpen className="w-6 h-6 mb-2" />
                    Blog
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/book-consultant")} className="h-20 flex flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    Book Consultant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Website settings management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
