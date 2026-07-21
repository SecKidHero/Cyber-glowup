# Manual Netlify Deployment Guide

If the GitHub auto-deploy isn't working, use this manual deployment method.

## Option 1: Drag-and-Drop Deploy (Easiest)

1. **Go to your Netlify site**: https://app.netlify.com/sites/cyber-glowup
2. **Find the "Deploys" section** at the top
3. **Look for "Drag & drop your site folder here"** area
4. **From your computer, select and drag these files/folders into Netlify**:
   - `index.html`
   - `quizzes.html`
   - `404.html`
   - `netlify.toml`
   - `css/` folder (entire folder)
   - `js/` folder (entire folder)

**That's it!** Netlify will deploy automatically.

---

## Option 2: Connect GitHub (Recommended for Auto-Deploy)

### Step 1: Go to Site Settings
1. Go to: https://app.netlify.com/sites/cyber-glowup/settings
2. Scroll to **"Build & Deploy"** section
3. Click **"Connect to Git"** or **"Edit settings"**

### Step 2: Authorize GitHub
1. Click **"Connect to GitHub"**
2. If prompted, authorize Netlify to access your GitHub account
3. Select repository: **SecKidHero/Cyber-glowup**

### Step 3: Configure Deploy Settings
- **Branch to deploy**: `main`
- **Build command**: Leave blank (we have no build step)
- **Publish directory**: `.` or `.` (current directory)

### Step 4: Save and Deploy
1. Click **"Save"**
2. Netlify will automatically deploy your site
3. You'll see status: "Published" when done

**After this, every push to `main` will auto-deploy in seconds.**

---

## Option 3: Using Netlify CLI (If You Have Node.js)

```bash
# Install Netlify CLI globally (one time)
npm install -g netlify-cli

# In your project directory, deploy
netlify deploy --prod
```

---

## Troubleshooting Deploy Issues

### Issue: "Not Found" error on /quizzes.html

**Solution:** Make sure you're uploading the entire site structure:
- `index.html` (in root)
- `quizzes.html` (in root)
- `css/` folder with all CSS files
- `js/` folder with all JS files

### Issue: CSS/JS not loading (page looks broken)

**Solution:** Clear your browser cache:
- **Windows**: Ctrl + Shift + Delete
- **Mac**: Cmd + Shift + Delete
- Select "All time" and clear Cache
- Refresh the page

### Issue: Old version still showing

**Solution:** Hard refresh:
- **Windows**: Ctrl + Shift + R
- **Mac**: Cmd + Shift + R

### Issue: Upload failed

**Solution:** Check file sizes:
- Total should be under 100 MB
- Individual files should be < 50 MB
- All files look good ✅

---

## Files You're Uploading

```
cyber-glowup/
├── index.html                (Homepage)
├── quizzes.html              (Quiz system with registration form)
├── 404.html                  (Custom error page)
├── netlify.toml              (Deployment config)
├── css/
│   ├── styles.css            (Design system)
│   ├── components.css        (Component styles)
│   └── quizzes.css           (Quiz page styles)
└── js/
    ├── state.js              (State management)
    ├── quiz-data.js          (15 questions + archetypes)
    └── quiz-app.js           (Quiz logic)
```

---

## What Users Will See

1. **Homepage**: https://cyber-glowup.netlify.app/
   - "Cyber Glow-Up Challenge" title
   - "Start the Challenge" button
   
2. **Click Button** → Redirects to https://cyber-glowup.netlify.app/quizzes.html
   - Registration form appears (Name, Gaming Tag, Team)
   - User fills in info and clicks "Start the Challenge"
   
3. **Quiz 1**: Online Safety (5 questions)
   - Questions about phishing, deepfakes, social engineering, etc.
   - Back button available
   
4. **Quiz 2**: AI Reality Check (5 questions)
   - Questions about AI safety and security
   - Back button available
   
5. **Quiz 3**: Career Strength (5 questions)
   - Maps answers to archetypes
   - Back button available
   
6. **Career Reveal**: Results page
   - Shows which archetype user matched
   - Shows job roles and skills
   - Link to: https://niccs.cisa.gov/tools/cyber-career-pathways-tool
   - Message: "If you want to explore these careers further, please click here."

---

## Verification Checklist

After deploying, verify these work:

- [ ] Homepage loads at https://cyber-glowup.netlify.app/
- [ ] "Start the Challenge" button visible
- [ ] Clicking button shows registration form
- [ ] Registration form has: Name, Gaming Tag, Team Name fields
- [ ] Clicking "Start the Challenge" on form shows Quiz 1
- [ ] Quiz 1 has: 5 questions, progress bar, answer buttons, back button
- [ ] Clicking answer selects it (button highlights)
- [ ] Clicking "Next" advances to next question
- [ ] Back button returns to previous question
- [ ] After 5 questions, Quiz 2 appears
- [ ] After Quiz 2, Quiz 3 appears
- [ ] After Quiz 3, Career Reveal shows
- [ ] Career Reveal shows archetype name, description, roles, skills
- [ ] NICCS link works (opens in new tab)
- [ ] All styling looks good (colors, fonts, responsive on mobile)

---

## Contact Support

If deploy still isn't working:

1. **Check Netlify Dashboard**: https://app.netlify.com/sites/cyber-glowup
2. **Check Build Logs** for errors
3. **Check Site Settings** → Verify GitHub is connected
4. **Clear Browser Cache** (Ctrl+Shift+Del)
5. **Hard Refresh** (Ctrl+Shift+R)

---

## Status

**Last Updated**: July 20, 2026 11:25 PM
**Deployment Method**: Manual or GitHub Auto-Deploy
**Expected Deploy Time**: 30 seconds - 2 minutes
