# Building Your First CI/CD Pipeline with GitHub

## Tutorial Overview

In this hands-on tutorial, you'll learn CI/CD concepts by building a real pipeline that deploys a simple website to GitHub Pages. By the end, you'll have:

- [x] A GitHub repository with a simple website
- [x] Automated testing on every code change
- [x] Continuous Integration checks
- [x] Automated deployment to GitHub Pages
- [x] Understanding of CI/CD best practices

**Time Required:** 45-60 minutes  
**Difficulty:** Beginner  
**Prerequisites:**

- A GitHub account (free)
- Basic understanding of HTML
- Basic Git knowledge (commit, push)

---

## Part 1: Setting Up Your Project (10 minutes)

### Step 1.1: Create a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Configure your repository:
    - **Repository name:** `my-cicd-project`
    - **Description:** `Learning CI/CD with GitHub Actions`
    - **Visibility:** Public
    - Check **"Add a README file"**
    - Check **"Add .gitignore"** and select **"Node"**
    - **License:** MIT License (optional)

5. Click **"Create repository"**

### Step 1.2: Clone Your Repository Locally

Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
git clone https://github.com/YOUR-USERNAME/my-cicd-project.git
cd my-cicd-project
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 1.3: Create Your Website Files

Create a simple HTML website. In your project folder, create the following files:

**Create `index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My CI/CD Project</title>
    <link rel="stylesheet" href="style.css" />
  </head>

  <body>
    <header>
      <h1>Welcome to My CI/CD Pipeline Project</h1>
      <p>This website is automatically deployed using GitHub Actions!</p>
    </header>
 
    <main>
      <section>
        <h2>What is CI/CD?</h2>
        <ul>
          <li>
            <strong>Continuous Integration:</strong> Automatically test code
            when changes are made
          </li>
          <li>
            <strong>Continuous Delivery:</strong> Keep code ready to deploy at
            any time
          </li>
          <li>
            <strong>Continuous Deployment:</strong> Automatically deploy to
            production
          </li>
        </ul>
      </section>

      <section id="counter">
        <h2>Deployment Counter</h2>
        <p class="count">Deployment #1</p>
        <p class="tip">Update this number each time you deploy!</p>
      </section>
    </main>

    <footer>
      <p>Built with ❤️ and automated with GitHub Actions</p>
    </footer>
 
    <script src="script.js"></script>
  </body>
</html>
```

**Create `style.css`:**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}
  
header {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
}

header h1 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

main {
  max-width: 800px;
  margin: 0 auto;
}

section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

section h2 {
  color: #667eea;
  margin-bottom: 1rem;
}

ul {
  list-style-position: inside;
  padding-left: 1rem;
}

li {
  margin-bottom: 0.5rem;
}
 
#counter {
  text-align: center;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  color: #764ba2;
  margin: 1rem 0;
}
  
.tip {
  font-style: italic;
  color: #666;
}
 
footer {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
```

**Create `script.js`:**

```javascript
// Simple script to demonstrate automated testing
function getCurrentDate() {
  const date = new Date();

  return date.toLocaleDateString("en-GB");
}

function updateFooter() {
  const footer = document.querySelector("footer p");

  if (footer) {
    footer.innerHTML += ` | Last updated: ${getCurrentDate()}`;
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateFooter();
  console.log("Website loaded successfully! ✅");
});

// Export for testing (if using Node.js testing environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getCurrentDate };
}
```

### Step 1.4: Commit and Push Your Changes

```bash
git add .
git commit -m "Initial website setup"
git push origin main
```

**🎯 Checkpoint:** You now have a basic website in your GitHub repository!

---

## Part 2: Deploy to GitHub Pages (Manual Deployment) (10 minutes)

Before adding automation, let's deploy manually to understand the process.

### Step 2.1: Enable GitHub Pages

1. Go to your repository on GitHub

2. Click **"Settings"** (top menu)

3. Click **"Pages"** in the left sidebar

4. Under **"Source"**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`

5. Click **"Save"**

GitHub will process your request. After a minute or two, refresh the page.

### Step 2.2: View Your Deployed Website

You'll see a message: _"Your site is live at `https://YOUR-USERNAME.github.io/my-cicd-project/`"_

Click the link to view your website!

**🎯 Checkpoint:** Your website is now live, but deployment is still manual. Let's automate it!

---

## Part 3: Adding Automated Testing (Continuous Integration) (15 minutes)

Now we'll add automated checks that run every time you push code - this is **Continuous Integration**.

### Step 3.1: Set Up a Testing Environment

Create a simple test file to validate your HTML and JavaScript.

**Create a folder structure for tests:**

```bash
mkdir tests
```

**Create `tests/test.js`:**

