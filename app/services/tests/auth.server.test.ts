import { describe, it, expect, afterAll } from "vitest";
import User from "../../db/models/User";
import { verifyUser } from "../auth.server";

const testPassword = "authTestpassword";
const testEmail1 = `authTest${Date.now()}1@example.com`;
const testEmail2 = `authTest${Date.now()}2@example.com`;

describe("auth.server", () => {
    afterAll(async () => {
        await User.deleteMany({email: testEmail1});
        await User.deleteMany({email: testEmail2});
    });

    it("should return the user id when the email and password are correct", async () => {
        await User.create({
            email: testEmail1,
            password: testPassword,
            displayName: "Mr Correct",
        });
        const userId = await verifyUser(testEmail1, testPassword);
        expect(userId).toBeDefined();
    });

    it("fail when password is invalid", async () => {
        await User.create({
          email: testEmail2,
          password: testPassword,
          displayName: "Mr Forgetful",
        });
        await expect(verifyUser(testEmail2, "iAm80YearsOld")).rejects.toThrow("Invalid password");
      });

      it("throws when user is not found", async () => {
        await expect(
          verifyUser(`notFound@example.com`, testPassword),
        ).rejects.toThrow("User not found");
      });
});