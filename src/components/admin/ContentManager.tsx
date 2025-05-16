
import React, { useState } from 'react';
import { useAdmin, ContentItem } from '@/contexts/AdminContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { toast } from "sonner";

interface ContentFormData {
  title: string;
  type: string;
  content: string;
  status: 'draft' | 'published';
}

const ContentManager = () => {
  const { contentItems, addContentItem, updateContentItem, deleteContentItem } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    type: 'market-summary',
    content: '',
    status: 'draft'
  });

  const handleAddDialogOpen = () => {
    setFormData({
      title: '',
      type: 'market-summary',
      content: '',
      status: 'draft'
    });
    setIsAddDialogOpen(true);
  };

  const handleEditDialogOpen = (item: ContentItem) => {
    setSelectedItemId(item.id);
    setFormData({
      title: item.title,
      type: item.type,
      content: item.content,
      status: item.status
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContentItem({
      ...formData,
      author: 'Admin User' // In a real app, get from user context
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItemId) {
      updateContentItem(selectedItemId, formData);
      setIsEditDialogOpen(false);
      setSelectedItemId(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content item?')) {
      deleteContentItem(id);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'bg-green-500' : 'bg-yellow-500';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cc-navy dark:text-white">Content Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddDialogOpen} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Content</DialogTitle>
              <DialogDescription>
                Create a new content item for your website
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="title">Title</label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="type">Content Type</label>
                  <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="market-summary">Market Summary</SelectItem>
                      <SelectItem value="research-report">Research Report</SelectItem>
                      <SelectItem value="market-data">Market Data</SelectItem>
                      <SelectItem value="company-profile">Company Profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="content">Content</label>
                  <Textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows={10} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="status">Status</label>
                  <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value as 'draft' | 'published')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Content</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Update content details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-title">Title</label>
                <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-type">Content Type</label>
                <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="market-summary">Market Summary</SelectItem>
                    <SelectItem value="research-report">Research Report</SelectItem>
                    <SelectItem value="market-data">Market Data</SelectItem>
                    <SelectItem value="company-profile">Company Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-content">Content</label>
                <Textarea id="edit-content" name="content" value={formData.content} onChange={handleInputChange} rows={10} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-status">Status</label>
                <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value as 'draft' | 'published')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Content</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contentItems.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </div>
              <div className="text-sm text-gray-500">
                Type: {item.type} | Last Modified: {item.lastModified}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-3">{item.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-gray-500">
                Created: {item.dateCreated}
                {item.author && ` | By: ${item.author}`}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleEditDialogOpen(item)}>
                  <Edit className="h-4 w-4" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