```javascript
// Simple tests for our website
const fs = require("fs");
const path = require("path");
  
// Test 1: Check if index.html exists
function testIndexExists() {
  const indexPath = path.join(__dirname, "..", "index.html");

  if (fs.existsSync(indexPath)) {
    console.log("✅ PASS: index.html exists");
    return true;
  } else {
    console.log("❌ FAIL: index.html not found");
    return false;
  }
}

// Test 2: Check if HTML contains required elements
function testHTMLContent() {
  const indexPath = path.join(__dirname, "..", "index.html");
  const content = fs.readFileSync(indexPath, "utf8");

  const tests = [
    { name: "Has DOCTYPE", check: content.includes("<!DOCTYPE html>") },
    { name: "Has title tag", check: content.includes("<title>") },
    { name: "Has h1 heading", check: content.includes("<h1>") },
    { name: "Links to CSS", check: content.includes("style.css") },
    { name: "Links to JavaScript", check: content.includes("script.js") },
  ];

  let allPassed = true;

  tests.forEach((test) => {
    if (test.check) {
      console.log(`✅ PASS: ${test.name}`);
    } else {
      console.log(`❌ FAIL: ${test.name}`);
      allPassed = false;
    }
  });

  return allPassed;
}

// Test 3: Check if CSS file exists
function testCSSExists() {
  const cssPath = path.join(__dirname, "..", "style.css");

  if (fs.existsSync(cssPath)) {
    console.log("✅ PASS: style.css exists");
    return true;
  } else {
    console.log("❌ FAIL: style.css not found");
    return false;
  }
}

// Test 4: Check if JavaScript file exists
function testJSExists() {
  const jsPath = path.join(__dirname, "..", "script.js");

  if (fs.existsSync(jsPath)) {
    console.log("✅ PASS: script.js exists");
    return true;
  } else {
    console.log("❌ FAIL: script.js not found");
    return false;
  }
}

// Run all tests
console.log("🧪 Running tests...\n");

const results = [
  testIndexExists(),
  testHTMLContent(),
  testCSSExists(),
  testJSExists(),
];

const allTestsPassed = results.every((result) => result === true);

console.log("\n" + "=".repeat(50));

if (allTestsPassed) {
  console.log("✅ All tests passed!");
  process.exit(0);
} else {
  console.log("❌ Some tests failed");
  process.exit(1);
}
```

**Create `package.json`:**

```json
{
  "name": "my-cicd-project",
  "version": "1.0.0",
  "description": "Learning CI/CD with GitHub Actions",
  "scripts": {
    "test": "node tests/test.js",
    "lint": "echo 'Running HTML validation...' && echo '✅ Linting passed'"
  },
  "keywords": ["ci-cd", "github-actions", "tutorial"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 3.2: Test Locally

Run the tests on your machine:

```bash
npm test
```

You should see output showing all tests passing!

### Step 3.3: Commit Your Testing Setup

```bash
git add .
git commit -m "Add automated testing"
git push origin main
```

**🎯 Checkpoint:** You now have tests, but they only run manually. Let's automate them!

---

## Part 4: Creating Your First CI Pipeline (15 minutes)

Now we'll create a **GitHub Actions workflow** that automatically runs tests on every push and pull request.

### Step 4.1: Create the Workflow File

Create the `.github/workflows` directory:

```bash
mkdir -p .github/workflows
```

**Create `.github/workflows/ci.yml`:**

```yaml
name: CI - Continuous Integration
  
# When should this workflow run?
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# What jobs should run?
jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      # Step 1: Check out the code
      - name: Checkout code
        uses: actions/checkout@v5

      # Step 2: Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v6

      # Step 3: Run tests
      - name: Run tests
        run: npm test

      # Step 4: Run linting
      - name: Run linting
        run: npm run lint

  # This job checks for common HTML issues
  validate-html:
    name: Validate HTML
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Validate HTML
        run: |
          echo "Checking HTML files..."
          if grep -q "<!DOCTYPE html>" index.html; then
            echo "✅ DOCTYPE found"
          else
            echo "❌ DOCTYPE missing"
            exit 1
          fi
          echo "✅ HTML validation passed"
```

### Step 4.2: Understanding the Workflow

Let's break down what this file does:

- **`name:`** - The name of your workflow (shows up in GitHub)

- **`on:`** - Triggers: when to run this workflow

  - `push` to `main` branch - runs when you push code

  - `pull_request` - runs when someone creates a PR

- **`jobs:`** - What tasks to perform

  - `test` - Runs your automated tests

  - `validate-html` - Checks HTML structure

### Step 4.3: Commit and Push

```bash
git add .
git commit -m "Add CI workflow"
git push origin main
```

### Step 4.4: Watch Your Pipeline Run

1. Go to your GitHub repository

2. Click the **"Actions"** tab

3. You'll see your workflow running!

4. Click on the workflow to see detailed logs

5. Watch each step execute in real-time

**🎯 Checkpoint:** You now have **Continuous Integration**! Every code change is automatically tested.

---

## Part 5: Adding Continuous Deployment (10 minutes)

Let's add automatic deployment - when tests pass, the site automatically deploys to GitHub Pages.

### Step 5.1: Create the Deployment Workflow

**Create `.github/workflows/deploy.yml`:**

```yaml
name: CD - Deploy to GitHub Pages
  
