/* ========================================
   CYBER GLOW-UP CHALLENGE v2.1
   Quiz Data & Questions
   ======================================== */

const QuizData = {
  // Online Safety Quiz (5 questions)
  onlineSafety: [
    {
      id: 1,
      question: "You receive an email asking you to click a link and 'verify your account.' What should you do FIRST?",
      answers: [
        "Click the link immediately to verify",
        "Check the sender's email address and hover over the link to see the real URL",
        "Forward it to a friend to ask if it's real"
      ],
      correct: 1,
      explanation: "Always check the sender's email and the actual link destination (not the displayed text) before clicking. This is a common phishing tactic."
    },
    {
      id: 2,
      question: "You see a video of your favorite celebrity saying something shocking. How do you verify if it's real?",
      answers: [
        "Assume it's real because you saw it online",
        "Check the eyes, facial features, mouth movements, and compare with known legitimate videos",
        "Just share it—if it was fake, someone would have said so already"
      ],
      correct: 1,
      explanation: "Deepfakes are getting better. Check for glitchy eyes, unnatural facial movements, and verify through reputable news sources."
    },
    {
      id: 3,
      question: "A chatbot you don't know asks for your personal information. What's the safest response?",
      answers: [
        "Share your first name, it's not a big deal",
        "Never share personal information with unknown chatbots; always call your bank or service provider directly to verify",
        "Share just your address, no financial info"
      ],
      correct: 1,
      explanation: "Unknown chatbots can be traps. Real companies won't ask for personal info through chat. Always verify by calling official numbers."
    },
    {
      id: 4,
      question: "You get a personalized message saying 'Hi Sarah! You won a prize—claim it here.' This is likely...",
      answers: [
        "A genuine prize you actually won",
        "AI social engineering—personalized messages to trick you into clicking malicious links",
        "A message from TikTok about new followers"
      ],
      correct: 1,
      explanation: "AI can now generate personalized messages with your real name to trick you. If you didn't enter a contest, it's a scam."
    },
    {
      id: 5,
      question: "You find an incredible deal online: 'New iPhone 15 for $50!' This seems...",
      answers: [
        "Real! Buy it now before it's gone",
        "Too good to be true—research the seller, check reviews, and verify through official stores",
        "From a trustworthy source because it's on the internet"
      ],
      correct: 1,
      explanation: "If it sounds too good to be true, it probably is. Research sellers, check official sources, and verify before buying."
    }
  ],

  // AI Reality Check (5 questions)
  aiReality: [
    {
      id: 1,
      question: "When you use AI tools like ChatGPT, what important thing should you remember?",
      answers: [
        "AI always gives you 100% accurate information",
        "AI can make mistakes, hallucinate facts, and confidently give wrong answers",
        "AI is sentient and has feelings"
      ],
      correct: 1,
      explanation: "AI models are powerful but imperfect. They can confidently produce false information (called 'hallucinations'). Always verify important facts."
    },
    {
      id: 2,
      question: "What is a deepfake?",
      answers: [
        "A fake social media profile",
        "AI-generated video or audio that mimics a real person's face, voice, or actions",
        "A photoshopped image on Instagram"
      ],
      correct: 1,
      explanation: "Deepfakes use AI to create convincing but fake videos/audio of real people. They're getting harder to spot."
    },
    {
      id: 3,
      question: "How do scammers use AI to trick people?",
      answers: [
        "They can't—AI is too honest",
        "They create fake voices, personalized messages, deepfakes, and chatbots that pretend to be trusted services",
        "AI only works for good purposes"
      ],
      correct: 1,
      explanation: "Scammers use AI to scale attacks: fake voice calls, personalized phishing, deepfake videos, and convincing chatbots."
    },
    {
      id: 4,
      question: "What's 'AI bias' and why does it matter?",
      answers: [
        "AI opinions about movies and music",
        "AI trained on biased data can perpetuate discrimination and give unfair results to certain groups",
        "AI doesn't have bias because it's a machine"
      ],
      correct: 1,
      explanation: "AI learns from data. If that data contains bias, the AI will too—affecting hiring, loans, criminal justice, and more."
    },
    {
      id: 5,
      question: "If an AI-generated image or text looks real, should you automatically trust it?",
      answers: [
        "Yes, if it looks real, it must be real",
        "No—always verify important information through trusted sources, even if AI-generated content looks convincing",
        "Only if it has a watermark"
      ],
      correct: 1,
      explanation: "AI can create convincing fake images, videos, and text. Visual authenticity ≠ actual authenticity. Verify independently."
    }
  ],

  // Career Strength Quiz (5 questions mapped to archetypes)
  strengthQuiz: [
    {
      id: 1,
      question: "Which activity sounds most appealing to you?",
      answers: [
        {
          text: "Looking for details and patterns in complex information",
          archetype: "investigator"
        },
        {
          text: "Creating or building something new with my hands or code",
          archetype: "builder"
        },
        {
          text: "Keeping systems safe and preventing problems",
          archetype: "protector"
        },
        {
          text: "Planning strategies and thinking through solutions",
          archetype: "strategist"
        },
        {
          text: "Working with people and building relationships",
          archetype: "connector"
        },
        {
          text: "None of the above—I'd rather do something completely different",
          archetype: "none"
        }
      ]
    },
    {
      id: 2,
      question: "When learning something new, you prefer to...",
      answers: [
        {
          text: "Analyze detailed information and research thoroughly",
          archetype: "investigator"
        },
        {
          text: "Learn by doing and experimenting with hands-on projects",
          archetype: "builder"
        },
        {
          text: "Understand the 'why' and how to prevent risks",
          archetype: "protector"
        },
        {
          text: "See the big picture and how everything connects",
          archetype: "strategist"
        },
        {
          text: "Learn with others in a group or collaborative setting",
          archetype: "connector"
        },
        {
          text: "Learn through art, photography, or creative expression",
          archetype: "none"
        }
      ]
    },
    {
      id: 3,
      question: "What energizes you most?",
      answers: [
        {
          text: "Solving puzzles and uncovering hidden information",
          archetype: "investigator"
        },
        {
          text: "Seeing a project come to life from my ideas",
          archetype: "builder"
        },
        {
          text: "Knowing I've protected others from harm",
          archetype: "protector"
        },
        {
          text: "Developing a winning game plan or strategy",
          archetype: "strategist"
        },
        {
          text: "Making meaningful connections with new people",
          archetype: "connector"
        },
        {
          text: "Creating or experiencing beautiful, artistic things",
          archetype: "none"
        }
      ]
    },
    {
      id: 4,
      question: "In a group project, you naturally...",
      answers: [
        {
          text: "Research all the details and track what's working",
          archetype: "investigator"
        },
        {
          text: "Jump in and start building the solution",
          archetype: "builder"
        },
        {
          text: "Identify potential problems and mitigate risks",
          archetype: "protector"
        },
        {
          text: "Help organize the approach and plan next steps",
          archetype: "strategist"
        },
        {
          text: "Make sure everyone's voice is heard and included",
          archetype: "connector"
        },
        {
          text: "Focus on the aesthetic or creative elements",
          archetype: "none"
        }
      ]
    },
    {
      id: 5,
      question: "If you could spend a day doing whatever you want, what would excite you most?",
      answers: [
        {
          text: "Investigating something mysterious or diving into research",
          archetype: "investigator"
        },
        {
          text: "Building, crafting, or creating something tangible",
          archetype: "builder"
        },
        {
          text: "Learning about cybersecurity or protecting others",
          archetype: "protector"
        },
        {
          text: "Planning an adventure or developing a game strategy",
          archetype: "strategist"
        },
        {
          text: "Spending time with friends or making new connections",
          archetype: "connector"
        },
        {
          text: "Creating art, taking photos, or doing something creative",
          archetype: "none"
        }
      ]
    }
  ],

  // Career Archetype Descriptions
  archetypeProfiles: {
    investigator: {
      name: "Investigator",
      tagline: "Spot the details. Find the truth.",
      icon: "🔍",
      description: "Investigators are detail-focused, analytical thinkers who love uncovering hidden information and solving puzzles. They excel at finding patterns, detecting fraud, and analyzing security risks.",
      roles: [
        "Forensic Analyst - Investigate cybercrimes and recover digital evidence",
        "Threat Intelligence Analyst - Research emerging threats and cyberattack patterns",
        "Penetration Tester - Ethically hack systems to find vulnerabilities",
        "Incident Response Analyst - Investigate and respond to security breaches",
        "Security Researcher - Discover new vulnerabilities and attack methods"
      ],
      skills: ["Critical thinking", "Attention to detail", "Research", "Pattern recognition", "Problem-solving"],
      niccsLink: "https://niccs.cisa.gov/tools/cyber-career-pathways-tool"
    },
    builder: {
      name: "Builder",
      tagline: "Create solutions. Bring ideas to life.",
      icon: "🔧",
      description: "Builders are creative, hands-on makers who turn ideas into reality. They love designing systems, writing code, and crafting elegant solutions to complex problems.",
      roles: [
        "Software Security Engineer - Build secure applications and systems",
        "Security Architect - Design secure infrastructure and systems",
        "Application Developer - Create secure, user-friendly applications",
        "DevSecOps Engineer - Integrate security into development workflows",
        "IoT Security Engineer - Secure Internet of Things devices and networks"
      ],
      skills: ["Coding", "System design", "Creativity", "Problem-solving", "Technical expertise"],
      niccsLink: "https://niccs.cisa.gov/tools/cyber-career-pathways-tool"
    },
    protector: {
      name: "Protector",
      tagline: "Defend. Prepare. Secure.",
      icon: "🛡️",
      description: "Protectors are security-minded and risk-aware. They focus on defending against threats, preventing attacks, and keeping systems and people safe from harm.",
      roles: [
        "Network Security Administrator - Monitor and protect network infrastructure",
        "Security Operations Center (SOC) Analyst - Monitor systems for attacks 24/7",
        "Compliance Officer - Ensure organizations follow security regulations",
        "Risk Management Analyst - Identify and mitigate business risks",
        "Cloud Security Engineer - Protect cloud-based systems and data"
      ],
      skills: ["Risk assessment", "Attention to detail", "Vigilance", "Communication", "Decision-making"],
      niccsLink: "https://niccs.cisa.gov/tools/cyber-career-pathways-tool"
    },
    strategist: {
      name: "Strategist",
      tagline: "Plan ahead. Think strategically.",
      icon: "♞",
      description: "Strategists are big-picture thinkers who develop long-term plans and strategies. They excel at connecting the dots, anticipating future challenges, and organizing complex initiatives.",
      roles: [
        "Chief Information Security Officer (CISO) - Lead organization's security strategy",
        "Security Program Manager - Develop and manage security initiatives",
        "Policy Analyst - Create security policies and compliance frameworks",
        "Business Continuity Planner - Ensure organizations can recover from attacks",
        "Cybersecurity Consultant - Help organizations plan security strategies"
      ],
      skills: ["Strategic thinking", "Planning", "Communication", "Leadership", "Business acumen"],
      niccsLink: "https://niccs.cisa.gov/tools/cyber-career-pathways-tool"
    },
    connector: {
      name: "Connector",
      tagline: "Build networks. Lead teams.",
      icon: "🕸️",
      description: "Connectors are people-focused and collaborative. They excel at bringing teams together, communicating complex ideas simply, and building strong relationships across organizations.",
      roles: [
        "Security Awareness Trainer - Educate others about cybersecurity",
        "Help Desk/Support Specialist - Support users and respond to security incidents",
        "Security Project Manager - Lead security projects and teams",
        "Customer Security Manager - Work with clients on their security needs",
        "Security Operations Manager - Lead and coordinate security teams"
      ],
      skills: ["Communication", "Teamwork", "Leadership", "Empathy", "Problem-solving"],
      niccsLink: "https://niccs.cisa.gov/tools/cyber-career-pathways-tool"
    },
    none: {
      name: "Explorer",
      tagline: "Your path is unique. Let's explore it together.",
      icon: "🌟",
      description: "Maybe tech careers aren't your jam—and that's perfectly okay! Cybersecurity needs people from all backgrounds. Your unique perspective brings value to the field.",
      roles: [
        "Explore cybersecurity through creative or interdisciplinary lenses",
        "Consider how your interests connect to digital safety",
        "Discover non-traditional cybersecurity roles",
        "Talk to mentors in fields you're passionate about",
        "Explore how businesses protect their creative assets and data"
      ],
      skills: ["Creativity", "Critical thinking", "Adaptability", "Curiosity", "Perspective"],
      niccsLink: "https://niccs.cisa.gov/tools/cyber-career-pathways-tool"
    }
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizData;
}
