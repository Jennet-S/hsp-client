// Assume you have a service or API for authentication
const fakeAuthService = {
    login: async (credentials) => {
      // Simulating an API call, replace this with your actual authentication API
      return new Promise((resolve, reject) => {
        // Simulating a successful login with hardcoded credentials
        if (credentials.username === "Jennet" && credentials.password === "1") {
          resolve({ userId: 1, username: "Jennet" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      });
    },
  };
  
  export default fakeAuthService;
  