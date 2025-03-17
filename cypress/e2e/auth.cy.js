describe("Firebase Authentication with Backend API", () => {
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit("http://localhost:3000");
    });

    it("Should mock login and authenticate user via backend API", () => {
        // 🔹 Mock Firebase Authentication API (returns a fake idToken)
        cy.intercept("POST", "**/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*", {
            statusCode: 200,
            body: {
                idToken: "mockIdToken",
                email: "testuser@example.com",
                refreshToken: "mockRefreshToken",
                expiresIn: "3600",
                localId: "mockLocalId",
                registered: true
            }
        }).as("mockFirebaseLogin");

        // 🔹 Mock backend authentication request to `/api/auth`
        cy.intercept("POST", "/api/auth", {
            statusCode: 200,
            body: {
                user: {
                    id: 1,
                    firstName: "Test",
                    lastName: "User",
                    email: "testuser@example.com",
                    phone: "123-456-7890",
                    address: "123 Cypress St",
                    city: "Testville",
                    state: "TX",
                    zipCode: "12345",
                    bio: "I love Cypress testing!",
                    profileImage: "test-profile.jpg"
                }
            }
        }).as("mockBackendAuth");

        // 🔹 Visit login page
        cy.visit("/login");

        // 🔹 Fill in the login form
        cy.get("[id=login-email]").type("testuser@example.com");
        cy.get("[id=login-password]").type("Test@1234");
        cy.get("[id=login-button]").click();

        // 🔹 Wait for Firebase login response
        cy.wait("@mockFirebaseLogin").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        // 🔹 Wait for backend authentication response
        cy.wait("@mockBackendAuth").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.user.email).to.eq("testuser@example.com");
        });

        // 🔹 Check if user data is displayed after login
        cy.contains("Welcome, Test User").should("be.visible");
    });

    it("Should prevent login if Firebase rejects credentials", () => {
        // 🔹 Mock Firebase API failure (invalid credentials)
        cy.intercept("POST", "**/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*", {
            statusCode: 400,
            body: {
                error: {
                    code: 400,
                    message: "INVALID_LOGIN_CREDENTIALS"
                }
            }
        }).as("mockFirebaseLoginFail");

        cy.visit("/login");
        cy.get("[id=login-email]").type("wronguser@example.com");
        cy.get("[id=login-password]").type("WrongPassword123");
        cy.get("[id=login-button]").click();

        // 🔹 Wait for Firebase API response
        cy.wait("@mockFirebaseLoginFail").then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });

        // 🔹 Check if an error message appears
        cy.contains("Invalid email or password").should("be.visible");
    });

    it("Should register a new user and authenticate them", () => {
        // 🔹 Mock Firebase Sign-Up API
        cy.intercept("POST", "**/identitytoolkit.googleapis.com/v1/accounts:signUp*", {
            statusCode: 200,
            body: {
                idToken: "mockNewUserToken",
                email: "newuser@example.com",
                refreshToken: "mockRefreshToken",
                localId: "mockNewUserLocalId",
                emailVerified: false
            }
        }).as("mockFirebaseSignUp");

        // 🔹 Mock backend user creation API (`/api/auth`)
        cy.intercept("POST", "/api/auth", {
            statusCode: 201,
            body: {
                user: {
                    id: 2,
                    firstName: "New",
                    lastName: "User",
                    email: "newuser@example.com",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    bio: "",
                    profileImage: ""
                }
            }
        }).as("mockBackendNewUser");

        cy.visit("/signup");

        // 🔹 Fill in the sign-up form
        cy.get("[id=signup-firstName]").type("New");
        cy.get("[id=signup-lastName]").type("User");
        cy.get("[id=signup-email]").type("newuser@example.com");
        cy.get("[id=signup-password]").type("Test@1234");
        cy.get("[id=signup-confirmPassword]").type("Test@1234");
        cy.get("[id=signup-button]").click();

        // 🔹 Wait for Firebase Sign-Up API response
        cy.wait("@mockFirebaseSignUp").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        // 🔹 Wait for backend user creation response
        cy.wait("@mockBackendNewUser").then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        });

        // 🔹 Ensure user is redirected to dashboard or home page
        cy.contains("Welcome, New User").should("be.visible");
    });
});
