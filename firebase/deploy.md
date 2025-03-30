### Firebase Deployment Guide

Follow these steps to deploy your web app using Firebase Hosting:

#### Step 1: Sign in to Google
Run the following command in your terminal to log in to your Firebase account:
```bash
firebase login
```

#### Step 2: Initialize Your Project
Navigate to your app's root directory and initialize your Firebase project:
```bash
firebase init
```

#### Step 3: Configure `firebase.json`
Add your site ID to the `firebase.json` configuration file. Example:
```json
{
  "hosting": {
    "site": "prepai-mohitpatel",
    "public": "public"
  }
}
```
For multi-site deployment, refer to Firebase's best practices.

#### Step 4: Prepare Your Files
Place your static files (e.g., HTML, CSS, JS) in the deploy directory (default is `public`).

#### Step 5: Deploy Your Web App
Run the following command to deploy your app:
```bash
firebase deploy --only hosting:prepai-mohitpatel
```

#### Step 6: View Your App
After deployment, you can access your app at:
```
https://prepai-mohitpatel.web.app
```

#### Need Help?
Refer to the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting) for more details.ou can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