on:
  push:
    branches: [main]
 
# Sets permissions for GitHub Pages deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # First, run tests (CI)
  test:
    name: Run Tests Before Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v6

      - name: Run tests
        run: npm test

      - name: Run linting
        run: npm run lint

  # Then, deploy to GitHub Pages (CD)
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: test # Only run if tests pass!

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: "."

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5.2: Update GitHub Pages Settings

1. Go to **Settings** → **Pages**

2. Under **"Source"**, change to:

   - **Source:** `GitHub Actions`

3. Save

### Step 5.3: Commit and Deploy

```bash
git add .
git commit -m "Add CD workflow for automatic deployment"
git push origin main
```

### Step 5.4: Watch the Magic Happen

1. Go to **Actions** tab

2. Watch both workflows run:

   - ✅ Tests run first (CI)
   - ✅ If tests pass → Automatic deployment (CD)

3. Visit your website - it's automatically updated!

**🎯 Checkpoint:** You now have a complete CI/CD pipeline!

---

## Part 6: Testing Your Pipeline (10 minutes)

Let's make a change and watch the pipeline work!

### Step 6.1: Make a Change to Your Website

Edit `index.html` and update the deployment counter:

```html
<p class="count">Deployment #2</p>
```

### Step 6.2: Commit and Push

```bash
git add index.html
git commit -m "Update deployment counter to #2"
git push origin main
```

### Step 6.3: Watch the Automated Pipeline

1. Go to **Actions** tab

2. Watch:

   - CI workflow runs tests ✅
   - CD workflow deploys the site ✅

3. Refresh your website - see the change!

**This is CI/CD in action!** ✨

---

## Part 7: Adding Pre-Commit Checks (Bonus) (10 minutes)

Pre-commit checks run on your local machine **before** you commit code.

### Step 7.1: Install Pre-Commit Hook Framework

First, ensure you have Python installed, then:

```bash
pip install pre-commit
```

Or on macOS with Homebrew:

```bash
brew install pre-commit
```

### Step 7.2: Create Pre-Commit Configuration

**Create `.pre-commit-config.yaml`:**

```yaml
# Pre-commit hooks configuration
repos:
  # Check for common file issues
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-json
      - id: mixed-line-ending

  # HTML validation
  - repo: https://github.com/Lucas-C/pre-commit-hooks-markup
    rev: v1.0.1
    hooks:
      - id: rst-linter
        exclude: '^(?!.*\.html$).*$'
```

### Step 7.3: Install the Pre-Commit Hooks

```bash
pre-commit install
```

### Step 7.4: Test Pre-Commit

Try to commit a file with trailing whitespace:

```bash
echo "test with trailing spaces    " >> test.txt
git add test.txt
git commit -m "Test pre-commit"
```

You'll see pre-commit automatically fix the trailing spaces!

**Remove the test file:**

```bash
git rm test.txt
git commit -m "Remove test file"
```

### Step 7.5: Commit Your Pre-Commit Setup

```bash
git add .pre-commit-config.yaml
git commit -m "Add pre-commit hooks"
git push origin main
```

**🎯 Checkpoint:** You now have local checks before code even reaches GitHub!

---

## Part 8: Understanding the Complete Pipeline

You've now built a **complete CI/CD pipeline**! Here's what happens:

```text
┌─────────────────────────────────────────────────────────────┐
│  DEVELOPER WORKFLOW                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Write Code Locally                                      │
│     ↓                                                       │
│  2. Pre-Commit Checks Run (Local)                           │
│     ├─ Check for trailing whitespace                        │
│     ├─ Validate file formats                                │
│     └─ Fix common issues                                    │
│     ↓                                                       │
│  3. Commit Code                                             │
│     ↓                                                       │
│  4. Push to GitHub                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  CONTINUOUS INTEGRATION (GitHub Actions)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  5. Trigger CI Workflow                                     │
│     ├─ Checkout code                                        │
│     ├─ Set up testing environment                           │
│     ├─ Run automated tests                                  │
│     ├─ Run linting                                          │
│     └─ Validate HTML                                        │
│     ↓                                                       │
│  6. Tests Pass? → Continue                                  │
│     Tests Fail? → Stop and notify developer                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  CONTINUOUS DEPLOYMENT (GitHub Actions)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  7. Trigger CD Workflow (only if tests passed)              │
│     ├─ Build artifact                                       │
│     ├─ Configure GitHub Pages                               │
│     └─ Deploy to production                                 │
│     ↓                                                       │
│  8. Website Updated!                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
                   ┌─────────────┐
                   │   USERS     │
                   │  See Latest │
                   │   Version   │
                   └─────────────┘
```

