import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, Calendar, MapPin, Upload, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";


export function AddDonation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: "",
    description: "",
    condition: "",
    pickupAddress: "",
    preferredDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "donations"), {
      category: formData.category,
      itemName: formData.itemName,
      quantity: Number(formData.quantity),
      description: formData.description,
      condition: formData.condition,
      pickupAddress: formData.pickupAddress,
      preferredDate: formData.preferredDate,
      status: "pending",
    });

    alert("Donation Added 🚀");

    navigate("/donor");

  } catch (error) {
    console.error(error);
    alert("Error ❌");
  }
};

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/donor")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Donation</h1>
        <p className="text-gray-600 mt-1">List items you'd like to donate to those in need</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Details</CardTitle>
          <CardDescription>Provide information about the items you're donating</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food & Groceries</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="medical">Medical Supplies</SelectItem>
                    <SelectItem value="hygiene">Hygiene Products</SelectItem>
                    <SelectItem value="shelter">Shelter Items</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <div className="relative">
                <Package className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="itemName"
                  placeholder="e.g., Canned Food, Winter Jackets"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Number of items"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the items (brand, size, specifications, etc.)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupAddress">Pickup Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="pickupAddress"
                  placeholder="Enter your address for pickup"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Pickup Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-300 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Upload photos of items (optional)</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/donor")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600">
                Submit Donation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
