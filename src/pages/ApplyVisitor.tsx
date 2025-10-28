import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Calendar, MapPin, Activity, Users, Languages } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { Textarea } from "@/components/ui/textarea";

type Invitation = Tables<"invitations">;

const ApplyVisitor = () => {
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [formData, setFormData] = useState({
    participant_details: "",
    interested_location: "",
    contact: "",
    languages: "",
    age_range: "",
    preferred_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const fetchInvitation = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("id", invitationId)
        .single();

      if (error) throw error;
      setInvitation(data);
    } catch (error) {
      console.error("Error fetching invitation:", error);
      toast.error("Unable to load invitation.");
      navigate("/invitations");
    }
  }, [invitationId, navigate]);

  useEffect(() => {
    if (invitationId) {
      fetchInvitation();
    }
  }, [invitationId, fetchInvitation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. UUID를 미리 생성
      const contactId = crypto.randomUUID();

      // 2. contact 정보를 별도 테이블에 저장 (UUID 직접 지정)
      const { error: contactError } = await supabase
        .from("contacts")
        .insert({ 
          id: contactId,
          contact_info: formData.contact,
          contact_type: 'application' 
        });

      if (contactError) throw contactError;

      // 3. contact_id를 사용하여 application 저장
      const { error: applicationError } = await supabase
        .from("visitor_applications")
        .insert({
          invitation_id: invitationId,
          participant_details: formData.participant_details,
          interested_location: formData.interested_location,
          contact_id: contactId,
          age_range: formData.age_range,
          languages: formData.languages,
          preferred_date: formData.preferred_date || null,
        });

      if (applicationError) throw applicationError;

      toast.success("Application submitted successfully!");
      navigate("/invitations");
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/invitations")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>

        <Card className="p-6 md:p-8 mb-6 shadow-lg border-none bg-card/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {invitation.title}
          </h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3 text-muted-foreground">
              <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Available days and time slots</p>
                <p className="text-foreground">{invitation.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">{invitation.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <Activity className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Activity</p>
                <p className="text-foreground">{invitation.activity}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <Users className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Max Participants</p>
                <p className="text-foreground">{invitation.max_participants} people</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <Languages className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Languages</p>
                <p className="text-foreground">{invitation.languages}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {invitation.age_range} years
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {invitation.gender}
            </Badge>
          </div>
        </Card>

        <Card className="p-6 md:p-8 shadow-lg border-none bg-card/95 backdrop-blur">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Apply for Visit
            </h1>
            <p className="text-muted-foreground">
            Browse invitations from local guides and apply. If successfully matched, we'll contact you through the provided contact information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="participant_details">Participant Details (Number & Gender)</Label>
              <Input
                id="participant_details"
                value={formData.participant_details}
                onChange={(e) =>
                  setFormData({ ...formData, participant_details: e.target.value })
                }
                required
                placeholder="e.g., 2 males, 1 female"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age_range">Age Range</Label>
              <Select
                value={formData.age_range}
                onValueChange={(value) =>
                  setFormData({ ...formData, age_range: value })
                }
                required
              >
                <SelectTrigger id="age_range">
                  <SelectValue placeholder="Select your group's age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20s">20s</SelectItem>
                  <SelectItem value="30s">30s</SelectItem>
                  <SelectItem value="40s">40s</SelectItem>
                  <SelectItem value="50+">50+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages Spoken</Label>
              <Textarea
                id="languages"
                value={formData.languages}
                onChange={(e) =>
                  setFormData({ ...formData, languages: e.target.value })
                }
                required
                placeholder="e.g. English 3, Korean 4 (Language proficiency level 1-5)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred_date">Preferred Visit Date & Time</Label>
              <Input
                id="preferred_date"
                type="datetime-local"
                value={formData.preferred_date}
                onChange={(e) =>
                  setFormData({ ...formData, preferred_date: e.target.value })
                }
                min={new Date().toISOString().slice(0, 16)}
                placeholder="Select your preferred visit date and time"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                required
                placeholder="e.g., Instagram, Email, Phone"
              />
            </div>

            <div className="border-t pt-6 mt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1 leading-none">
                  <label
                    htmlFor="privacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to the Privacy Policy (Required)
                  </label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        type="button" 
                        variant="link" 
                        className="h-auto p-0 text-xs text-primary"
                      >
                        View Privacy Policy
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Privacy Policy</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <iframe
                          src="/privacy.html"
                          className="w-full h-[60vh] border-0"
                          title="Privacy Policy"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !privacyAccepted}
              className="w-full h-12 text-base font-semibold"
              style={{ background: "var(--gradient-warm)" }}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApplyVisitor;



