import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, Users, MapPin, Phone, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export function RecipientRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: "",
    urgency: "",
    reason: "",
    numberOfPeople: "",
    deliveryAddress: "",
    contactNumber: "",
    preferredDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "requests"), {
      category: formData.category,
      itemName: formData.itemName,
      quantity: Number(formData.quantity),
      urgency: formData.urgency,
      reason: formData.reason,
      numberOfPeople: Number(formData.numberOfPeople),
      deliveryAddress: formData.deliveryAddress,
      contactNumber: formData.contactNumber,
      preferredDate: formData.preferredDate,
      status: "pending",
    });

    alert("Request Submitted 🚀");

    navigate("/recipient");

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
          onClick={() => navigate("/recipient")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Request Items</h1>
        <p className="text-gray-600 mt-1">Submit a request for necessary items</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Provide information about the items you need</CardDescription>
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
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical (Within 24hrs)</SelectItem>
                    <SelectItem value="urgent">Urgent (Within 3 days)</SelectItem>
                    <SelectItem value="moderate">Moderate (Within 1 week)</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
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
                  placeholder="e.g., Canned Food, Warm Blankets"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Needed</Label>
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
                <Label htmlFor="numberOfPeople">Number of People</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="numberOfPeople"
                    type="number"
                    placeholder="People to support"
                    value={formData.numberOfPeople}
                    onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                    className="pl-10"
                    required
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request</Label>
              <Textarea
                id="reason"
                placeholder="Explain why you need these items and your current situation"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="deliveryAddress"
                  placeholder="Enter your delivery address"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Delivery Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your request will be reviewed by our team. Urgent requests are
                prioritized and typically processed within 24-48 hours. You'll receive updates via
                SMS and email.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/recipient")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600">
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
