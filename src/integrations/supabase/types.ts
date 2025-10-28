export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          contact_info: string
          contact_type: string
          created_at: string | null
          id: string
        }
        Insert: {
          contact_info: string
          contact_type: string
          created_at?: string | null
          id?: string
        }
        Update: {
          contact_info?: string
          contact_type?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      invitations: {
        Row: {
          activity: string
          age_range: string
          contact_id: string | null
          created_at: string | null
          gender: string
          id: string
          languages: string
          location: string
          max_participants: number
          preferred_age_range: string
          preferred_gender: string
          time: string
          title: string
        }
        Insert: {
          activity: string
          age_range?: string
          contact_id?: string | null
          created_at?: string | null
          gender?: string
          id?: string
          languages?: string
          location: string
          max_participants?: number
          preferred_age_range?: string
          preferred_gender?: string
          time: string
          title: string
        }
        Update: {
          activity?: string
          age_range?: string
          contact_id?: string | null
          created_at?: string | null
          gender?: string
          id?: string
          languages?: string
          location?: string
          max_participants?: number
          preferred_age_range?: string
          preferred_gender?: string
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      local_applications: {
        Row: {
          age_range: string
          contact_id: string | null
          created_at: string | null
          gender: string
          id: string
          interested_location: string
          languages: string
          participants: number
          visitor_request_id: string
        }
        Insert: {
          age_range?: string
          contact_id?: string | null
          created_at?: string | null
          gender?: string
          id?: string
          interested_location: string
          languages?: string
          participants: number
          visitor_request_id: string
        }
        Update: {
          age_range?: string
          contact_id?: string | null
          created_at?: string | null
          gender?: string
          id?: string
          interested_location?: string
          languages?: string
          participants?: number
          visitor_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visitor_applications_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visitor_applications_visitor_request_id_fkey"
            columns: ["visitor_request_id"]
            isOneToOne: false
            referencedRelation: "visitor_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      visitor_applications: {
        Row: {
          age_range: string
          contact_id: string | null
          created_at: string | null
          id: string
          interested_location: string
          invitation_id: string
          languages: string
          participant_details: string
          preferred_date: string | null
        }
        Insert: {
          age_range?: string
          contact_id?: string | null
          created_at?: string | null
          id?: string
          interested_location: string
          invitation_id: string
          languages?: string
          participant_details?: string
          preferred_date?: string | null
        }
        Update: {
          age_range?: string
          contact_id?: string | null
          created_at?: string | null
          id?: string
          interested_location?: string
          invitation_id?: string
          languages?: string
          participant_details?: string
          preferred_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      visitor_requests: {
        Row: {
          age_range: string
          companion_genders: string
          contact_id: string | null
          created_at: string | null
          gender: string
          id: string
          languages: string
          location: string
          participants: number
          preferred_age_range: string
          preferred_gender: string
          time: string
          title: string
        }
        Insert: {
          age_range?: string
          companion_genders?: string
          contact_id?: string | null
          created_at?: string | null
          gender?: string
          id?: string
          languages?: string
          location: string
          participants: number
          preferred_age_range?: string
          preferred_gender?: string
          time: string
          title: string
        }
        Update: {
          age_range?: string
          companion_genders?: string
          contact_id?: string | null
          created_at?: string | null
          gender?: string
          id?: string
          languages?: string
          location?: string
          participants?: number
          preferred_age_range?: string
          preferred_gender?: string
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "visitor_requests_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_applications: { Args: never; Returns: undefined }
      cleanup_old_invitations: { Args: never; Returns: undefined }
      cleanup_old_visitor_requests: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