---

## Key Concepts You've Learned

### ✅ Continuous Integration (CI)

- Automated testing on every code change

- Prevents broken code from being merged

- Fast feedback to developers

### ✅ Continuous Delivery (CD)

- Always having a deployable version

- Deployment pipeline with quality gates

- Manual approval step before production (we automated it!)

### ✅ Continuous Deployment

- Automatic deployment to production

- No manual intervention needed

- Faster time to market

---

## Exercises to Practice

### Exercise 1: Break the Build

**Goal:** Understand what happens when tests fail

1. Edit `index.html` and remove the `<!DOCTYPE html>` line

2. Commit and push

3. Watch the CI workflow fail

4. Fix the issue and push again

5. Watch the pipeline succeed

### Exercise 2: Add a New Test

**Goal:** Expand your test coverage

1. Edit `tests/test.js`

2. Add a test that checks if the CSS file contains the word "background"

3. Commit and push

4. Verify the test runs in GitHub Actions

### Exercise 3: Add a Status Badge

**Goal:** Show pipeline status in your README

1. Go to **Actions** tab

2. Click on "CI - Continuous Integration" workflow

3. Click the "..." menu → "Create status badge"

4. Copy the Markdown

5. Add it to your `README.md`

6. Commit and push

The badge will show if your build is passing! ✅

### Exercise 4: Protected Branches

**Goal:** Require CI checks before merging

1. Go to **Settings** → **Branches**

2. Click "Add rule"

3. Branch name pattern: `main`

4. Check "Require status checks to pass before merging"

5. Select your CI workflow

6. Save

Now you can't push broken code to `main`!

---

## Common Issues and Solutions

### Issue 1: "npm: command not found"

**Solution:** The test script uses Node.js. Ensure the workflow includes the `setup-node` step.

### Issue 2: Tests pass locally but fail on GitHub

**Solution:** Check file paths - Linux (GitHub) is case-sensitive, but Windows/macOS might not be.

### Issue 3: Deployment not updating

**Solution:**

1. Check if the workflow ran successfully

2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

3. Check GitHub Pages settings are set to "GitHub Actions"

### Issue 4: Pre-commit hooks not running

**Solution:** Run `pre-commit install` again. Check you're in the correct directory.

---

## Next Steps

Want to take your CI/CD skills further? Try:

1. **Add More Tests:**

   - Add JavaScript unit tests using Jest
   - Add accessibility checks using pa11y
   - Add performance testing

2. **Improve the Pipeline:**

   - Add parallel jobs to run tests faster
   - Add a staging environment
   - Deploy to different environments (dev, staging, production)

3. **Advanced Features:**

   - Add automated security scanning
   - Implement blue-green deployments
   - Add rollback capabilities
   - Send notifications on Slack/Discord

4. **Explore Other Tools:**

   - Try GitLab CI
   - Experiment with Jenkins
   - Test CircleCI
   - Explore Travis CI

---

## Resources for Further Learning

### Official Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)

- [GitHub Pages Documentation](https://docs.github.com/en/pages)

- [Pre-commit Documentation](https://pre-commit.com/)

### Courses and Tutorials

- [GitHub Learning Lab](https://lab.github.com/)

- [Martin Fowler - Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)

### Books

- "Continuous Delivery" by Jez Humble and David Farley

- "The DevOps Handbook" by Gene Kim et al.

---

## Summary

🎉 **Congratulations!** You've successfully:

✅ Created a GitHub repository  

✅ Built a simple website  

✅ Deployed it to GitHub Pages  

✅ Added automated testing (CI)  

✅ Implemented automatic deployment (CD)  

✅ Added pre-commit checks  

✅ Understand the complete CI/CD lifecycle

You now have practical experience with:

- Version control with Git/GitHub

- GitHub Actions workflows

- Automated testing

- Continuous Integration

- Continuous Deployment

- DevOps best practices

This is the foundation that professional development teams build upon. Every code change you make is now automatically tested and deployed - just like at companies like Netflix, Amazon, and Google!

---

## Reflection Questions

1. How has automation changed the deployment process?

2. What would happen if you didn't have automated tests?

3. When might you prefer Continuous Delivery over Continuous Deployment?

4. How does CI/CD improve code quality?

5. What challenges might a team face when implementing CI/CD?

---

**Need Help?**

- Check the GitHub Actions logs for detailed error messages

- Review the workflow YAML files for syntax errors

- Ensure all file paths are correct and case-sensitive

- Ask your tutor or peers for assistance
