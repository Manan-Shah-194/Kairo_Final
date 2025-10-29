import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles, Users, Check } from 'lucide-react';
import Footer from './Footer';
import TherapistCard from './TherapistCard';
import newLogo from '@assets/Screenshot_2025-10-28_at_12.16.32_PM-removebg-preview_1761714308881.png';

interface MatchingAnswers {
  sessionType: string[];
  availability: string[];
  concernsAreas: string[];
  priorTherapy: string;
  therapistApproach: string;
  focusArea: string;
  genderPreference: string;
}

const steps = [
  {
    id: 1,
    title: 'The Basics',
    subtitle: 'Practical Needs',
    description: 'This section is for the non-negotiables.'
  },
  {
    id: 2,
    title: "What's on your mind?",
    subtitle: 'Areas of Focus',
    description: 'This helps us understand what you\'d like to work on.'
  },
  {
    id: 3,
    title: 'Your Therapy Style',
    subtitle: 'Your Vibe',
    description: 'This helps us match you with a therapist\'s approach.'
  },
  {
    id: 4,
    title: 'Therapist Preferences',
    subtitle: 'Your Match',
    description: 'This is about who you feel most comfortable with. It\'s 100% optional.'
  }
];

export default function TherapistMatchingQuestionnaire() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<MatchingAnswers>({
    sessionType: [],
    availability: [],
    concernsAreas: [],
    priorTherapy: '',
    therapistApproach: '',
    focusArea: '',
    genderPreference: ''
  });

  const matchedTherapists = [
    {
      name: "Dr. Sarah Patel",
      specialization: "CBT & Anxiety Specialist",
      bio: "Specializing in cognitive behavioral therapy with over 10 years of experience helping clients manage anxiety and depression. Expert in evidence-based techniques for lasting change.",
      rating: 4.8,
      reviews: 156,
      yearsExperience: 12,
      availability: "Mon-Fri, 2-6 PM IST",
      matchScore: 95
    },
    {
      name: "Dr. Amit Kumar",
      specialization: "Trauma & PTSD",
      bio: "Expert in trauma-focused therapy and EMDR techniques for healing from traumatic experiences. Compassionate approach with proven success in complex trauma cases.",
      rating: 4.7,
      reviews: 98,
      yearsExperience: 8,
      availability: "Tue-Sat, 10 AM-4 PM IST",
      matchScore: 92
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Relationship Counseling",
      bio: "Helping couples and individuals navigate relationship challenges with evidence-based approaches. Warm, supportive style focused on communication and emotional connection.",
      rating: 4.9,
      reviews: 203,
      yearsExperience: 15,
      availability: "Wed-Sun, 3-8 PM IST",
      matchScore: 88
    },
    {
      name: "Dr. Rajesh Mehta",
      specialization: "Stress & Burnout",
      bio: "Specializing in stress management and preventing burnout in high-pressure environments. Practical strategies for work-life balance and resilience.",
      rating: 4.6,
      reviews: 87,
      yearsExperience: 10,
      availability: "Mon-Wed, 5-9 PM IST",
      matchScore: 85
    }
  ];

  const handleCheckboxChange = (field: keyof MatchingAnswers, value: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(v => v !== value)
    }));
  };

  const handleRadioChange = (field: keyof MatchingAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return answers.sessionType.length > 0 && answers.availability.length > 0;
      case 1:
        return answers.concernsAreas.length > 0 && answers.priorTherapy !== '';
      case 2:
        return answers.therapistApproach !== '' && answers.focusArea !== '';
      case 3:
        return answers.genderPreference !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    console.log('Matching answers:', answers);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Show results page after submission
  if (showResults) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={newLogo} alt="Kairo" className="w-10 h-10" />
                <div>
                  <h1 className="text-xl font-bold">Kairo</h1>
                  <p className="text-xs text-muted-foreground">Your Matched Therapists</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setLocation('/pro?tab=therapists')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12 flex-1 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center bg-green-500/10 p-4 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Great! We Found Your Matches</h1>
            <p className="text-xl text-muted-foreground mb-2">
              Based on your preferences, here are your top therapist matches
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              These therapists have been carefully selected based on your concerns, availability, and therapy style preferences. 
              Each match score reflects how well they align with your needs.
            </p>
          </motion.div>

          <div className="space-y-6">
            {matchedTherapists.map((therapist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-4 top-6 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                  #{index + 1}
                </div>
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <TherapistCard
                          {...therapist}
                          canSchedule={true}
                          onSchedule={() => {
                            setLocation('/pro?tab=therapists');
                          }}
                        />
                      </div>
                      <div className="ml-4 text-center">
                        <div className="bg-primary/10 rounded-lg p-3">
                          <div className="text-3xl font-bold text-primary">{therapist.matchScore}%</div>
                          <div className="text-xs text-muted-foreground mt-1">Match</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Start Your Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Schedule a session with any of these matched therapists by clicking "Schedule Session" on their card. 
                Your first consultation will help determine the best fit for your therapeutic journey.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" onClick={() => setLocation('/pro?tab=therapists')}>
                  View All Therapists
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowResults(false)}>
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={newLogo} alt="Kairo" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">Kairo</h1>
                <p className="text-xs text-muted-foreground">Find Your Perfect Therapist</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation('/pro?tab=therapists')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Therapists
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 flex-1 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Find Your Perfect Match</h1>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to help us connect you with the right therapist
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2">
              <CardHeader>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary">
                    {steps[currentStep].subtitle}
                  </div>
                  <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                  <CardDescription className="text-base">
                    {steps[currentStep].description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Step 1: The Basics */}
                {currentStep === 0 && (
                  <>
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        How would you like to attend sessions?
                      </Label>
                      <div className="space-y-3">
                        {['In-person (near me)', 'Virtual (video/phone)', "I'm open to either"].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <Checkbox
                              id={`session-${option}`}
                              checked={answers.sessionType.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('sessionType', option, checked as boolean)}
                            />
                            <Label htmlFor={`session-${option}`} className="cursor-pointer flex-1 text-base">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        When are you available for sessions?
                        <span className="text-sm font-normal text-muted-foreground ml-2">(Select all that apply)</span>
                      </Label>
                      <div className="space-y-3">
                        {['Mornings', 'Afternoons', 'Evenings', 'Flexible'].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <Checkbox
                              id={`availability-${option}`}
                              checked={answers.availability.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('availability', option, checked as boolean)}
                            />
                            <Label htmlFor={`availability-${option}`} className="cursor-pointer flex-1 text-base">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Areas of Focus */}
                {currentStep === 1 && (
                  <>
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        What brings you to therapy?
                        <span className="text-sm font-normal text-muted-foreground ml-2">(Select all that apply)</span>
                      </Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'Anxiety or panic attacks',
                          'Depression or sadness',
                          'Relationship issues',
                          'Work / School stress',
                          'Family conflicts',
                          'Trauma or PTSD',
                          'Grief or loss',
                          'Addiction or substance use',
                          'Identity (Gender, sexual, or cultural)',
                          'Life transitions (e.g., new job, moving, baby)',
                          "I'm just not feeling like myself",
                          "I'm not sure, I just need to talk"
                        ].map((option) => (
                          <div key={option} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <Checkbox
                              id={`concern-${option}`}
                              checked={answers.concernsAreas.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange('concernsAreas', option, checked as boolean)}
                              className="mt-0.5"
                            />
                            <Label htmlFor={`concern-${option}`} className="cursor-pointer flex-1 text-base leading-tight">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Have you been in therapy before?
                      </Label>
                      <RadioGroup value={answers.priorTherapy} onValueChange={(value) => handleRadioChange('priorTherapy', value)}>
                        {[
                          'Yes, it was a helpful experience',
                          'Yes, it was not a good experience',
                          'No, this is my first time'
                        ].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value={option} id={`prior-${option}`} />
                            <Label htmlFor={`prior-${option}`} className="cursor-pointer flex-1 text-base">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </>
                )}

                {/* Step 3: Therapy Style */}
                {currentStep === 2 && (
                  <>
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        I would prefer a therapist who...
                      </Label>
                      <RadioGroup value={answers.therapistApproach} onValueChange={(value) => handleRadioChange('therapistApproach', value)}>
                        {[
                          'Listens and guides me to explore my feelings and past.',
                          'Teaches me concrete skills, strategies, and (sometimes) homework.',
                          'A balance of both.'
                        ].map((option) => (
                          <div key={option} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value={option} id={`approach-${option}`} className="mt-0.5" />
                            <Label htmlFor={`approach-${option}`} className="cursor-pointer flex-1 text-base leading-tight">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        I want to focus on...
                      </Label>
                      <RadioGroup value={answers.focusArea} onValueChange={(value) => handleRadioChange('focusArea', value)}>
                        {[
                          'Solving my current problems and learning new coping skills.',
                          'Understanding my past to see how it affects my present.',
                          "I'm not sure, I'd like my therapist to help me decide."
                        ].map((option) => (
                          <div key={option} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value={option} id={`focus-${option}`} className="mt-0.5" />
                            <Label htmlFor={`focus-${option}`} className="cursor-pointer flex-1 text-base leading-tight">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </>
                )}

                {/* Step 4: Therapist Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">
                      Do you have a preference for your therapist's gender?
                      <span className="text-sm font-normal text-muted-foreground ml-2">(100% optional)</span>
                    </Label>
                    <RadioGroup value={answers.genderPreference} onValueChange={(value) => handleRadioChange('genderPreference', value)}>
                      {[
                        'I prefer a male therapist',
                        'I prefer a female therapist',
                        'No preference'
                      ].map((option) => (
                        <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={option} id={`gender-${option}`} />
                          <Label htmlFor={`gender-${option}`} className="cursor-pointer flex-1 text-base">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex-1"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      className="flex-1"
                      size="lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Show My Matches
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
