
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Calendar, Save } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Why Sale Deed is the Most Crucial Legal Document in Property Transactions',
      content: 'In the Indian real estate market, property frauds and legal disputes are more common than ever. Whether you\'re buying a plot, flat, or commercial shop — the Sale Deed is the most important legal document that ensures you are the lawful owner of the property.',
      excerpt: 'In the Indian real estate market, property frauds and legal disputes are more common than ever. Whether you\'re buying a plot, flat, or commercial shop — the Sale Deed is the most important legal document that ensures you are the lawful owner of the property.',
      author: 'Advocate Ajay Shankar Sharma',
      date: '2024-12-15',
      image: '/lovable-uploads/315b4579-da29-4b6d-931b-adccdbf5ccee.png',
      tags: ['Property Law', 'Sale Deed', 'Legal Advice']
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Advocate Ajay Shankar Sharma',
    image: '',
    tags: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    if (editingId) {
      // Update existing post
      setBlogPosts(prev => prev.map(post => 
        post.id === editingId 
          ? { 
              ...post, 
              ...formData,
              tags: tagsArray,
              date: new Date().toISOString().split('T')[0]
            }
          : post
      ));
      toast({
        title: "Blog Updated",
        description: "Blog post has been updated successfully.",
      });
    } else {
      // Add new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        tags: tagsArray,
        date: new Date().toISOString().split('T')[0]
      };
      setBlogPosts(prev => [newPost, ...prev]);
      toast({
        title: "Blog Created",
        description: "New blog post has been created successfully.",
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      content: '', 
      excerpt: '', 
      author: 'Advocate Ajay Shankar Sharma', 
      image: '', 
      tags: '' 
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      image: post.image,
      tags: post.tags.join(', ')
    });
    setIsEditing(true);
    setEditingId(post.id);
  };

  const handleDelete = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
    toast({
      title: "Blog Deleted",
      description: "Blog post has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter author name"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Enter blog excerpt (brief description)"
                rows={2}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter blog content"
                rows={6}
                required
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Property Law, Legal Advice, etc."
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Update Post' : 'Create Post'}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager;
