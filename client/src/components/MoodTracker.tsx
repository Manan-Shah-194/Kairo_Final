import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const timeOptions = ['Other', 'Yesterday', 'Today'];
const moodOptions = [
  { label: 'Great', emoji: '😊', color: 'bg-emerald-300', gradient: 'from-emerald-200 to-emerald-300', value: 'great', score: 5 },
  { label: 'Good', emoji: '🙂', color: 'bg-teal-300', gradient: 'from-teal-200 to-teal-300', value: 'good', score: 4 },
  { label: 'Okay', emoji: '😐', color: 'bg-amber-200', gradient: 'from-amber-100 to-amber-200', value: 'okay', score: 3 },
  { label: 'Bad', emoji: '😔', color: 'bg-orange-300', gradient: 'from-orange-200 to-orange-300', value: 'bad', score: 2 },
  { label: 'Awful', emoji: '😢', color: 'bg-rose-300', gradient: 'from-rose-200 to-rose-300', value: 'awful', score: 1 },
];

const socialContextOptions = [
  { label: 'Myself', emoji: '👤' },
  { label: 'People I don\'t know', emoji: '👥' },
  { label: 'Close Family', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Extended Family', emoji: '👪' },
  { label: 'Friends', emoji: '👯' },
  { label: 'Coworkers', emoji: '💼' },
  { label: 'Partner', emoji: '💑' },
  { label: 'Dog', emoji: '🐕' },
  { label: 'Team', emoji: '⚽' },
  { label: 'Club', emoji: '🎭' },
];

const locationOptions = [
  { label: 'Home', emoji: '🏠' },
  { label: 'Work', emoji: '💼' },
  { label: 'Place of study', emoji: '🎓' },
  { label: 'Transport', emoji: '🚗' },
  { label: 'Gym activity', emoji: '🏋️' },
  { label: 'Bar / restaurant', emoji: '🍽️' },
];

interface MoodEntry {
  id: number;
  mood: string;
  note: string;
  date: string;
  time: string;
}

export default function MoodTracker() {
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('Today');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedContext, setSelectedContext] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const [moodHistory] = useState<MoodEntry[]>([
    { id: 1, mood: 'good', note: 'Had a productive meeting at work', date: 'Oct 27', time: '2:30 PM' },
    { id: 2, mood: 'okay', note: 'Feeling a bit tired but managing', date: 'Oct 27', time: '10:15 AM' },
    { id: 3, mood: 'great', note: 'Morning meditation helped me feel centered', date: 'Oct 26', time: '8:00 AM' },
    { id: 4, mood: 'bad', note: 'Struggling with some anxiety', date: 'Oct 25', time: '6:45 PM' },
    { id: 5, mood: 'good', note: 'Nice walk in the park', date: 'Oct 24', time: '5:00 PM' },
    { id: 6, mood: 'great', note: 'Achieved my goals for the day', date: 'Oct 23', time: '7:30 PM' },
    { id: 7, mood: 'okay', note: 'Just an average day', date: 'Oct 22', time: '12:00 PM' },
  ]);

  const handleSave = () => {
    if (selectedMood) {
      console.log('Mood logged:', { mood: selectedMood, context: selectedContext, location: selectedLocation, note, time: selectedTime });
      setSaved(true);
      setTimeout(() => {
        setSelectedMood('');
        setSelectedContext([]);
        setSelectedLocation([]);
        setNote('');
        setStep(1);
        setSaved(false);
      }, 2000);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const toggleContext = (context: string) => {
    setSelectedContext(prev =>
      prev.includes(context)
        ? prev.filter(c => c !== context)
        : [...prev, context]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocation(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const getMoodData = (moodValue: string) => {
    return moodOptions.find(m => m.value === moodValue);
  };

  const currentMoodData = moodOptions.find(m => m.value === selectedMood);

  const chartData = [...moodHistory].reverse().map((entry) => ({
    date: entry.date,
    score: moodOptions.find(m => m.value === entry.mood)?.score || 3,
    mood: entry.mood,
  }));

  const moodDistribution = moodOptions.map((mood) => ({
    name: mood.label,
    value: moodHistory.filter(entry => entry.mood === mood.value).length,
    color: mood.color,
  })).filter(item => item.value > 0);

  const COLORS = ['#6ee7b7', '#5eead4', '#fde68a', '#fdba74', '#fda4af'];

  const getBackgroundGradient = () => {
    if (!currentMoodData) return 'from-background to-muted/30';
    switch (selectedMood) {
      case 'great': return 'from-emerald-200/20 via-emerald-100/10 to-background';
      case 'good': return 'from-teal-200/20 via-teal-100/10 to-background';
      case 'okay': return 'from-amber-100/20 via-amber-50/10 to-background';
      case 'bad': return 'from-orange-200/20 via-orange-100/10 to-background';
      case 'awful': return 'from-rose-200/20 via-rose-100/10 to-background';
      default: return 'from-background to-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        animate={{
          background: currentMoodData ? `linear-gradient(to bottom, ${getBackgroundGradient()})` : undefined
        }}
        transition={{ duration: 0.5 }}
        className={`bg-gradient-to-b ${getBackgroundGradient()} rounded-2xl`}
      >
        <Card className="p-6 bg-transparent border-none shadow-none" data-testid="card-mood-tracker">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className={`p-3 rounded-lg ${currentMoodData ? currentMoodData.color : 'bg-primary/10'}`}
                animate={{
                  scale: currentMoodData ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-6 h-6 text-white" data-testid="icon-heart" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold" data-testid="text-mood-title">Track Your Mood</h2>
                <p className="text-muted-foreground" data-testid="text-mood-subtitle">
                  {currentMoodData ? `Feeling ${currentMoodData.label} today!` : 'Log how you\'re feeling throughout the day'}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tracking your mood helps you recognize emotional patterns and triggers over time. Log how you're feeling 
              right now, add optional notes about what's influencing your emotions, and build a history of your emotional 
              well-being. Regular mood tracking provides valuable insights into your mental health journey and helps you 
              identify what makes you feel your best.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Step 1: Rate your mood */}
              {step === 1 && (
                <>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6">Rate your mood</h3>
                    
                    {/* Time selector */}
                    <div className="flex justify-center gap-2 mb-8">
                      {timeOptions.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                          className="min-w-24"
                          size="sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>

                    {/* Large mood emoji display with animated background */}
                    <motion.div 
                      className="flex justify-center mb-8"
                      animate={{
                        scale: currentMoodData ? [1, 1.05, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-56 h-56 flex items-center justify-center rounded-full shadow-2xl bg-gradient-to-br ${currentMoodData ? currentMoodData.gradient : 'from-muted to-muted/50'}`}>
                        <span className="text-9xl filter drop-shadow-lg">
                          {currentMoodData ? currentMoodData.emoji : '😐'}
                        </span>
                      </div>
                    </motion.div>

                    {/* Mood buttons with enhanced styling */}
                    <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto">
                      {moodOptions.map((mood) => (
                        <motion.button
                          key={mood.value}
                          onClick={() => setSelectedMood(mood.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all shadow-md ${
                            selectedMood === mood.value
                              ? `bg-gradient-to-br ${mood.gradient} text-white shadow-lg ring-4 ring-offset-2 ring-offset-background ring-${mood.color.split('-')[1]}-300`
                              : 'bg-card hover:bg-accent border-2 border-border'
                          }`}
                          data-testid={`button-mood-${mood.value}`}
                        >
                          <span className="text-3xl filter drop-shadow">{mood.emoji}</span>
                          <span className="text-sm font-semibold">{mood.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Who were you with? */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center">Who were you with?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                    {socialContextOptions.map((context) => (
                      <motion.button
                        key={context.label}
                        onClick={() => toggleContext(context.label)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 shadow-sm ${
                          selectedContext.includes(context.label)
                            ? `bg-gradient-to-br ${currentMoodData?.gradient || 'from-primary to-primary/80'} text-white border-transparent shadow-lg`
                            : 'bg-card border-muted hover:border-primary/50 hover:bg-accent'
                        }`}
                      >
                        <span className="text-3xl filter drop-shadow">{context.emoji}</span>
                        <span className="text-xs font-medium text-center">{context.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Where were you? */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center">Where were you?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                    {locationOptions.map((location) => (
                      <motion.button
                        key={location.label}
                        onClick={() => toggleLocation(location.label)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 shadow-sm ${
                          selectedLocation.includes(location.label)
                            ? `bg-gradient-to-br ${currentMoodData?.gradient || 'from-primary to-primary/80'} text-white border-transparent shadow-lg`
                            : 'bg-card border-muted hover:border-primary/50 hover:bg-accent'
                        }`}
                      >
                        <span className="text-3xl filter drop-shadow">{location.emoji}</span>
                        <span className="text-sm font-medium text-center">{location.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 max-w-xl mx-auto">
                    <label className="text-sm font-medium mb-2 block">Additional notes (optional)</label>
                    <Textarea
                      placeholder="What contributed to this mood?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-[100px] bg-card/50 backdrop-blur-sm"
                      data-testid="input-mood-note"
                    />
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-6 max-w-xl mx-auto">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 h-14 text-lg"
                    size="lg"
                  >
                    BACK
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={(step === 1 && !selectedMood) || saved}
                  className={`flex-1 h-14 text-lg font-semibold bg-gradient-to-r ${currentMoodData?.gradient || 'from-primary to-primary/90'} hover:opacity-90`}
                  size="lg"
                  data-testid="button-save-mood"
                >
                  {saved ? '✓ SAVED!' : step === 3 ? 'SAVE' : 'NEXT'}
                </Button>
              </div>

              {/* Step indicator */}
              <div className="flex justify-center gap-2 pt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all ${
                      s === step 
                        ? `w-8 ${currentMoodData ? currentMoodData.color : 'bg-primary'}` 
                        : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Mood Analytics Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Trend Graph */}
        <Card className="p-6" data-testid="card-mood-trend">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-300 to-purple-300 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold" data-testid="text-trend-title">Mood Trend</h3>
              <p className="text-sm text-muted-foreground">Your emotional journey over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                domain={[0, 5]} 
                ticks={[1, 2, 3, 4, 5]}
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => {
                  const mood = moodOptions.find(m => m.score === value);
                  return [mood?.label || 'Unknown', 'Mood'];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#a78bfa" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorMood)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Mood Distribution */}
        <Card className="p-6" data-testid="card-mood-distribution">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-pink-300 to-rose-300 p-3 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Mood Distribution</h3>
              <p className="text-sm text-muted-foreground">Your overall emotional balance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={moodDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {moodDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {moodDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full`} 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Mood History with Enhanced Cards */}
      <Card className="p-6" data-testid="card-mood-history">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2" data-testid="text-history-title">
          <Heart className="w-5 h-5 text-primary" />
          Recent Mood History
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {moodHistory.map((entry) => {
            const moodData = getMoodData(entry.mood);
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${moodData?.gradient || 'from-muted to-muted/50'} shadow-md hover:shadow-lg transition-all`}
                data-testid={`mood-entry-${entry.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl filter drop-shadow-lg">{moodData?.emoji}</span>
                    <div>
                      <span className="font-bold text-gray-800 text-lg capitalize">{entry.mood}</span>
                      <p className="text-xs text-gray-700">{entry.date} at {entry.time}</p>
                    </div>
                  </div>
                </div>
                {entry.note && (
                  <p className="text-sm text-gray-700 mt-2 bg-white/30 rounded-lg p-2">
                    {entry.note}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
