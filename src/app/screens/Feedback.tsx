
import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, Send, ThumbsUp, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { getDoc,addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const receivedDonations = [
  {
    id: "DON-2024-001",
    item: "Winter Clothes Package",
    donor: "John Doe",
    receivedDate: "Feb 20, 2026",
    feedbackGiven: true,
    rating: 5,
    comment: "Excellent quality items. Very helpful during the cold season. Thank you!",
  },
  {
    id: "DON-2024-002",
    item: "Food Supplies",
    donor: "Jane Smith",
    receivedDate: "Feb 18, 2026",
    feedbackGiven: true,
    rating: 5,
    comment: "Fresh and well-packaged. Really appreciate the quick delivery.",
  },
  {
    id: "DON-2024-003",
    item: "Hygiene Kits",
    donor: "Community Donors",
    receivedDate: "Feb 22, 2026",
    feedbackGiven: false,
  },
];

export function Feedback() {
  const navigate = useNavigate();
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
const handleSubmitFeedback = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "feedback"), {
      donationId: selectedDonation.id,
      item: selectedDonation.item,
      donor: selectedDonation.donor,
      rating: rating,
      comment: feedback,
      date: new Date().toISOString(),
    });

    alert("Feedback Submitted ⭐");

    setSelectedDonation(null);
    setRating(0);
    setFeedback("");

  } catch (error) {
    console.error(error);
    alert("Error ❌");
  }
};

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/recipient")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-gray-900">Donation Feedback</h1>
        <p className="text-gray-600 mt-1">
          Share your experience and help improve the donation process
        </p>
      </div>

      {selectedDonation ? (
        // Feedback Form
        <Card>
          <CardHeader>
            <CardTitle>Rate Your Experience</CardTitle>
            <CardDescription>
              Donation: {selectedDonation.item} from {selectedDonation.donor}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              <div className="space-y-3">
                <Label>How would you rate this donation?</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600">
                    {rating === 5 && "Excellent! 🌟"}
                    {rating === 4 && "Very Good! 👍"}
                    {rating === 3 && "Good"}
                    {rating === 2 && "Fair"}
                    {rating === 1 && "Needs Improvement"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience with this donation. What was helpful? What could be improved?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  required
                />
                <p className="text-xs text-gray-500">
                  Your feedback helps donors understand the impact of their contributions
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Feedback Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Be honest and constructive</li>
                  <li>• Mention specific aspects (quality, timeliness, packaging)</li>
                  <li>• Share how the donation helped you</li>
                  <li>• Suggestions for improvement are welcome</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedDonation(null);
                    setRating(0);
                    setFeedback("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600" disabled={rating === 0}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        // Donation List
        <div className="grid gap-6">
          {/* Pending Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-500" />
                Pending Feedback
              </CardTitle>
              <CardDescription>Donations awaiting your feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {receivedDonations.filter((d) => !d.feedbackGiven).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No pending feedback. You're all caught up!
                </p>
              ) : (
                receivedDonations
                  .filter((d) => !d.feedbackGiven)
                  .map((donation) => (
                    <div
                      key={donation.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{donation.item}</h3>
                          <p className="text-sm text-gray-600">From: {donation.donor}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Received: {donation.receivedDate}
                          </p>
                        </div>
                        <Button
                          onClick={() => setSelectedDonation(donation)}
                          className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Give Feedback
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>

          {/* Previous Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                Previous Feedback
              </CardTitle>
              <CardDescription>Your feedback history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {receivedDonations.filter((d) => d.feedbackGiven).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No feedback submitted yet.
                </p>
              ) : (
                receivedDonations
                  .filter((d) => d.feedbackGiven)
                  .map((donation) => (
                    <div
                      key={donation.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{donation.item}</h3>
                          <p className="text-sm text-gray-600">From: {donation.donor}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Received: {donation.receivedDate}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Feedback Submitted
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">{donation.comment}</p>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
