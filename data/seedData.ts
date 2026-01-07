// Seed data for Speak Your Mind Academy
// Organization: akphss@gmail.com

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string; // For demo: same as roll number
  rollNumber: string;
  class: string;
  tier: string;
  status: 'Active' | 'Disabled';
  sessions: number;
  score: number;
  debateStats: {
    total1v1Debates: number;
    won1v1Debates: number;
    totalAIDebates: number;
    wonAIDebates: number;
    winRate: number;
    avgScore: number;
    totalPoints: number;
    rank: string;
    strengths: string[];
    weaknesses: string[];
  };
  sessionHistory: DebateSession[];
  skillProgress: SkillMetric[];
}

export interface DebateSession {
  id: string;
  type: '1v1' | 'AI';
  topic: string;
  opponent: string;
  date: string;
  duration: string;
  result: 'Won' | 'Lost';
  score: number;
  yourArguments: number;
  opponentArguments: number;
  judgeRating: number;
  feedback: string;
}

export interface SkillMetric {
  skill: string;
  current: number;
  previous: number;
  trend: 'up' | 'down' | 'stable';
}

export const ORGANIZATION = {
  id: 'org_akphss',
  name: 'Speak Your Mind Academy',
  email: 'akphss@gmail.com',
  domain: 'akphss.edu',
  password: 'admin123', // Demo password
  industry: 'Education',
  status: 'Active' as const,
  users: 30,
  subscriptionTier: 'Premium',
  joinedDate: '2024-08-15'
};

const debateTopics = [
  "Social Media Does More Harm Than Good",
  "AI Will Replace Human Jobs",
  "Climate Change is the Greatest Threat",
  "Online Education is Better Than Traditional",
  "Privacy is More Important Than Security",
  "Technology Increases Social Isolation",
  "Democracy is the Best Form of Government",
  "Capital Punishment Should Be Abolished",
  "Free Speech Has Limits",
  "Globalization Benefits Everyone",
  "Healthcare is a Human Right",
  "Vaccination Should Be Mandatory",
  "Nuclear Energy is the Solution",
  "Immigration Strengthens Nations",
  "Universal Basic Income is Necessary",
  "Genetic Engineering Should Be Regulated",
  "Space Exploration is Worth the Cost",
  "Standardized Testing is Effective",
  "Renewable Energy Can Replace Fossil Fuels",
  "Cryptocurrency is the Future of Money"
];

const judgeComments = [
  "Excellent logical flow and strong rebuttals",
  "Good use of evidence but needs stronger conclusions",
  "Impressive argumentation with minor weaknesses in delivery",
  "Strong opening but lost momentum in middle rounds",
  "Outstanding performance with exceptional reasoning",
  "Solid arguments but could improve emotional appeal",
  "Well-structured debate with effective counterpoints",
  "Good effort but needs more factual support",
  "Compelling delivery with room for improvement in logic",
  "Exceptional debate skills demonstrated throughout"
];

const aiOpponents = ["Socrates AI", "Aristotle AI", "Logic Master AI", "Debate Bot Pro", "Rhetorica AI"];

