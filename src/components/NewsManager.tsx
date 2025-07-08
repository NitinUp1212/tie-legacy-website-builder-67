
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Calendar, User } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

const NewsManager = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "New Property Registration Guidelines Released",
      content: "The government has released new guidelines for property registration that will come into effect from next month. These changes aim to simplify the registration process and reduce paperwork.",
      author: "Legal Team",
      date: "2024-12-15",
      category: "Legal Updates"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingId !== null) {
      setNews(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, date: new Date().toISOString().split('T')[0] }
          : item
      ));
      toast({
        title: "News Updated",
        description: "The news article has been updated successfully.",
      });
    } else {
      const newItem: NewsItem = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setNews(prev => [...prev, newItem]);
      toast({
        title: "News Created",
        description: "New news article has been created successfully.",
      });
    }

    setFormData({ title: "", content: "", author: "", category: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: NewsItem) => {
    setFormData({
      title: item.title,
      content: item.content,
      author: item.author,
      category: item.category
    });
    setIsEditing(true);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    setNews(prev => prev.filter(item => item.id !== id));
    toast({
      title: "News Deleted",
      description: "The news article has been deleted successfully.",
    });
  };

  const handleCancel = () => {
    setFormData({ title: "", content: "", author: "", category: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {isEditing ? "Edit News Article" : "Create New News Article"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter news title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Enter author name"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter news content"
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEditing ? "Update News" : "Create News"}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage News Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {news.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No news articles found. Create your first news article above.</p>
            ) : (
              news.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {item.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.content.length > 200 
                      ? `${item.content.substring(0, 200)}...` 
                      : item.content
                    }
                  </p>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManager;
