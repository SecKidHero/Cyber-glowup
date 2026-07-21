# 🛡️ CYBER GLOW-UP CHALLENGE - CODE GUARDRAILS

## **DO NOT MODIFY** - Critical Files

These files contain the core quiz logic and must not be modified without careful consideration:

### 1. **`js/quiz-app.js`** - Quiz Logic Engine
**What it does:**
- Manages quiz state (current question, answers, archetype matching)
- Handles page navigation and back button
- Processes answer selection and immediate feedback
- Calculates final archetype match
- Generates career reveal page

**Critical Functions - DO NOT CHANGE:**
```javascript
- app.nextQuestion()           // Handles progression between questions
- app.selectAnswer()           // Processes answer selection and feedback
- app.calculateArchetypeMatch() // Matches strength quiz answers to archetypes
- app.showCareerReveal()       // Generates final results page
- app.state object             // All user data and quiz progress
```

**Safe to Modify:**
- Button text and labels
- Feedback messages
- Styling (colors, fonts)
- User-facing copy

---

### 2. **`js/quiz-data.js`** - Questions & Archetypes
**What it does:**
- Stores all 15 quiz questions (5 per quiz)
- Stores correct answer indices and explanations
- Stores 6 archetype profiles with job descriptions
- Maps strength quiz answers to archetypes

**Critical Structure - DO NOT CHANGE:**
```javascript
// Online Safety & AI Reality: MUST have this structure
{
  id: number,
  question: "string",
  answers: ["option1", "option2", "option3"],
  correct: 0-2,  // Index of correct answer
  explanation: "string"
}

// Strength Quiz: MUST have this structure
{
  id: number,
  question: "string",
  answers: [
    { text: "option", archetype: "investigator|builder|protector|strategist|connector|explorer" },
    // ...
  ]
}

// Archetypes: MUST include all fields
{
  name: "string",
  tagline: "string",
  description: "string",
  roles: ["job1", "job2", ...],
  skills: ["skill1", "skill2", ...]
}
```

**Safe to Modify:**
- Question wording
- Answer options
- Explanations
- Archetype descriptions
- Job roles
- Skills

**DO NOT MODIFY:**
- `correct` index values (breaks answer checking)
- `archetype` field values in strength quiz (breaks archetype matching)
- Archetype keys ('investigator', 'builder', etc.) - these are referenced in code
- Number of questions per quiz (must be 5 each)

---

### 3. **`quizzes.html`** - Quiz Page Structure
**What it does:**
- Provides HTML structure for all 5 quiz pages
- Links to CSS and JavaScript files
- Contains IDs that JavaScript depends on

**Critical IDs - DO NOT RENAME:**
```html
<!-- Buttons -->
id="registration-form"
id="safety-next-btn", id="ai-next-btn", id="strength-next-btn"

<!-- Content Containers -->
id="safety-quiz-content"
id="ai-quiz-content"
id="strength-quiz-content"
id="career-reveal-content"
id="archetype-cards-display"

<!-- Progress Elements -->
id="safety-progress", id="safety-progress-fill"
id="ai-progress", id="ai-progress-fill"
id="strength-progress", id="strength-progress-fill"

<!-- User Info Display -->
id="reveal-name"
```

**Safe to Modify:**
- Button text and labels
- Placeholder text in forms
- Page titles and subtitles
- Styling classes

---

### 4. **`css/quizzes.css`** - Quiz Styling
**What it does:**
- Styles all quiz pages
- Ensures dark cyberpunk theme
- Mobile responsiveness

**Critical Classes - DO NOT REMOVE:**
```css
.page           /* Page container - required for page switching */
.quiz-answer-btn /* Answer button - styled by JavaScript */
.answer-letter   /* A/B/C circles - must display inline */
.progress-fill   /* Progress bar animation */
.quiz-answers    /* Answer list container */
```

**Safe to Modify:**
- Colors (maintain dark background + readable text)
- Font sizes
- Spacing and padding
- Hover and active states
- Mobile breakpoints
- Animations

---

## **Quiz Flow - DO NOT BREAK**

The quiz follows this exact sequence:

```
Registration Form
    ↓
Online Safety Quiz (5 questions)
    ↓
AI Reality Check (5 questions)
    ↓
Career Strength Quiz (5 questions)
    ↓
Career Reveal (Results page)
```

**Each step requires:**
1. User selects answer
2. Immediate feedback shows (correct/incorrect)
3. Next button appears
4. User clicks Next
5. Move to next question or next quiz

DO NOT SKIP any of these steps.

---

## **Answer Feedback Flow - REQUIRED**

When a user selects an answer, MUST show:

```
1. Highlight correct answer in cyan (#00F0FF)
2. Highlight wrong selection in magenta (#FF007A)
3. Show feedback message:
   - "✓ Correct!" if right
   - "✗ Incorrect" if wrong
4. Show correct answer text if wrong:
   - "Correct Answer: [text]"
5. Show explanation from quiz-data.js
6. Show Next button (or "Reveal Results" on last question)
```

DO NOT REMOVE any part of this flow.

---

## **Archetype Matching - DO NOT BREAK**

The Career Reveal page MUST:

1. Count how many times each archetype appears in strength quiz answers
2. Select archetype with highest count
3. Display all 5 archetype cards with overlapping effect
4. Highlight matched archetype with magenta glow (3 stars)
5. Show matched archetype details: description, roles, skills
6. Show user info: Name, Team, Gaming Tag
7. Link to NICCS career pathways tool

DO NOT MODIFY archetype key names or the counting logic.

---

## **Mobile Optimization - REQUIRED**

All pages MUST work on:
- 320px screens (iPhone SE)
- 480px screens (iPhone 12 mini)
- 768px screens (iPad)
- 1024px+ screens (desktop)

Breakpoints are in `quizzes.css`. Test changes on mobile.

---

## **When You Need to Add Features**

❌ **DO NOT:**
- Add localStorage/persistence (data clears after quiz)
- Add new quiz pages
- Change quiz progression order
- Add social sharing buttons
- Add leaderboard (not in scope)

✅ **DO:**
- Update question text or explanations
- Add new archetype profiles (if needed)
- Modify styling/colors
- Update button copy
- Fix bugs in existing features

---

## **Version Control**

**Main branch is PRODUCTION.** All changes go through:
1. ✅ Test locally
2. ✅ Verify quiz flow works end-to-end
3. ✅ Test on mobile (Chrome DevTools)
4. ✅ Commit with clear message
5. ✅ Push to GitHub (auto-deploys to Netlify)

**Always test the FULL quiz flow after changes.**

---

## **Testing Checklist**

Before committing, verify:

- [ ] Registration form works (fills all 3 fields, submits)
- [ ] Online Safety Quiz: 5 questions, feedback shows, Next button works
- [ ] AI Reality Check: 5 questions, feedback shows, Next button works
- [ ] Career Strength: 5 questions, "Reveal Results" on last one
- [ ] Career Reveal: Shows correct archetype, displays all cards, links work
- [ ] Back button works on all pages
- [ ] Mobile view (320px, 480px) is responsive
- [ ] No console errors (F12 → Console tab)

---

## **Emergency Rollback**

If something breaks:

```bash
# Revert to last working commit
git log --oneline          # Find commit hash
git revert <commit-hash>   # Creates new commit that undoes changes
git push origin main       # Netlify auto-deploys
```

---

## **Questions?**

If you're unsure whether a change is safe:
1. Check this document first
2. Always test the full quiz flow
3. Commit with a clear message about what changed
4. Watch Netlify deploy for any errors

**When in doubt, backup your changes and test locally first.**
