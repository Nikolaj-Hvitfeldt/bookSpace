import { describe, it, expect, afterAll } from "vitest";
import User from "../../db/models/User";
import { verifyUser, getUser, getUserData, requireUser } from "../auth.server";
import {commitSession, getSession} from "../session.server";

const testPassword = "authTestpassword";
const testEmail1 = `authTest${Date.now()}1@example.com`;
const testEmail2 = `authTest${Date.now()}2@example.com`;
const testEmail3 = `authtest${Date.now()}3@example.com`;

describe("auth.server verifyUser", () => {
    afterAll(async () => {
        await User.deleteMany({email: testEmail1});
        await User.deleteMany({email: testEmail2});
        await User.deleteMany({email: testEmail3});
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


      it("getUser returns undefined when no cookie is present", async () => {
          const request = new Request("http://localhost/login");
          const sessionUser = await getUser(request);
          expect(sessionUser).toBeUndefined();
        });

      it("getUserData returns null when no cookie is present", async () => {
          const request = new Request("http://localhost/login");
          const userData = await getUserData(request);
          expect(userData).toBeNull();
        });

      it("requireUser throws 401 when no cookie is present", async () => {
          const request = new Request("http://localhost/login");
          try {
            await requireUser(request);
            throw new Error("Expected requireUser to throw");
          } catch (error) {
            expect(error).toBeInstanceOf(Response);
            const res = error as Response;
            expect(res.status).toBe(401);
          }
        });

      it("getUser, getUserData and requireUser work with a valid session cookie (full flow)", async () => {

            const user = await User.create({
              email:testEmail3,
              password: testPassword,
              displayName: "Teeth Puller",
            });

            // Create a Request that contains the session cookie header
            const session = await getSession("");
            session.set("user", { _id: user._id.toString() });
            const setCookie = await commitSession(session);
            const cookieHeader = setCookie.split(";")[0]; 
            const request = new Request("http://localhost/login", {
              headers: { Cookie: cookieHeader },
            });

            // Test getUser
            const sessionUser = await getUser(request);
            expect(sessionUser?._id).toBe(user._id.toString());

            // Test getUserData
            const userData = await getUserData(request);
            expect(userData).not.toBeNull();
            expect(userData!.email).toBe(testEmail3);
            expect(userData!.displayName).toBe("Teeth Puller");

            // Test requireUser
            const required = await requireUser(request);
            expect(required._id.toString()).toBe(user._id.toString());
        });
});