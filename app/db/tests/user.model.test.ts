import { describe, it, expect, afterEach } from "vitest";
import User from "../models/User";
import bcrypt from "bcryptjs";

//Integration tests for the User model
const testEmail = `test${Date.now()}@example.com`;
const testPassword = "testpassword";

describe("User model", () => {
    afterEach(async () => {
        await User.deleteMany({email: testEmail});
    });

    it("should create a new user", async () => {
        const testUser = new User({
            email: testEmail,
            password: testPassword,
        });
        await testUser.save();
        expect(testUser.id).toBeDefined();
    });

    it("should fail when email is missing", async () => {
        await expect(
            User.create({
                password: testPassword,
            }),
        ).rejects.toThrow();
    });

    it("should fail when password is missing", async () => {
        await expect(
            User.create({
                email: testEmail,
            }),
        ).rejects.toThrow();
    });

    it("should fail when the email is not unique", async () => {
        await User.create({
          email: testEmail,
          password: testPassword,
          displayName: "Doofus 1",
        });
        await expect(
            User.create({
                email: testEmail,
                password: testPassword,
                displayName: "Doofus 2",
            }),
        ).rejects.toThrow();
    });

    it("hashes password on save", async () => {
        await User.create({
          email: testEmail,
          password: testPassword,
          displayName: "Test User",
        });
        const user = await User.findOne({ testEmail }).select("+password"); //+password is used because of "select: false" in the User model
        expect(user).not.toBeNull();
        expect(user!.password).toMatch(/^\$2/); //Regex for bcrypt hashes (they start with $2)
        const matches = await bcrypt.compare(testPassword, user!.password);
        expect(matches).toBe(true);
      });


    it("fails hashing check with a wrong password", async () => {
        await User.create({
          email: testEmail,
          password: testPassword,
          displayName: "Every blonde girl on tinder",
        });
        const storedTestPassword = await User.findOne({ email: testEmail }).select("+password");
        expect(storedTestPassword).not.toBeNull();
        const matches = await bcrypt.compare("Horsegirl123", storedTestPassword!.password);
        expect(matches).toBe(false);
      });
});