import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, User, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 🔐 Step 1: Create user in Firebase Auth
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    // 🗂️ Step 2: Save extra data (role) in Firestore
    await addDoc(collection(db, "users"), {
      email: formData.email,
      role: formData.role,
    });

    alert("Registered successfully ✅");

    navigate("/"); // back to login
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl">
              Create Your Account
            </CardTitle>
            <CardDescription>
              Join DonateConnect and make a difference
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-3">
                <Label>Select Your Role</Label>

                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  className="space-y-3"
                >
                  {/* Donor */}
                  <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                    <RadioGroupItem
                      value="donor"
                      id="donor"
                      className="mt-1"
                    />
                    <Label htmlFor="donor" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-gray-900">
                        Donor
                      </div>
                      <div className="text-sm text-gray-600">
                        List items for donation, track donations, and
                        participate in emergency drives
                      </div>
                    </Label>
                  </div>

                  {/* Recipient */}
                  <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                    <RadioGroupItem
                      value="recipient"
                      id="recipient"
                      className="mt-1"
                    />
                    <Label
                      htmlFor="recipient"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-semibold text-gray-900">
                        Recipient
                      </div>
                      <div className="text-sm text-gray-600">
                        Request necessary items, track delivery, and
                        provide feedback on donations
                      </div>
                    </Label>
                  </div>

                  {/* Logistics */}
                  <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                    <RadioGroupItem
                      value="logistics"
                      id="logistics"
                      className="mt-1"
                    />
                    <Label
                      htmlFor="logistics"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-semibold text-gray-900">
                        Logistics Coordinator
                      </div>
                      <div className="text-sm text-gray-600">
                        Organize transportation, manage inventory, and
                        ensure timely delivery
                      </div>
                    </Label>
                  </div>

                  {/* Admin */}
                  <div className="flex items-start space-x-3 border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                    <RadioGroupItem
                      value="admin"
                      id="admin"
                      className="mt-1"
                    />
                    <Label htmlFor="admin" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-gray-900">
                        Admin
                      </div>
                      <div className="text-sm text-gray-600">
                        Oversee platform operations, manage donation
                        drives, and ensure transparency
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
