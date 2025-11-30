---
description: Deploy to GitHub Pages
---

# Deploy Food Hub to GitHub Pages

This workflow guides you through deploying your Food Hub application to GitHub Pages.

## Prerequisites

1. Ensure you have committed all your changes to git
2. Ensure you have push access to the repository
3. The `gh-pages` package is already installed in devDependencies

## Deployment Steps

### 1. Verify the homepage URL in package.json

Check that the `homepage` field matches your GitHub repository:
```json
"homepage": "https://<username>.github.io/<repository-name>"
```

Currently configured as: `https://Karim-mahmoud139.github.io/Food-Hub`

### 2. Ensure all changes are committed

```bash
git status
```

If there are uncommitted changes, commit them:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin master
```

// turbo
### 3. Build and deploy to GitHub Pages

Run the deployment command:
```bash
npm run deploy
```

This command will:
- Run `npm run build` to create an optimized production build
- Deploy the `build` folder to the `gh-pages` branch
- Push the `gh-pages` branch to GitHub

### 4. Configure GitHub Pages (First-time setup)

If this is your first deployment:

1. Go to your GitHub repository: `https://github.com/Karim-mahmoud139/Food-Hub`
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select the `gh-pages` branch
5. Click **Save**

### 5. Access your deployed site

After a few minutes, your site will be available at:
`https://Karim-mahmoud139.github.io/Food-Hub`

## Troubleshooting

### Issue: 404 errors on page refresh
If you get 404 errors when refreshing pages (due to client-side routing), you may need to:
- Use HashRouter instead of BrowserRouter in React
- Or add a 404.html redirect (already handled if using create-react-app)

### Issue: Assets not loading
- Verify the `homepage` field in package.json is correct
- Ensure you're using relative paths for assets
- Check that the build process completed successfully

### Issue: Permission denied
- Ensure you have push access to the repository
- Check your git credentials are configured correctly

## Updating the Deployment

To update your deployed site after making changes:

1. Commit your changes:
```bash
git add .
git commit -m "Your commit message"
git push origin master
```

2. Redeploy:
```bash
npm run deploy
```

## Notes

- The deployment creates a separate `gh-pages` branch
- Your source code remains on the `master` branch
- The `gh-pages` branch contains only the built files
- Deployment typically takes 1-2 minutes to go live
