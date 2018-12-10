# Running the Project Locally

Assuming NodeJS is installed

```
npm install
```

```
npm start
```

Open browser at `localhost:3001`

# Deployment Process

I use [Netlify](https://www.netlify.com/) to deploy most front-end projects as static assets. Once I configure Netlify to work with my git repository, I can leverage
CI/CD. I can specify which branch (if any) should automatically be pushed live. For this particular project, `master` is the live branch.

I define my build command and my output folder in `netlify.toml`, although it can be done from Netlify's panel.

Netlify then runs the build command you tell it to and assigns a url to your project.

# Follow-up Questions

1. How long did you spend on the test? Would you do anything differently if you had more time?
2. In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
3. What is one CSS property that you recently learned about that helped you solve a problem?
