import { useNavigate } from "react-router";
import { Package, TrendingUp, Clock, AlertCircle, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

;

const activeDrives = [
  {
    id: 1,
    name: "Winter Relief Drive 2026",
    goal: "1000 items",
    collected: 687,
    deadline: "March 15, 2026",
    urgent: true,
  },
  {
    id: 2,
    name: "Food Security Initiative",
    goal: "500 items",
    collected: 423,
    deadline: "March 30, 2026",
    urgent: false,
  },
];

export function DonorDashboard() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    items: 0,
    inTransit: 0,
    helped: 0,
  });

  useEffect(() => {
    const fetchDonations = async () => {
      const snapshot = await getDocs(collection(db, "donations"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDonations(data);

      // 🔥 CALCULATE STATS
      let total = data.length;
      let items = 0;
      let inTransit = 0;

      data.forEach((d: any) => {
        items += Number(d.quantity || 0);

        if (d.status === "in-transit") {
          inTransit++;
        }
      });

      setStats({
        total,
        items,
        inTransit,
        helped: total, // simple logic
      });
    };

    fetchDonations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your donations and participate in drives</p>
        </div>
        <Button
          onClick={() => navigate("/donor/add-donation")}
          className="bg-red-500 hover:bg-red-600 w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Donation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Donations</CardDescription>
<CardTitle className="text-3xl">{stats.total}</CardTitle>          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+3 this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Items Donated</CardDescription>
<CardTitle className="text-3xl">{stats.inTransit}</CardTitle>          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>All time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Transit</CardDescription>
            <CardTitle className="text-3xl">{stats.inTransit}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Clock className="w-4 h-4" />
              <span>Being delivered</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>People Helped</CardDescription>
            <CardTitle className="text-3xl">{stats.helped}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Direct impact</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Drives */}
      <Card>
        <CardHeader>
          <CardTitle>Active Emergency Drives</CardTitle>
          <CardDescription>Participate in ongoing donation campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeDrives.map((drive) => (
            <div
              key={drive.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{drive.name}</h3>
                  <p className="text-sm text-gray-600">Deadline: {drive.deadline}</p>
                </div>
                {drive.urgent && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Urgent
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {drive.collected} / {drive.goal}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${(drive.collected / parseInt(drive.goal)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Your latest contribution activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
                {donations.map((donation: any) => (              <div
                key={donation.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex-1">
  <h3 className="font-medium text-gray-900">
    {donation.itemName} ({donation.quantity})
  </h3>

  <p className="text-sm text-gray-600">
    {donation.description}
  </p>

  <p className="text-xs text-gray-500 mt-1">
    {donation.preferredDate}
  </p>
</div>
                <Badge className={getStatusColor(donation.status || "pending")}>
  {(donation.status || "pending").replace("-", " ")}
</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
