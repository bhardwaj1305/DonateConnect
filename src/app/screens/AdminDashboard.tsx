import { useNavigate } from "react-router";
import { Users, Package, Truck, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const recentActivity = [
  {
    id: 1,
    action: "New donation added",
    user: "John Doe",
    item: "Winter Clothes (20 items)",
    time: "2 hours ago",
    type: "donation",
  },
  {
    id: 2,
    action: "Request approved",
    user: "Sarah Smith",
    item: "Food Supplies",
    time: "3 hours ago",
    type: "request",
  },
  {
    id: 3,
    action: "Delivery completed",
    user: "Mike Johnson",
    item: "Medical Kits",
    time: "5 hours ago",
    type: "delivery",
  },
  {
    id: 4,
    action: "New user registered",
    user: "Emma Wilson",
    item: "Donor account",
    time: "6 hours ago",
    type: "user",
  },
];

const platformStats = [
  { label: "Active Donors", value: "1,234", change: "+12%", trend: "up" },
  { label: "Recipients Helped", value: "892", change: "+8%", trend: "up" },
  { label: "Items Donated", value: "5,678", change: "+15%", trend: "up" },
  { label: "Pending Requests", value: "23", change: "-5%", trend: "down" },
];

export function AdminDashboard() {
  const navigate = useNavigate();
const handleLogout = async () => {
  try {
    await signOut(auth);

    alert("Logged out 👋");

    navigate("/"); // login page
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Oversee platform operations and manage drives</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
  
</div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">2,847</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Drives</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>2 urgent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Transit</CardDescription>
            <CardTitle className="text-3xl">45</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Truck className="w-4 h-4" />
              <span>Being delivered</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Success Rate</CardDescription>
            <CardTitle className="text-3xl">94%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Deliveries completed</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Key metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pending Reviews</CardTitle>
              <Badge variant="destructive">12</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Requests and donations awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">User Reports</CardTitle>
              <Badge variant="outline">3</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Issues and feedback from users</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">System Alerts</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                2
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Platform notifications requiring attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="mt-1">
                  {activity.type === "donation" && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Package className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                  {activity.type === "request" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  {activity.type === "delivery" && (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-purple-600" />
                    </div>
                  )}
                  {activity.type === "user" && (
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.user} • {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
