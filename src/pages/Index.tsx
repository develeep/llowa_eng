import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Users, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground text-center">
            <div className="flex flex-col justify-center items-center">
              <img src='./llowa_icon.png' alt="LOWA" className=" h-full max-h-32 w-auto" />
              <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 sm:max-w-md px-2 leading-relaxed break-keep">
              Hello! We are LOWA, the startup team of the Samsung Youth SW·AI Academy. We are currently operating test services to launch LOWA, a cultural exchange platform service for visitors and local people. We hope you will participate.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 sm:max-w-md px-2 leading-relaxed break-keep">contact : <span className="text-primary">llowa.official@gmail.com</span></p>
            </div>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 pb-24 max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Using Services 🌏
          </h2>
        </div>

        <div className="space-y-4">
          {/* Browse Invitations */}
          <Card
            className="p-8 active:scale-[0.98] transition-all duration-200 cursor-pointer border-2 border-primary/20 bg-card/95 backdrop-blur hover:border-primary/40"
            onClick={() => navigate("/invitations")}
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Local Invitations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore invitations from local<br />and apply for visit
                </p>
              </div>
              <div className="pt-2 space-y-2 text-xs text-muted-foreground">
                <p>• View local invitations</p>
                <p>• Apply for visit</p>
                <p>• If successfully matched, we'll contact you</p>
              </div>
            </div>
          </Card>

          {/* Create Request */}
          <Card
            className="p-8 active:scale-[0.98] transition-all duration-200 cursor-pointer border-2 border-primary/20 bg-card/95 backdrop-blur hover:border-primary/40"
            onClick={() => navigate("/create-visitor-request")}
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Create Visitor Request
                </h3>
                <p className="text-sm text-muted-foreground">
                  Post what you're looking for<br />and let locals reach out to you
                </p>
              </div>
              <div className="pt-2 space-y-2 text-xs text-muted-foreground">
                <p>• Describe your interests</p>
                <p>• Set your preferences</p>
                <p>• If successfully matched, we'll contact you</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
