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

I define my build command and my output folder in `netlify.toml`, although it can be done from Netlify's panel. I also define page redirects here so that the SPA routes properly.

Netlify then runs the build command you tell it to and assigns a url to your project.

# Follow-up Questions

**1. QUESTION**: How long did you spend on the test? Would you do anything differently if you had more time?

-   **ANSWER**: In total, I spent 5-6 hours on this assignment. If I had more time, I would have used styled-components. I would have also defined property types and used `Context` to drive the component's state and so that I didn't have to prop drill from `_index.js` to `<Filter/>` and `<Search/>`. It would have been fun to define an endpoint that would return all the data from the csv file so that it wasn't hard-coded to the `Home` component's state.

<hr>

**2. QUESTION**: In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

-   **ANSWER**: I tried to encapsulate all the component logic so that all you needed to do to use it was to call it with a couple of props `<DataTable {...myProps}/>`. It works, but it might be more flexible if I used rendered child props like:

```
<DataTable>
    <Header>
        {Define Search component and Filter component}
    </Header>
    <Table>
        <Head>
            {Define thead and th's}
        </Head>
        <Body>
            {Define Rows and Cells here instead of generating them internally via the data property}
         </Body>
    </Table>
</DataTable>
```

<hr>

**3. QUESTION**: What is one CSS property that you recently learned about that helped you solve a problem?

-   **ANSWER**: Recently, I had the need to truncate text on a card design. Frameworks like Bootstrap provide a `.text-truncate` class, however, I needed to truncate after multiple lines of text, not just one. This need lead me to find `webkit-line-clamp: {numberOfLines}`. This solution wouldn't work for all browsers, so, after some tutorials and research, I came up with a decent cross-browser `.line-clamp` solution. If interested, you can find it [here](https://gist.github.com/go-diego/27ab44bd25694d187718e9effc1c8fdf).
