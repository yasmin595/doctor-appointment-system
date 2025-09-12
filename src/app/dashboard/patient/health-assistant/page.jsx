"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, Stethoscope, User, Clock, MapPin, Star, Send, Brain } from "lucide-react";
import { toast } from "sonner";



export default function HealthAssistantPage() {
    const [symptoms, setSymptoms] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const mockDoctors = [
        { name: "Dr. Sarah Chen", specialty: "Internal Medicine", rating: 4.9, location: "Downtown Medical Center", availability: "Available today" },
        { name: "Dr. Michael Rodriguez", specialty: "Gynecology", rating: 4.8, location: "Community Health Clinic", availability: "Next available: Tomorrow" },
        { name: "Dr. Emily Johnson", specialty: "Emergency Medicine", rating: 4.7, location: "City Hospital", availability: "Available now" },
        { name: "Dr. John Smith", specialty: "Cardiology", rating: 4.6, location: "Heart Care Center", availability: "Tomorrow" },
        { name: "Dr. Ayesha Khan", specialty: "Dermatology", rating: 4.8, location: "Skin Health Clinic", availability: "Today" },
        { name: "Dr. Ravi Patel", specialty: "Neurology", rating: 4.7, location: "Neuro Clinic", availability: "Next week" },
        { name: "Dr. Linda Park", specialty: "Pediatrics", rating: 4.9, location: "Kids Care Center", availability: "Available now" },
        { name: "Dr. Ahmed Ali", specialty: "Orthopedics", rating: 4.5, location: "Bone & Joint Hospital", availability: "Tomorrow" },
        { name: "Dr. Maria Lopez", specialty: "Ophthalmology", rating: 4.7, location: "Eye Care Clinic", availability: "Today" },
        { name: "Dr. Tom Wilson", specialty: "Psychiatry", rating: 4.6, location: "Mental Health Center", availability: "Next week" }
    ];
    const analyzeSymptoms = async () => {
        //if (!symptoms.trim()) return;
        if (!symptoms.trim()) {
        return toast.error("Please enter your symptoms before analyzing.");
       }

        setIsAnalyzing(true);

        try {
            const res = await fetch("/api/ai/analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms })
            });

            const data = await res.json();
            console.log("data", data);

            const aiContent = JSON.parse((data?.choices?.[0]?.message?.content || "").replace(/```(json)?/g, "").trim());
            console.log("aiContent", aiContent);
            // Map the parsed JSON to your analysis format
            const parsedAnalysis = {
                condition: aiContent.condition || "Unknown condition",
                severity: aiContent.severity || "medium",
                confidence: aiContent.confidence || 0,
                symptoms: (aiContent.symptoms
                    ? aiContent.symptoms.split(",").map(s => s.trim())
                    : symptoms.split(",").map(s => s.trim())) || ["No symptoms identified"],
                recommendations: aiContent.recommendations
                    ? aiContent.recommendations.split(",").map(r => r.trim())
                    : ["Please provide specific symptoms for a proper analysis."],
                specialist: aiContent.recommended_specialist_department || ["General Doctor"],
            };
            console.log(parsedAnalysis)

            const recommendedDoctors = mockDoctors.filter(doctor =>
                aiContent.recommended_specialist_department?.some(
                    dept => dept.toLowerCase() === doctor.specialty.toLowerCase()
                )
            );

            parsedAnalysis.recommendedDoctors = recommendedDoctors.length > 0 ? recommendedDoctors : null;

            setAnalysis(parsedAnalysis);


        } catch (err) {
            
            toast.error("Failed to analyze symptoms. Please try again.");
            console.error(err);
            setAnalysis({
                severity: "low",
                condition: "Could not analyze",
                confidence: 0,
                symptoms: symptoms.split(",").map(s => s.trim()).filter(s => s),
                recommendations: ["Please try again later."]
            });
        }

        setIsAnalyzing(false);
    };

    const getSeverityVariant = (severity) => {
        switch (severity) {
            case "high":
                return "destructive"; 
            case "medium":
                return "secondary"; 
            default:
                return "default"; 
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden  py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center ">
                        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Brain className="w-5 h-5" />
                            <span className="text-sm font-medium">AI-Powered Health Analysis</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Your Personal
                            <span className="block  bg-clip-text ">
                                Health Assistant
                            </span>
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Describe your symptoms and receive instant AI-powered analysis with personalized doctor recommendations.
                            Professional healthcare guidance at your fingertips.
                        </p>
                        <div className="flex items-center justify-center gap-6 text-blue-500 flex-wrap">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                <span>Real-time Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Stethoscope className="w-5 h-5" />
                                <span>Doctor Matching</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                <span>Trusted Care</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Symptom Input */}
                    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-accent/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Brain className="w-6 h-6 text-primary" />
                                Describe Your Symptoms
                            </CardTitle>
                            <CardDescription>
                                Tell us what you're experiencing. Be as detailed as possible for better analysis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder="Example: I've had a persistent cough for 3 days, mild fever, and fatigue. The cough is worse at night..."
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                className="min-h-[120px] border-primary/20 focus:border-primary transition-colors"
                            />
                            <Button
                                onClick={analyzeSymptoms}
                                disabled={!symptoms.trim() || isAnalyzing}
                                className="w-full"
                                size="lg"
                            >
                                {isAnalyzing ? (
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 animate-spin" />
                                        Analyzing Symptoms...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Send className="w-4 h-4" />
                                        Analyze Symptoms
                                    </div>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Analysis Results */}
                    {analysis && (
                        <Card className="shadow-medical border border-primary/10">
                            <CardHeader>
                                <div className="flex items-center justify-between ">
                                    <CardTitle className="flex items-center gap-2 ">
                                        <Activity className="w-6 h-6 text-primary" />
                                        AI Analysis Results
                                    </CardTitle>
                                    <Badge variant={getSeverityVariant(analysis.severity)} className={`capitalize `}>
                                        {analysis.severity} Priority
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2 text-blue-500">Possible Condition</h3>
                                            <p className="text-2xl font-bold text-primary">{analysis.condition}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Confidence: {analysis.confidence}%
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Identified Symptoms</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.symptoms.map((symptom, index) => (
                                                    <Badge key={index} variant="secondary">{symptom}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 text-green-500">Recommended Specialist</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {
                                                    analysis.specialist.map((spec, index) => (
                                                        <Badge key={index} variant="outline" className="text-primary font-medium">
                                                            {spec}
                                                        </Badge>
                                                    ))
                                                }

                                            </div>

                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-green-500">Recommendations</h4>
                                        <ul className="space-y-2">
                                            {analysis.recommendations.map((rec, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Doctor Recommendations */}
                    {analysis && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-center">Recommended Doctors</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {analysis.recommendedDoctors ? (
                                    analysis.recommendedDoctors.map((doctor, index) => (
                                        <Card key={index} className="group hover:shadow-medical transition-all duration-300 border-primary/10 hover:border-primary/30">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-medical-teal rounded-full flex items-center justify-center">
                                                        <User className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                                                        <p className="text-sm text-primary">{doctor.specialty}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="font-medium">{doctor.rating}</span>
                                                        <span className="text-sm text-muted-foreground">rating</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                                        <span>{doctor.location}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Clock className="w-4 h-4 text-success" />
                                                        <span className="text-success">{doctor.availability}</span>
                                                    </div>
                                                </div>

                                                <Button className="w-full mt-4 ">
                                                    Book Appointment
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-center col-span-3 text-muted-foreground">No doctor found for the analyzed condition.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <Card className="bg-medical-light border-medical-teal/20">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <Heart className="w-6 h-6 text-medical-teal flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-medical-teal mb-2">Important Disclaimer</h3>
                                    <p className="text-sm text-foreground/80">
                                        This AI analysis is for informational purposes only and should not replace professional medical advice.
                                        Always consult with qualified healthcare providers for accurate diagnosis and treatment.
                                        In case of emergency, contact your local emergency services immediately.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}