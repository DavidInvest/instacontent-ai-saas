import { pgTable, text, serial, integer, boolean, timestamp, json, numeric, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  plan: text("plan").notNull().default("starter"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerId: integer("owner_id").references(() => users.id),
  status: text("status").notNull().default("active"), // active, paused, archived, deleted
  lastActivity: timestamp("last_activity").defaultNow(),
  settings: json("settings"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brandProfiles = pgTable("brand_profiles", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id").references(() => workspaces.id),
  businessType: text("business_type").notNull(),
  targetAudience: text("target_audience").notNull(),
  brandVoice: text("brand_voice").notNull(),
  brandValues: json("brand_values"),
  contentGoals: json("content_goals"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id").references(() => workspaces.id),
  type: text("type").notNull(), // post, story, carousel
  caption: text("caption").notNull(),
  hashtags: json("hashtags"),
  visualRecommendations: json("visual_recommendations"),
  performancePrediction: json("performance_prediction"),
  status: text("status").notNull().default("draft"), // draft, published, archived
  aiGenerated: boolean("ai_generated").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const trends = pgTable("trends", {
  id: serial("id").primaryKey(),
  hashtag: text("hashtag").notNull(),
  viralityScore: integer("virality_score").notNull(),
  safetyScore: integer("safety_score").notNull(),
  engagementBoost: text("engagement_boost").notNull(),
  lifespan: text("lifespan").notNull(),
  sources: json("sources"),
  status: text("status").notNull().default("safe"), // safe, review, blocked
  detectedAt: timestamp("detected_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const collaborationSessions = pgTable("collaboration_sessions", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id").references(() => contentItems.id),
  userId: integer("user_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  lastActivity: timestamp("last_activity").defaultNow(),
  cursor: json("cursor"),
});

export const workspaceMembers = pgTable("workspace_members", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id").references(() => workspaces.id),
  userId: integer("user_id").references(() => users.id),
  role: text("role").notNull().default("viewer"), // owner, admin, editor, viewer
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertWorkspaceSchema = createInsertSchema(workspaces).omit({ id: true, createdAt: true });
export const insertBrandProfileSchema = createInsertSchema(brandProfiles).omit({ id: true, createdAt: true });
export const insertContentItemSchema = createInsertSchema(contentItems).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTrendSchema = createInsertSchema(trends).omit({ id: true, detectedAt: true, updatedAt: true });
export const insertWorkspaceMemberSchema = createInsertSchema(workspaceMembers).omit({ id: true, joinedAt: true });

export type User = typeof users.$inferSelect;
export type Workspace = typeof workspaces.$inferSelect;
export type BrandProfile = typeof brandProfiles.$inferSelect;
export type ContentItem = typeof contentItems.$inferSelect;
export type Trend = typeof trends.$inferSelect;
export type CollaborationSession = typeof collaborationSessions.$inferSelect;
export type WorkspaceMember = typeof workspaceMembers.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;
export type InsertBrandProfile = z.infer<typeof insertBrandProfileSchema>;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;
export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type InsertWorkspaceMember = z.infer<typeof insertWorkspaceMemberSchema>;

// Agency white-label system
export const agencies = pgTable("agencies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(), // for custom domains
  ownerId: integer("owner_id").notNull().references(() => users.id),
  customDomain: text("custom_domain"),
  logoUrl: text("logo_url"),
  brandColors: json("brand_colors").$type<{
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  }>().default({
    primary: "#8B5CF6",
    secondary: "#A78BFA", 
    accent: "#C4B5FD",
    background: "#FFFFFF",
    text: "#1F2937"
  }),
  whitelabelSettings: json("whitelabel_settings").$type<{
    hideInstaContentBranding: boolean;
    customAppName: string;
    customTagline: string;
    showPoweredBy: boolean;
    customFavicon: string;
  }>().default({
    hideInstaContentBranding: false,
    customAppName: "InstaContent AI",
    customTagline: "AI-Powered Instagram Content Creation",
    showPoweredBy: true,
    customFavicon: ""
  }),
  subscriptionPlan: text("subscription_plan").notNull().default("starter"), // starter, pro, agency, enterprise
  maxClients: integer("max_clients").notNull().default(5),
  maxUsersPerClient: integer("max_users_per_client").notNull().default(3),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agencyClients = pgTable("agency_clients", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id").notNull().references(() => agencies.id),
  workspaceId: integer("workspace_id").notNull().references(() => workspaces.id),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  clientPhone: text("client_phone"),
  industry: text("industry"),
  monthlyContentQuota: integer("monthly_content_quota").notNull().default(50),
  usedContentThisMonth: integer("used_content_this_month").notNull().default(0),
  status: text("status").notNull().default("active"), // active, paused, cancelled
  billingType: text("billing_type").notNull().default("agency"), // agency, direct
  monthlyFee: numeric("monthly_fee", { precision: 10, scale: 2 }).default("0.00"),
  contractStartDate: text("contract_start_date"), // YYYY-MM-DD format
  contractEndDate: text("contract_end_date"), // YYYY-MM-DD format
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agencyInvites = pgTable("agency_invites", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id").notNull().references(() => agencies.id),
  email: text("email").notNull(),
  role: text("role").notNull().default("member"), // admin, member
  inviteToken: text("invite_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  acceptedAt: timestamp("accepted_at"),
  invitedBy: integer("invited_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas for agencies
export const insertAgencySchema = createInsertSchema(agencies, {
  brandColors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    text: z.string(),
  }).optional(),
  whitelabelSettings: z.object({
    hideInstaContentBranding: z.boolean(),
    customAppName: z.string(),
    customTagline: z.string(),
    showPoweredBy: z.boolean(),
    customFavicon: z.string(),
  }).optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertAgencyClientSchema = createInsertSchema(agencyClients).omit({ id: true, createdAt: true, updatedAt: true });
export const insertAgencyInviteSchema = createInsertSchema(agencyInvites).omit({ id: true, createdAt: true });

// Agency types
export type Agency = typeof agencies.$inferSelect;
export type AgencyClient = typeof agencyClients.$inferSelect;
export type AgencyInvite = typeof agencyInvites.$inferSelect;
export type InsertAgency = z.infer<typeof insertAgencySchema>;
export type InsertAgencyClient = z.infer<typeof insertAgencyClientSchema>;
export type InsertAgencyInvite = z.infer<typeof insertAgencyInviteSchema>;
Add database schema with all tables and types
