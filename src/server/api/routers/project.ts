import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure.input(
    z.object({
      name: z.string(),
      githubUrl: z.string(),
      githubToken: z.string()
    })
  ).mutation(async ({ input, ctx }) => {
    // Check if user is authenticated
    if (!ctx.user || !ctx.user.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated"
      });
    }

    try {
      // Use the Clerk user ID to find or create a user in your database
      let dbUser = await ctx.db.user.findUnique({
        where: { id: ctx.user.userId }
      });

      // If no user exists, create one
      dbUser ??= await ctx.db.user.create({
        data: {
          id: ctx.user.userId,
          // Add any other required fields
        }
      });

      // Now create the project with the user relationship
      const project = await ctx.db.$transaction(async (tx) => {
        const newProject = await tx.project.create({
          data: {
            name: input.name,
            githubUrl: input.githubUrl,
          }
        });
        
        await tx.userToProject.create({
          data: {
            userId: dbUser.id,
            projectId: newProject.id
          }
        });
        
        return newProject;
      });
      
      return project;
    } catch (error) {
      console.error("Project creation failed:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create project",
        cause: error
      });
    }
  })
});