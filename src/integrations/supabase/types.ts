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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      Arac: {
        Row: {
          arac_tur_adi: string | null
          arac_tur_id: number
        }
        Insert: {
          arac_tur_adi?: string | null
          arac_tur_id?: never
        }
        Update: {
          arac_tur_adi?: string | null
          arac_tur_id?: never
        }
        Relationships: []
      }
      Isletme: {
        Row: {
          isletme_ad: string | null
          isletme_id: number
        }
        Insert: {
          isletme_ad?: string | null
          isletme_id?: never
        }
        Update: {
          isletme_ad?: string | null
          isletme_id?: never
        }
        Relationships: []
      }
      Isletme_arac: {
        Row: {
          adet: number | null
          arac_tur_id: number | null
          isletme_arac_id: number
          isletme_id: number | null
        }
        Insert: {
          adet?: number | null
          arac_tur_id?: number | null
          isletme_arac_id?: never
          isletme_id?: number | null
        }
        Update: {
          adet?: number | null
          arac_tur_id?: number | null
          isletme_arac_id?: never
          isletme_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Isletme_arac_arac_tur_id_fkey"
            columns: ["arac_tur_id"]
            isOneToOne: false
            referencedRelation: "Arac"
            referencedColumns: ["arac_tur_id"]
          },
          {
            foreignKeyName: "Isletme_arac_isletme_id_fkey"
            columns: ["isletme_id"]
            isOneToOne: false
            referencedRelation: "Isletme"
            referencedColumns: ["isletme_id"]
          },
        ]
      }
      Yangin_2023: {
        Row: {
          agac_tur: string | null
          isletme_id: number | null
          kullanilan_personel_sayisi: number | null
          yangin_ay: string | null
          yangin_id: number
          yangin_il: string | null
          yangin_neden: string | null
        }
        Insert: {
          agac_tur?: string | null
          isletme_id?: number | null
          kullanilan_personel_sayisi?: number | null
          yangin_ay?: string | null
          yangin_id?: never
          yangin_il?: string | null
          yangin_neden?: string | null
        }
        Update: {
          agac_tur?: string | null
          isletme_id?: number | null
          kullanilan_personel_sayisi?: number | null
          yangin_ay?: string | null
          yangin_id?: never
          yangin_il?: string | null
          yangin_neden?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Yangin_2023_isletme_id_fkey"
            columns: ["isletme_id"]
            isOneToOne: false
            referencedRelation: "Isletme"
            referencedColumns: ["isletme_id"]
          },
        ]
      }
      Yangin_2024: {
        Row: {
          agac_tur: string | null
          isletme_id: number | null
          kullanilan_personel_sayisi: number | null
          yangin_ay: string | null
          yangin_id: number
          yangin_il: string | null
          yangin_neden: string | null
        }
        Insert: {
          agac_tur?: string | null
          isletme_id?: number | null
          kullanilan_personel_sayisi?: number | null
          yangin_ay?: string | null
          yangin_id?: never
          yangin_il?: string | null
          yangin_neden?: string | null
        }
        Update: {
          agac_tur?: string | null
          isletme_id?: number | null
          kullanilan_personel_sayisi?: number | null
          yangin_ay?: string | null
          yangin_id?: never
          yangin_il?: string | null
          yangin_neden?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Yangin_2024_isletme_id_fkey"
            columns: ["isletme_id"]
            isOneToOne: false
            referencedRelation: "Isletme"
            referencedColumns: ["isletme_id"]
          },
        ]
      }
      Yangin_2025: {
        Row: {
          agac_tur: string | null
          isletme_id: number | null
          kullanilan_personel_sayisi: number | null
          yangin_ay: string | null
          yangin_id: number
          yangin_il: string | null
          yangin_neden: string | null
        }
        Insert: {
          agac_tur?: string | null
          isletme_id?: number | null
          kullanilan_personel_sayisi?: number | null
          yangin_ay?: string | null
          yangin_id?: never
          yangin_il?: string | null
          yangin_neden?: string | null
        }
        Update: {
          agac_tur?: string | null
          isletme_id?: number | null
          kullanilan_personel_sayisi?: number | null
          yangin_ay?: string | null
          yangin_id?: never
          yangin_il?: string | null
          yangin_neden?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Yangin_2025_isletme_id_fkey"
            columns: ["isletme_id"]
            isOneToOne: false
            referencedRelation: "Isletme"
            referencedColumns: ["isletme_id"]
          },
        ]
      }
      Yangin_arac_2023: {
        Row: {
          adet: number | null
          arac_tur_id: number | null
          yangin_arac_id: number
          yangin_id: number | null
        }
        Insert: {
          adet?: number | null
          arac_tur_id?: number | null
          yangin_arac_id?: never
          yangin_id?: number | null
        }
        Update: {
          adet?: number | null
          arac_tur_id?: number | null
          yangin_arac_id?: never
          yangin_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Yangin_arac_2023_arac_tur_id_fkey"
            columns: ["arac_tur_id"]
            isOneToOne: false
            referencedRelation: "Arac"
            referencedColumns: ["arac_tur_id"]
          },
          {
            foreignKeyName: "Yangin_arac_2023_yangin_id_fkey"
            columns: ["yangin_id"]
            isOneToOne: false
            referencedRelation: "Yangin_2023"
            referencedColumns: ["yangin_id"]
          },
        ]
      }
      Yangin_arac_2024: {
        Row: {
          adet: number | null
          arac_tur_id: number | null
          yangin_arac_id: number
          yangin_id: number | null
        }
        Insert: {
          adet?: number | null
          arac_tur_id?: number | null
          yangin_arac_id?: never
          yangin_id?: number | null
        }
        Update: {
          adet?: number | null
          arac_tur_id?: number | null
          yangin_arac_id?: never
          yangin_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Yangin_arac_2024_arac_tur_id_fkey"
            columns: ["arac_tur_id"]
            isOneToOne: false
            referencedRelation: "Arac"
            referencedColumns: ["arac_tur_id"]
          },
          {
            foreignKeyName: "Yangin_arac_2024_yangin_id_fkey"
            columns: ["yangin_id"]
            isOneToOne: false
            referencedRelation: "Yangin_2024"
            referencedColumns: ["yangin_id"]
          },
        ]
      }
      Yangin_arac_2025: {
        Row: {
          adet: number | null
          arac_tur_id: number | null
          yangin_arac_id: number
          yangin_id: number | null
        }
        Insert: {
          adet?: number | null
          arac_tur_id?: number | null
          yangin_arac_id?: never
          yangin_id?: number | null
        }
        Update: {
          adet?: number | null
          arac_tur_id?: number | null
          yangin_arac_id?: never
          yangin_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Yangin_arac_2025_arac_tur_id_fkey"
            columns: ["arac_tur_id"]
            isOneToOne: false
            referencedRelation: "Arac"
            referencedColumns: ["arac_tur_id"]
          },
          {
            foreignKeyName: "Yangin_arac_2025_yangin_id_fkey"
            columns: ["yangin_id"]
            isOneToOne: false
            referencedRelation: "Yangin_2025"
            referencedColumns: ["yangin_id"]
          },
        ]
      }
    }
    Views: {
      isletme_arac_asimi_view: {
        Row: {
          arac_asimi: number | null
          isletme_ad: string | null
          isletme_toplam_arac: number | null
          yanginda_kullanilan_arac: number | null
        }
        Relationships: []
      }
      isletme_tehlike_siralama_view: {
        Row: {
          isletme_ad: string | null
          tehlike_turu: string | null
          yangin_sayisi: number | null
        }
        Relationships: []
      }
      isletme_yangin_nedenleri_view: {
        Row: {
          isletme_ad: string | null
          yangin_neden: string | null
          yangin_sayisi: number | null
        }
        Relationships: []
      }
      tehlikeli_yangin_agac_view: {
        Row: {
          agac_tur: string | null
          isletme_ad: string | null
          yangin_sayisi: number | null
        }
        Relationships: []
      }
      tum_yillar_yangin: {
        Row: {
          isletme_id: number | null
          yangin_id: number | null
        }
        Relationships: []
      }
      tum_yillar_yangin_arac: {
        Row: {
          adet: number | null
          arac_tur_id: number | null
          yangin_id: number | null
        }
        Relationships: []
      }
      tum_yillar_yangin_detay: {
        Row: {
          isletme_id: number | null
          yangin_neden: string | null
        }
        Relationships: []
      }
      yangin_analiz_view: {
        Row: {
          isletme_id: number | null
          kullanilan_personel_sayisi: number | null
          tehlike_seviyesi: string | null
          yangin_ay: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