function generateDebateSessions(studentName: string, total: number, winRate: number): DebateSession[] {
  const sessions: DebateSession[] = [];
  const wins = Math.floor(total * winRate);
  
  for (let i = 0; i < total; i++) {
    const isWin = i < wins;
    const is1v1 = Math.random() > 0.4; // 60% 1v1, 40% AI
    const daysAgo = Math.floor(Math.random() * 180); // Last 6 months
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const yourArgs = isWin ? Math.floor(Math.random() * 3) + 4 : Math.floor(Math.random() * 3) + 2;
    const oppArgs = isWin ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 3) + 4;
    const score = isWin ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 20) + 60;
    
    sessions.push({
      id: `session_${studentName}_${i}`,
      type: is1v1 ? '1v1' : 'AI',
      topic: debateTopics[Math.floor(Math.random() * debateTopics.length)],
      opponent: is1v1 ? `Student ${Math.floor(Math.random() * 30) + 1}` : aiOpponents[Math.floor(Math.random() * aiOpponents.length)],
      date: date.toISOString().split('T')[0],
      duration: `${Math.floor(Math.random() * 20) + 15}m`,
      result: isWin ? 'Won' : 'Lost',
      score,
      yourArguments: yourArgs,
      opponentArguments: oppArgs,
      judgeRating: isWin ? Math.random() * 1 + 4 : Math.random() * 1.5 + 3,
      feedback: judgeComments[Math.floor(Math.random() * judgeComments.length)]
    });
  }
  
  return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateSkillProgress(): SkillMetric[] {
  const skills = [
    'Logical Reasoning',
    'Evidence Usage',
    'Rebuttal Strength',
    'Delivery & Tone',
    'Persuasion',
    'Critical Thinking'
  ];
  
  return skills.map(skill => {
    const current = Math.floor(Math.random() * 30) + 70;
    const change = Math.floor(Math.random() * 10) - 3;
    return {
      skill,
      current,
      previous: current - change,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  });
}

export const STUDENTS: Student[] = [
  // Row 1
  {
    id: "SYM_4501",
    rollNumber: "4501",
    name: "AANYA",
    email: "aanya.4501@akphss.edu",
    password: "4501",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 45,
    score: 8.9,
    debateStats: {
      total1v1Debates: 28,
      won1v1Debates: 21,
      totalAIDebates: 17,
      wonAIDebates: 14,
      winRate: 77.8,
      avgScore: 8.9,
      totalPoints: 2850,
      rank: "Gold I",
      strengths: ["Logical Reasoning", "Evidence Usage", "Rebuttal Strength"],
      weaknesses: ["Time Management"]
    },
    sessionHistory: generateDebateSessions("AANYA", 45, 0.778),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4502",
    rollNumber: "4502",
    name: "AARAV",
    email: "aarav.4502@akphss.edu",
    password: "4502",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 32,
    score: 7.8,
    debateStats: {
      total1v1Debates: 20,
      won1v1Debates: 13,
      totalAIDebates: 12,
      wonAIDebates: 8,
      winRate: 65.6,
      avgScore: 7.8,
      totalPoints: 1920,
      rank: "Silver II",
      strengths: ["Persuasion", "Delivery"],
      weaknesses: ["Evidence Usage", "Structure"]
    },
    sessionHistory: generateDebateSessions("AARAV", 32, 0.656),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4503",
    rollNumber: "4503",
    name: "AARADHYA",
    email: "aaradhya.4503@akphss.edu",
    password: "4503",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 51,
    score: 9.2,
    debateStats: {
      total1v1Debates: 31,
      won1v1Debates: 26,
      totalAIDebates: 20,
      wonAIDebates: 17,
      winRate: 84.3,
      avgScore: 9.2,
      totalPoints: 3180,
      rank: "Gold I",
      strengths: ["Critical Thinking", "Persuasion", "Logical Reasoning"],
      weaknesses: ["Emotional Control"]
    },
    sessionHistory: generateDebateSessions("AARADHYA", 51, 0.843),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4504",
    rollNumber: "4504",
    name: "AARNA",
    email: "aarna.4504@akphss.edu",
    password: "4504",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 18,
    score: 6.5,
    debateStats: {
      total1v1Debates: 11,
      won1v1Debates: 5,
      totalAIDebates: 7,
      wonAIDebates: 3,
      winRate: 44.4,
      avgScore: 6.5,
      totalPoints: 890,
      rank: "Bronze III",
      strengths: ["Enthusiasm"],
      weaknesses: ["Evidence Usage", "Rebuttal Strength", "Structure"]
    },
    sessionHistory: generateDebateSessions("AARNA", 18, 0.444),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4505",
    rollNumber: "4505",
    name: "AASHI",
    email: "aashi.4505@akphss.edu",
    password: "4505",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 38,
    score: 7.6,
    debateStats: {
      total1v1Debates: 24,
      won1v1Debates: 15,
      totalAIDebates: 14,
      wonAIDebates: 9,
      winRate: 63.2,
      avgScore: 7.6,
      totalPoints: 1980,
      rank: "Silver I",
      strengths: ["Delivery & Tone", "Persuasion"],
      weaknesses: ["Logical Reasoning"]
    },
    sessionHistory: generateDebateSessions("AASHI", 38, 0.632),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4506",
    rollNumber: "4506",
    name: "AADHYA",
    email: "aadhya.4506@akphss.edu",
    password: "4506",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 47,
    score: 8.7,
    debateStats: {
      total1v1Debates: 29,
      won1v1Debates: 23,
      totalAIDebates: 18,
      wonAIDebates: 14,
      winRate: 78.7,
      avgScore: 8.7,
      totalPoints: 2890,
      rank: "Gold II",
      strengths: ["Evidence Usage", "Rebuttal Strength", "Critical Thinking"],
      weaknesses: ["Speed of Response"]
    },
    sessionHistory: generateDebateSessions("AADHYA", 47, 0.787),
    skillProgress: generateSkillProgress()
  },

  // Row 2
  {
    id: "SYM_4507",
    rollNumber: "4507",
    name: "ADVAIT",
    email: "advait.4507@akphss.edu",
    password: "4507",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 29,
    score: 7.3,
    debateStats: {
      total1v1Debates: 18,
      won1v1Debates: 11,
      totalAIDebates: 11,
      wonAIDebates: 6,
      winRate: 58.6,
      avgScore: 7.3,
      totalPoints: 1650,
      rank: "Silver III",
      strengths: ["Creativity", "Analogies"],
      weaknesses: ["Evidence Usage", "Structure"]
    },
    sessionHistory: generateDebateSessions("ADVAIT", 29, 0.586),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4508",
    rollNumber: "4508",
    name: "ADVIKA",
    email: "advika.4508@akphss.edu",
    password: "4508",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 22,
    score: 6.8,
    debateStats: {
      total1v1Debates: 14,
      won1v1Debates: 7,
      totalAIDebates: 8,
      wonAIDebates: 3,
      winRate: 45.5,
      avgScore: 6.8,
      totalPoints: 1120,
      rank: "Bronze II",
      strengths: ["Confidence"],
      weaknesses: ["Logical Reasoning", "Evidence Usage"]
    },
    sessionHistory: generateDebateSessions("ADVIKA", 22, 0.455),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4509",
    rollNumber: "4509",
    name: "AHANA",
    email: "ahana.4509@akphss.edu",
    password: "4509",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 53,
    score: 9.1,
    debateStats: {
      total1v1Debates: 33,
      won1v1Debates: 27,
      totalAIDebates: 20,
      wonAIDebates: 16,
      winRate: 81.1,
      avgScore: 9.1,
      totalPoints: 3240,
      rank: "Gold I",
      strengths: ["Logical Reasoning", "Critical Thinking", "Rebuttal Strength"],
      weaknesses: ["Tone Modulation"]
    },
    sessionHistory: generateDebateSessions("AHANA", 53, 0.811),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4510",
    rollNumber: "4510",
    name: "AKSH",
    email: "aksh.4510@akphss.edu",
    password: "4510",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 35,
    score: 7.5,
    debateStats: {
      total1v1Debates: 22,
      won1v1Debates: 14,
      totalAIDebates: 13,
      wonAIDebates: 8,
      winRate: 62.9,
      avgScore: 7.5,
      totalPoints: 1890,
      rank: "Silver I",
      strengths: ["Delivery & Tone", "Confidence"],
      weaknesses: ["Evidence Usage"]
    },
    sessionHistory: generateDebateSessions("AKSH", 35, 0.629),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4511",
    rollNumber: "4511",
    name: "ANANYA",
    email: "ananya.4511@akphss.edu",
    password: "4511",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 49,
    score: 8.8,
    debateStats: {
      total1v1Debates: 30,
      won1v1Debates: 24,
      totalAIDebates: 19,
      wonAIDebates: 15,
      winRate: 79.6,
      avgScore: 8.8,
      totalPoints: 2950,
      rank: "Gold II",
      strengths: ["Persuasion", "Evidence Usage", "Structure"],
      weaknesses: ["Emotional Detachment"]
    },
    sessionHistory: generateDebateSessions("ANANYA", 49, 0.796),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4512",
    rollNumber: "4512",
    name: "ANAY",
    email: "anay.4512@akphss.edu",
    password: "4512",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 15,
    score: 6.2,
    debateStats: {
      total1v1Debates: 9,
      won1v1Debates: 3,
      totalAIDebates: 6,
      wonAIDebates: 2,
      winRate: 33.3,
      avgScore: 6.2,
      totalPoints: 720,
      rank: "Bronze III",
      strengths: ["Effort"],
      weaknesses: ["All Core Skills"]
    },
    sessionHistory: generateDebateSessions("ANAY", 15, 0.333),
    skillProgress: generateSkillProgress()
  },

  // Row 3
  {
    id: "SYM_4513",
    rollNumber: "4513",
    name: "ANVI",
    email: "anvi.4513@akphss.edu",
    password: "4513",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 31,
    score: 7.4,
    debateStats: {
      total1v1Debates: 19,
      won1v1Debates: 12,
      totalAIDebates: 12,
      wonAIDebates: 7,
      winRate: 61.3,
      avgScore: 7.4,
      totalPoints: 1770,
      rank: "Silver II",
      strengths: ["Adaptability", "Quick Thinking"],
      weaknesses: ["Preparation", "Evidence"]
    },
    sessionHistory: generateDebateSessions("ANVI", 31, 0.613),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4514",
    rollNumber: "4514",
    name: "ARJUN",
    email: "arjun.4514@akphss.edu",
    password: "4514",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 56,
    score: 9.3,
    debateStats: {
      total1v1Debates: 35,
      won1v1Debates: 30,
      totalAIDebates: 21,
      wonAIDebates: 18,
      winRate: 85.7,
      avgScore: 9.3,
      totalPoints: 3420,
      rank: "Gold I",
      strengths: ["All Core Skills", "Leadership", "Strategic Thinking"],
      weaknesses: ["Overconfidence"]
    },
    sessionHistory: generateDebateSessions("ARJUN", 56, 0.857),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4515",
    rollNumber: "4515",
    name: "ARNAV",
    email: "arnav.4515@akphss.edu",
    password: "4515",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 27,
    score: 7.1,
    debateStats: {
      total1v1Debates: 17,
      won1v1Debates: 10,
      totalAIDebates: 10,
      wonAIDebates: 5,
      winRate: 55.6,
      avgScore: 7.1,
      totalPoints: 1540,
      rank: "Silver III",
      strengths: ["Creativity"],
      weaknesses: ["Structure", "Rebuttal"]
    },
    sessionHistory: generateDebateSessions("ARNAV", 27, 0.556),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4516",
    rollNumber: "4516",
    name: "ARYAN",
    email: "aryan.4516@akphss.edu",
    password: "4516",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 44,
    score: 8.6,
    debateStats: {
      total1v1Debates: 27,
      won1v1Debates: 21,
      totalAIDebates: 17,
      wonAIDebates: 13,
      winRate: 77.3,
      avgScore: 8.6,
      totalPoints: 2760,
      rank: "Gold II",
      strengths: ["Logical Reasoning", "Evidence Usage"],
      weaknesses: ["Delivery Speed"]
    },
    sessionHistory: generateDebateSessions("ARYAN", 44, 0.773),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4517",
    rollNumber: "4517",
    name: "ATHARV",
    email: "atharv.4517@akphss.edu",
    password: "4517",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 20,
    score: 6.6,
    debateStats: {
      total1v1Debates: 12,
      won1v1Debates: 5,
      totalAIDebates: 8,
      wonAIDebates: 4,
      winRate: 45.0,
      avgScore: 6.6,
      totalPoints: 960,
      rank: "Bronze II",
      strengths: ["Participation"],
      weaknesses: ["Confidence", "Structure"]
    },
    sessionHistory: generateDebateSessions("ATHARV", 20, 0.45),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4518",
    rollNumber: "4518",
    name: "AVNI",
    email: "avni.4518@akphss.edu",
    password: "4518",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 36,
    score: 7.7,
    debateStats: {
      total1v1Debates: 23,
      won1v1Debates: 15,
      totalAIDebates: 13,
      wonAIDebates: 8,
      winRate: 63.9,
      avgScore: 7.7,
      totalPoints: 1950,
      rank: "Silver I",
      strengths: ["Persuasion", "Tone"],
      weaknesses: ["Evidence Quality"]
    },
    sessionHistory: generateDebateSessions("AVNI", 36, 0.639),
    skillProgress: generateSkillProgress()
  },

  // Row 4
  {
    id: "SYM_4519",
    rollNumber: "4519",
    name: "AVYAN",
    email: "avyan.4519@akphss.edu",
    password: "4519",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 48,
    score: 8.9,
    debateStats: {
      total1v1Debates: 30,
      won1v1Debates: 24,
      totalAIDebates: 18,
      wonAIDebates: 14,
      winRate: 79.2,
      avgScore: 8.9,
      totalPoints: 2920,
      rank: "Gold I",
      strengths: ["Critical Thinking", "Rebuttal", "Logic"],
      weaknesses: ["Time Management"]
    },
    sessionHistory: generateDebateSessions("AVYAN", 48, 0.792),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4520",
    rollNumber: "4520",
    name: "AYAAN",
    email: "ayaan.4520@akphss.edu",
    password: "4520",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 30,
    score: 7.2,
    debateStats: {
      total1v1Debates: 19,
      won1v1Debates: 11,
      totalAIDebates: 11,
      wonAIDebates: 6,
      winRate: 56.7,
      avgScore: 7.2,
      totalPoints: 1620,
      rank: "Silver III",
      strengths: ["Confidence", "Delivery"],
      weaknesses: ["Evidence", "Structure"]
    },
    sessionHistory: generateDebateSessions("AYAAN", 30, 0.567),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4521",
    rollNumber: "4521",
    name: "AYUSH",
    email: "ayush.4521@akphss.edu",
    password: "4521",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 16,
    score: 6.3,
    debateStats: {
      total1v1Debates: 10,
      won1v1Debates: 4,
      totalAIDebates: 6,
      wonAIDebates: 2,
      winRate: 37.5,
      avgScore: 6.3,
      totalPoints: 780,
      rank: "Bronze III",
      strengths: ["Attendance"],
      weaknesses: ["All Skills Need Work"]
    },
    sessionHistory: generateDebateSessions("AYUSH", 16, 0.375),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4522",
    rollNumber: "4522",
    name: "DARSH",
    email: "darsh.4522@akphss.edu",
    password: "4522",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 33,
    score: 7.6,
    debateStats: {
      total1v1Debates: 21,
      won1v1Debates: 13,
      totalAIDebates: 12,
      wonAIDebates: 8,
      winRate: 63.6,
      avgScore: 7.6,
      totalPoints: 1860,
      rank: "Silver II",
      strengths: ["Adaptability", "Quick Response"],
      weaknesses: ["Depth of Analysis"]
    },
    sessionHistory: generateDebateSessions("DARSH", 33, 0.636),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4523",
    rollNumber: "4523",
    name: "DEVANSH",
    email: "devansh.4523@akphss.edu",
    password: "4523",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 52,
    score: 9.0,
    debateStats: {
      total1v1Debates: 32,
      won1v1Debates: 26,
      totalAIDebates: 20,
      wonAIDebates: 16,
      winRate: 80.8,
      avgScore: 9.0,
      totalPoints: 3120,
      rank: "Gold I",
      strengths: ["Evidence Usage", "Logic", "Persuasion"],
      weaknesses: ["Emotional Appeal"]
    },
    sessionHistory: generateDebateSessions("DEVANSH", 52, 0.808),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4524",
    rollNumber: "4524",
    name: "DHRUV",
    email: "dhruv.4524@akphss.edu",
    password: "4524",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 28,
    score: 7.0,
    debateStats: {
      total1v1Debates: 17,
      won1v1Debates: 9,
      totalAIDebates: 11,
      wonAIDebates: 6,
      winRate: 53.6,
      avgScore: 7.0,
      totalPoints: 1480,
      rank: "Silver III",
      strengths: ["Persistence"],
      weaknesses: ["Logic", "Evidence"]
    },
    sessionHistory: generateDebateSessions("DHRUV", 28, 0.536),
    skillProgress: generateSkillProgress()
  },

  // Row 5
  {
    id: "SYM_4525",
    rollNumber: "4525",
    name: "DIYA",
    email: "diya.4525@akphss.edu",
    password: "4525",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 50,
    score: 8.8,
    debateStats: {
      total1v1Debates: 31,
      won1v1Debates: 25,
      totalAIDebates: 19,
      wonAIDebates: 15,
      winRate: 80.0,
      avgScore: 8.8,
      totalPoints: 3000,
      rank: "Gold I",
      strengths: ["Persuasion", "Delivery", "Structure"],
      weaknesses: ["Technical Depth"]
    },
    sessionHistory: generateDebateSessions("DIYA", 50, 0.80),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4526",
    rollNumber: "4526",
    name: "DIVYANSH",
    email: "divyansh.4526@akphss.edu",
    password: "4526",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 19,
    score: 6.7,
    debateStats: {
      total1v1Debates: 12,
      won1v1Debates: 5,
      totalAIDebates: 7,
      wonAIDebates: 3,
      winRate: 42.1,
      avgScore: 6.7,
      totalPoints: 920,
      rank: "Bronze II",
      strengths: ["Improvement Mindset"],
      weaknesses: ["Confidence", "Evidence"]
    },
    sessionHistory: generateDebateSessions("DIVYANSH", 19, 0.421),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4527",
    rollNumber: "4527",
    name: "HRIDAY",
    email: "hriday.4527@akphss.edu",
    password: "4527",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 34,
    score: 7.5,
    debateStats: {
      total1v1Debates: 21,
      won1v1Debates: 13,
      totalAIDebates: 13,
      wonAIDebates: 8,
      winRate: 61.8,
      avgScore: 7.5,
      totalPoints: 1820,
      rank: "Silver II",
      strengths: ["Critical Thinking", "Creativity"],
      weaknesses: ["Structure"]
    },
    sessionHistory: generateDebateSessions("HRIDAY", 34, 0.618),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4528",
    rollNumber: "4528",
    name: "ISHAAN",
    email: "ishaan.4528@akphss.edu",
    password: "4528",
    class: "10-A",
    tier: "Gold Orator",
    status: "Active",
    sessions: 55,
    score: 9.4,
    debateStats: {
      total1v1Debates: 34,
      won1v1Debates: 30,
      totalAIDebates: 21,
      wonAIDebates: 19,
      winRate: 89.1,
      avgScore: 9.4,
      totalPoints: 3520,
      rank: "Platinum",
      strengths: ["All Core Skills", "Innovation", "Leadership"],
      weaknesses: ["None Significant"]
    },
    sessionHistory: generateDebateSessions("ISHAAN", 55, 0.891),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4529",
    rollNumber: "4529",
    name: "KIAAN",
    email: "kiaan.4529@akphss.edu",
    password: "4529",
    class: "10-A",
    tier: "Silver Rhetoric",
    status: "Active",
    sessions: 26,
    score: 6.9,
    debateStats: {
      total1v1Debates: 16,
      won1v1Debates: 9,
      totalAIDebates: 10,
      wonAIDebates: 5,
      winRate: 53.8,
      avgScore: 6.9,
      totalPoints: 1440,
      rank: "Silver III",
      strengths: ["Enthusiasm"],
      weaknesses: ["Evidence", "Rebuttal"]
    },
    sessionHistory: generateDebateSessions("KIAAN", 26, 0.538),
    skillProgress: generateSkillProgress()
  },
  {
    id: "SYM_4530",
    rollNumber: "4530",
    name: "KIAN",
    email: "kian.4530@akphss.edu",
    password: "4530",
    class: "10-A",
    tier: "Bronze Logos",
    status: "Active",
    sessions: 14,
    score: 6.1,
    debateStats: {
      total1v1Debates: 8,
      won1v1Debates: 3,
      totalAIDebates: 6,
      wonAIDebates: 2,
      winRate: 35.7,
      avgScore: 6.1,
      totalPoints: 680,
      rank: "Bronze III",
      strengths: ["Trying"],
      weaknesses: ["All Core Areas"]
    },
    sessionHistory: generateDebateSessions("KIAN", 14, 0.357),
    skillProgress: generateSkillProgress()
  }
];

// Initialize localStorage with seed data
export function initializeSeedData() {
  // Set organization
  localStorage.setItem('org_data', JSON.stringify(ORGANIZATION));
  
  // Set students as org members
  localStorage.setItem('org_admin_members', JSON.stringify(STUDENTS));
  
  // Set student credentials for login
  const studentCredentials = STUDENTS.map(s => ({
    email: s.email,
    password: s.password,
    type: 'ORGANIZATION' as const,
    userData: s
  }));
  localStorage.setItem('student_credentials', JSON.stringify(studentCredentials));
  
  console.log('✅ Seed data initialized successfully');
  console.log(`📚 Organization: ${ORGANIZATION.name}`);
  console.log(`👥 Students loaded: ${STUDENTS.length}`);
}
