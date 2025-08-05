export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      account_opening_applications: {
        Row: {
          application_type: string
          created_at: string
          form_data: Json
          id: string
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          application_type?: string
          created_at?: string
          form_data?: Json
          id?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          application_type?: string
          created_at?: string
          form_data?: Json
          id?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_approved: boolean
          report_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean
          report_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean
          report_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "research_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          phone: string | null
          status: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          phone?: string | null
          status?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          phone?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_blocks: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          image_path: string | null
          is_active: boolean
          order_index: number
          page_key: string
          section_key: string
          subtitle: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_path?: string | null
          is_active?: boolean
          order_index?: number
          page_key: string
          section_key: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_path?: string | null
          is_active?: boolean
          order_index?: number
          page_key?: string
          section_key?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string
          id: string
          image_path: string | null
          is_featured: boolean | null
          location: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date: string
          id?: string
          image_path?: string | null
          is_featured?: boolean | null
          location?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string
          id?: string
          image_path?: string | null
          is_featured?: boolean | null
          location?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          email: string
          id: string
          inquiry: string
          name: string
          phone: string | null
          source: string
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string
          email: string
          id?: string
          inquiry: string
          name: string
          phone?: string | null
          source?: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          email?: string
          id?: string
          inquiry?: string
          name?: string
          phone?: string | null
          source?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      market_data: {
        Row: {
          additional_data: Json | null
          change_percent: number | null
          created_at: string | null
          data_type: string
          date: string
          id: string
          ticker_symbol: string | null
          updated_at: string | null
          value: number
        }
        Insert: {
          additional_data?: Json | null
          change_percent?: number | null
          created_at?: string | null
          data_type: string
          date: string
          id?: string
          ticker_symbol?: string | null
          updated_at?: string | null
          value: number
        }
        Update: {
          additional_data?: Json | null
          change_percent?: number | null
          created_at?: string | null
          data_type?: string
          date?: string
          id?: string
          ticker_symbol?: string | null
          updated_at?: string | null
          value?: number
        }
        Relationships: []
      }
      payments: {
        Row: {
          additional_data: Json | null
          amount: number
          currency: string
          id: string
          payment_date: string | null
          payment_method: string | null
          status: string
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          additional_data?: Json | null
          amount: number
          currency?: string
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          status: string
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          additional_data?: Json | null
          amount?: number
          currency?: string
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          status?: string
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          first_name: string | null
          id: string
          industry: string | null
          is_active: boolean | null
          last_name: string | null
          phone: string | null
          position: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          industry?: string | null
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      report_files: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          report_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          report_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          report_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_files_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "research_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_images: {
        Row: {
          created_at: string | null
          id: string
          image_name: string
          image_path: string
          is_featured: boolean | null
          report_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_name: string
          image_path: string
          is_featured?: boolean | null
          report_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_name?: string
          image_path?: string
          is_featured?: boolean | null
          report_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_images_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "research_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      research_reports: {
        Row: {
          author: string | null
          content: string | null
          created_at: string | null
          date: string
          id: string
          is_premium: boolean
          preview: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          date: string
          id?: string
          is_premium?: boolean
          preview: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          date?: string
          id?: string
          is_premium?: boolean
          preview?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reward_achievements: {
        Row: {
          achievement_code: string
          achievement_name: string
          achievement_type: Database["public"]["Enums"]["achievement_type"]
          description: string | null
          icon_name: string | null
          id: string
          points_awarded: number
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_code: string
          achievement_name: string
          achievement_type: Database["public"]["Enums"]["achievement_type"]
          description?: string | null
          icon_name?: string | null
          id?: string
          points_awarded?: number
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_code?: string
          achievement_name?: string
          achievement_type?: Database["public"]["Enums"]["achievement_type"]
          description?: string | null
          icon_name?: string | null
          id?: string
          points_awarded?: number
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          expires_at: string | null
          fulfilled_at: string | null
          id: string
          points_cost: number
          redeemed_at: string
          redemption_details: Json | null
          reward_category: Database["public"]["Enums"]["reward_category"]
          reward_name: string
          status: string
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          fulfilled_at?: string | null
          id?: string
          points_cost: number
          redeemed_at?: string
          redemption_details?: Json | null
          reward_category: Database["public"]["Enums"]["reward_category"]
          reward_name: string
          status?: string
          user_id: string
        }
        Update: {
          expires_at?: string | null
          fulfilled_at?: string | null
          id?: string
          points_cost?: number
          redeemed_at?: string
          redemption_details?: Json | null
          reward_category?: Database["public"]["Enums"]["reward_category"]
          reward_name?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      reward_transactions: {
        Row: {
          activity_details: Json | null
          activity_type: string
          created_at: string
          id: string
          points: number
          reference_id: string | null
          transaction_type: Database["public"]["Enums"]["reward_transaction_type"]
          user_id: string
        }
        Insert: {
          activity_details?: Json | null
          activity_type: string
          created_at?: string
          id?: string
          points: number
          reference_id?: string | null
          transaction_type: Database["public"]["Enums"]["reward_transaction_type"]
          user_id: string
        }
        Update: {
          activity_details?: Json | null
          activity_type?: string
          created_at?: string
          id?: string
          points?: number
          reference_id?: string | null
          transaction_type?: Database["public"]["Enums"]["reward_transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json | null
          id: string
          interval: string
          is_active: boolean
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          interval: string
          is_active?: boolean
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          interval?: string
          is_active?: boolean
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activities: {
        Row: {
          activity_type: string
          created_at: string
          id: string
          ip_address: unknown | null
          timestamp: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          timestamp?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_manual_confirmations: {
        Row: {
          confirmation_date: string
          confirmed_by: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          confirmation_date?: string
          confirmed_by: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          confirmation_date?: string
          confirmed_by?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_rewards: {
        Row: {
          available_points: number
          created_at: string
          id: string
          last_activity_date: string | null
          redeemed_points: number
          streak_days: number
          tier_level: string
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_points?: number
          created_at?: string
          id?: string
          last_activity_date?: string | null
          redeemed_points?: number
          streak_days?: number
          tier_level?: string
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_points?: number
          created_at?: string
          id?: string
          last_activity_date?: string | null
          redeemed_points?: number
          streak_days?: number
          tier_level?: string
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_delete_user: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      admin_manually_confirm_user: {
        Args:
          | { target_user_id: string }
          | { target_user_id: string; confirmed_by_user_id: string }
        Returns: boolean
      }
      award_points: {
        Args: {
          target_user_id: string
          points_amount: number
          activity_type_param: string
          activity_details_param?: Json
        }
        Returns: boolean
      }
      can_approve_content: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      can_edit_content: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      can_view_premium_content: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_user_activities_with_emails: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          user_id: string
          activity_type: string
          activity_timestamp: string
          ip_address: unknown
          user_agent: string
          created_at: string
          user_email: string
          user_first_name: string
          user_last_name: string
        }[]
      }
      get_user_role: {
        Args: { user_id?: string }
        Returns: string
      }
      get_user_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_users: number
          pending_activations: number
          activated_users: number
        }[]
      }
      get_users_with_profiles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: string
          company: string
          job_position: string
          phone: string
          industry: string
          created_at: string
          last_sign_in_at: string
          is_active: boolean
          email_confirmed_at: string
          manually_confirmed_by: string
          manual_confirmation_date: string
        }[]
      }
      redeem_points: {
        Args: {
          target_user_id: string
          points_cost: number
          reward_name_param: string
          reward_category_param: Database["public"]["Enums"]["reward_category"]
          redemption_details_param?: Json
        }
        Returns: boolean
      }
      unlock_achievement: {
        Args: {
          target_user_id: string
          achievement_code_param: string
          achievement_name_param: string
          achievement_type_param: Database["public"]["Enums"]["achievement_type"]
          description_param: string
          points_awarded_param?: number
          icon_name_param?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      achievement_type:
        | "onboarding"
        | "engagement"
        | "milestone"
        | "social"
        | "learning"
        | "loyalty"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
      reward_category:
        | "digital"
        | "physical"
        | "experience"
        | "investment"
        | "consultation"
      reward_transaction_type:
        | "earned"
        | "redeemed"
        | "expired"
        | "bonus"
        | "referral"
      user_role:
        | "Admin"
        | "Developer"
        | "Analyst"
        | "Customer"
        | "User"
        | "Client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      achievement_type: [
        "onboarding",
        "engagement",
        "milestone",
        "social",
        "learning",
        "loyalty",
      ],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
      ],
      reward_category: [
        "digital",
        "physical",
        "experience",
        "investment",
        "consultation",
      ],
      reward_transaction_type: [
        "earned",
        "redeemed",
        "expired",
        "bonus",
        "referral",
      ],
      user_role: [
        "Admin",
        "Developer",
        "Analyst",
        "Customer",
        "User",
        "Client",
      ],
    },
  },
} as const
