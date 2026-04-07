import { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import {
  Plus,
  Calendar,
  Target,
  TrendingUp,
  Edit2,
  Trash2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function AdminDriveManagement() {
  const navigate = useNavigate();

 const [drives, setDrives] = useState<any[]>([]);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const snapshot = await getDocs(collection(db, "drives"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDrives(data);
      } catch (error) {
        console.error("Error fetching drives", error);
      }
    };

    fetchDrives();
  }, 
  []);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDriveId, setEditDriveId] = useState<string | null>(null);

  const [newDrive, setNewDrive] = useState({
    name: "",
    description: "",
    goal: "",
    startDate: "",
    endDate: "",
    category: "",
    urgent: false,
  });

  const handleCreateDrive = async (e: React.FormEvent) => {
  e.preventDefault();
  const handleCreateDrive = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 🟡 EDIT MODE
    if (editDriveId !== null) {
      const ref = doc(db, "drives", editDriveId);

      await updateDoc(ref, {
        name: newDrive.name,
        description: newDrive.description,
        goal: Number(newDrive.goal),
        startDate: newDrive.startDate,
        endDate: newDrive.endDate,
        category: newDrive.category,
        urgent: newDrive.urgent,
      });

      setDrives((prev) =>
        prev.map((d) =>
          d.id === editDriveId
            ? { ...d, ...newDrive, goal: Number(newDrive.goal) }
            : d
        )
      );

      alert("Drive Updated ✏️");
      setEditDriveId(null);
    } else {
      // 🟢 CREATE MODE
      const docRef = await addDoc(collection(db, "drives"), {
        name: newDrive.name,
        description: newDrive.description,
        goal: Number(newDrive.goal),
        startDate: newDrive.startDate,
        endDate: newDrive.endDate,
        category: newDrive.category,
        urgent: newDrive.urgent,
        collected: 0,
        status: "active",
      });

      setDrives((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...newDrive,
          goal: Number(newDrive.goal),
          collected: 0,
          status: "active",
        },
      ]);

      alert("Drive Created 🚀");
    }

    setIsCreateOpen(false);

    setNewDrive({
      name: "",
      description: "",
      goal: "",
      startDate: "",
      endDate: "",
      category: "",
      urgent: false,
    });

  } catch (error) {
    console.error(error);
    alert("Error ❌");
  }
};

  
};

  const handleDelete = async (id: string) => {
  try {
    await deleteDoc(doc(db, "drives", id));

    setDrives((prev) => prev.filter((d) => d.id !== id));

  } catch (error) {
    console.error("Delete error", error);
  }
};

  const handleEdit = (drive: any) => {
    setNewDrive({
      name: drive.name,
      description: drive.description,
      goal: drive.goal.toString(),
      startDate: drive.startDate,
      endDate: drive.endDate,
      category: drive.category,
      urgent: drive.urgent,
    });

    setEditDriveId(drive.id);
    setIsCreateOpen(true);
  };

  const activeCount = drives.filter((d) => d.status === "active").length;
  const totalCollected = drives.reduce((sum, d) => sum + (d.collected || 0), 0);

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Drive Management</h1>
          <p className="text-gray-600">Create and manage donation drives</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Create New Drive
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editDriveId ? "Edit Drive" : "Create New Donation Drive"}
              </DialogTitle>
              <DialogDescription>
                Set up a campaign to collect donations
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateDrive} className="space-y-4">
              <div>
                <Label>Drive Name</Label>
                <Input
                  value={newDrive.name}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newDrive.description}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newDrive.category}
                    onValueChange={(value) =>
                      setNewDrive({ ...newDrive, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Goal (number of items)</Label>
                  <Input
                    type="number"
                    value={newDrive.goal}
                    onChange={(e) =>
                      setNewDrive({ ...newDrive, goal: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={newDrive.startDate}
                    onChange={(e) =>
                      setNewDrive({ ...newDrive, startDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={newDrive.endDate}
                    onChange={(e) =>
                      setNewDrive({ ...newDrive, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newDrive.urgent}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, urgent: e.target.checked })
                  }
                />
                <Label>Mark as urgent drive</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  {editDriveId ? "Update Drive" : "Create Drive"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Active Drives</CardDescription>
            <CardTitle>{activeCount}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Items Collected</CardDescription>
            <CardTitle>{totalCollected}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Drives</CardDescription>
            <CardTitle>{drives.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Drive List */}
      <div className="space-y-4">
        {drives.map((drive) => (
          <Card key={drive.id}>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{drive.name}</CardTitle>
                  <CardDescription>{drive.description}</CardDescription>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(drive)}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(drive.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-sm text-gray-600 mb-2">
                {drive.startDate} to {drive.endDate}
              </div>

              <div className="text-sm mb-2">
                {drive.collected} / {drive.goal} items
              </div>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-red-500 h-2 rounded"
                  style={{
                    width: `${Math.min(
                      (drive.collected / drive.goal) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}