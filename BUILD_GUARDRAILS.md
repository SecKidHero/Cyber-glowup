# 🚨 CYBER GLOW-UP BUILD GUARDRAILS

**These are non-negotiable rules. Violating them breaks the app.**

---

## 🔴 CRITICAL FILES - DO NOT MODIFY WITHOUT APPROVAL

### `quizzes.html`
**Purpose:** Main entry point for quiz system. Contains all 5 pages (registration, 3 quizzes, career reveal).

**PROTECTED SECTIONS:**
- Registration form IDs: `page-registration`, `registration-form`
- Quiz page IDs: `page-online-safety-quiz`, `page-ai-reality-quiz`, `page-strength-quiz`
- Content divs: `safety-quiz-content`, `ai-quiz-content`, `strength-quiz-content`
- Progress elements: `safety-progress`, `ai-progress`, `strength-progress`
- Next buttons: `safety-next-btn`, `ai-next-btn`, `strength-next-btn`
- Career reveal: `page-career-reveal`

**IF YOU MUST MODIFY:** Document why in commit message and test all 5 pages end-to-end on mobile (320px).

---

### `css/quizzes.css`
**Purpose:** Dark cyberpunk theme for quiz pages. These colors are CRITICAL and must NEVER change.

**🚨 PROTECTED COLORS (DO NOT TOUCH):**
```css
background: #0B0F19;      /* Dark background - MUST stay */
color: #FFFFFF;           /* Text - MUST stay white */
--color-primary: #00F0FF; /* Cyan accent - MUST stay */
--color-secondary: #FF007A; /* Magenta accent - MUST stay */
```

**PROTECTED SECTIONS (DO NOT DELETE):**
- Lines 1-14: Critical dark theme overrides with `!important`
- Answer button styling (`.quiz-answer-btn`)
- Correct/incorrect answer highlighting (`.correct-answer`, `.incorrect-answer`)
- Progress bar styling
- Mobile breakpoints (480px, 768px)

**IF YOU MUST MODIFY:**
- Only add new CSS, never remove existing rules
- Always preserve the `!important` flags on dark theme colors
- Test on mobile after any changes

---

### `js/quiz-app.js`
**Purpose:** Core quiz logic. Answer processing and feedback display.

**PROTECTED FUNCTIONS (DO NOT BREAK):**
```javascript
answerOnlineSafetyQuestion()      // Must show feedback + explanation
answerAIRealityQuestion()         // Must show feedback + explanation
answerStrengthQuestion()          // Must show selection confirmation
nextQuestion() handler            // Must advance to next question or results
calculateArchetype()              // Must count answers correctly
showCareerReveal()                // Must display correct archetype
```

**PROTECTED BEHAVIOR:**
- Answer buttons must be disabled after selection
- Correct answer must be highlighted in green
- Incorrect answer must be highlighted in red/magenta
- Explanation text must always display
- "Next Question" button must appear after feedback

**IF YOU MUST MODIFY:**
- Run full quiz flow test before commit (all 3 quizzes)
- Test on mobile browser before commit
- Do NOT remove console.log() statements - they're for debugging

---

### `js/quiz-data.js`
**Purpose:** Question bank. Contains all 15 questions and 5 archetypes.

**PROTECTED STRUCTURE:**
```javascript
onlineSafety[].{id, question, answers[], correct, explanation}
aiReality[].{id, question, answers[], correct, explanation}
strengthQuiz[].{id, question, answers[{text, archetype}]}
archetypeProfiles.{name, tagline, description, roles[], skills[]}
```

**IF YOU MUST MODIFY:**
- Never change answer array indices
- Never change archetype names (investigator, builder, protector, strategist, connector)
- Keep all explanations
- Test full quiz flow after any changes

---

## ✅ SAFE TO MODIFY

- `css/styles.css` - Homepage styling (color palette already defined)
- `css/components.css` - Reusable component styles
- `index.html` - Homepage markup (doesn't affect quizzes)
- `js/app.js` - Homepage logic (doesn't affect quizzes)

---

## 🧪 MANDATORY TESTING CHECKLIST

**Before every commit that touches quiz files:**

- [ ] **Mobile Test (320px width):** Open quizzes.html on phone/Chrome DevTools
  - [ ] Registration form fills and submits
  - [ ] All 3 quizzes load
  - [ ] Buttons are touchable (not too small)
  - [ ] Text is readable (not white-on-white)
  - [ ] Dark background is visible (NOT white)
  
- [ ] **Answer Feedback Test:**
  - [ ] Online Safety: Click WRONG answer → see green correct + red incorrect highlighting
  - [ ] Online Safety: See explanation text
  - [ ] Online Safety: See "Next Question" button appear
  - [ ] AI Reality: Same as above
  - [ ] Strength Quiz: Click answer → see "Got it!" confirmation

- [ ] **Full Flow Test:**
  - [ ] Registration → Online Safety Q1 → Q5 → Feedback works
  - [ ] Online Safety Q5 → AI Reality Q1
  - [ ] AI Reality Q5 → Strength Q1
  - [ ] Strength Q5 → Career Reveal page loads with correct archetype

- [ ] **Dark Theme Test:**
  - [ ] Background is `#0B0F19` (dark) NOT white
  - [ ] Text is white, not dark
  - [ ] Buttons are visible against dark background
  - [ ] Answer highlighting works (green/red visible)

---

## 🚨 IF SOMETHING BREAKS

**Emergency Rollback:**
1. Check git diff: `git diff quizzes.html js/quiz-app.js css/quizzes.css`
2. Revert the file: `git checkout -- <filename>`
3. Verify it works: Refresh browser (Ctrl+Shift+R)
4. If still broken: Revert entire branch to last working commit

**Last Known Good Commit:** (Update this after each successful deployment)
- Main branch: See GitHub releases

---

## 📋 DEPLOYMENT CHECKLIST

**Before pushing to production (Netlify):**

1. ✅ Mobile test passes (all 5 pages work on 320px)
2. ✅ Answer feedback displays for all 3 quizzes
3. ✅ Dark theme is NOT broken (no white backgrounds)
4. ✅ Full quiz flow works (registration → results)
5. ✅ No console errors (F12 → Console tab is clean)
6. ✅ Commit message is descriptive

**ONLY THEN:** `git push origin main` (auto-deploys to Netlify)

---

## 🔒 WHY THESE RULES EXIST

The quiz system has a history of regressions:
- **Netlify rebuild:** Broke quiz flow and dark theme multiple times
- **CSS variable conflicts:** Tailwind CDN conflicting with our colors
- **Old code caching:** Browser cache showing old feedback system
- **Build process issues:** Files syncing between main repo and worktree

These guardrails prevent those specific issues from happening again.

**If you're tempted to skip a test, don't.** The time you save is lost 10x when debugging why the app broke.

---

## 📞 QUESTIONS?

If you're not 100% sure if a change is safe, ask first. Better safe than broken.
