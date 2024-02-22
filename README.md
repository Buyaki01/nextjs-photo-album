# NextJs PHOTO ALBUM APP

Explore the [Live Demo](https://photo-album-woad-ten.vercel.app) to experience the Next.js Photo Album app in action! This application is deployed using Vercel, providing a scalable and efficient hosting solution. Vercel makes it easy to deploy and manage Next.js applications with built-in features like automatic deployments, serverless functions, and more.

## Overview
This Next.js application serves as a photo album, fetching data from [JSONPlaceholder](https://jsonplaceholder.typicode.com). The key features include:

- **Landing Page:** A landing section accessible to all app visitors with a brief explanation of what 
the application does

- **A page to authenticate users (Login page):** Allow users to login to the app using their GitHub account

- **Authenticated Pages:** Users who are not logged in will only have access to the landing page and will NOT have access to the other pages in the app

- **Responsive Design:** The application is built with a responsive design to ensure a consistent and user-friendly experience on various devices, from desktops to mobile phones.

## Technologies Used
- **NextJs (v14)**
- **Next-auth (v5)**
- **React**
- **Taiwind CSS**
- **MongoDB**
- **Jest**
- **React Testing Library**
- **Winston**: To create a logging service for application errors

### Getting Started
To get started with this app, follow these steps:

1. Clone this repository: 
    ```bash 
    git clone git@github.com:Buyaki01/nextjs-photo-album.git
    ```

2. Open the repository: 
    ```bash 
    cd nextjs-photo-album
    ```

3. Install dependencies: 
    ```bash 
    npm i
    ```

4. Configure environment variables:
    - Set up your `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` and include them in your `.env` file.

    #### Steps to Get GitHub Client ID and Client Secret:
    - Go to your Github profile and click on settings
    - Scroll down to Developer settings
    - Click on OAuth apps and then click on New OAuth App button and fill in all the required fields
    
5. Set up MongoDB:
   - Configure your MongoDB connection by setting it up on the [MongoDB website](https://www.mongodb.com) and add your `MONGODB_URI` to your `.env` file.
     
6. Start the app: 
    ```bash 
    npm run dev
    ``` 
    Open the app by navigating to http://localhost:3000 in your web browser to view the application

### Configuration
Here are the environment variables you need to configure in your `.env` file:

    - `GITHUB_CLIENT_ID`: Your Github Client ID.
    - `GITHUB_CLIENT_SECRET`: Your Github Client Secret.
    - `MONGODB_URI`: Your MongoDB connection URI.

**Note:** Ensure that the `.env` file is not committed to version control for security reasons.

## Check Linters
To ensure code quality and adherence to coding standards, you can run lint checks using the following command:
```bash
npm run lint
```

## Testing
To run the tests for this application, use the following command:
```bash
npm test
```

### Writing Tests

If you want to contribute or extend the test coverage, you can find the test files in the `__tests__` directory. Follow these guidelines when writing tests:

- Test files should be named with the `.test.js` extension (e.g., `example.test.js`).
- Place test files adjacent to the component or page they are testing.
- Write descriptive test cases to ensure clarity and understanding.

### Test Coverage

To check the test coverage, use the following command:
```bash
npm run test:coverage
```

## Author
👤 **Ritta Sweta**

- Linkedin: [@ritta-sweta](https://www.linkedin.com/in/ritta-sweta)
- Github: [@Buyaki01](https://github.com/Buyaki01)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Buyaki01/nextjs-photo-album/issues)

## Show your support

Give a ⭐️ if you like this project!

(Built with Next.js v14)