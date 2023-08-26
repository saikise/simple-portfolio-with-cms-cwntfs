export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      platforms: {
        Row: {
          icon: string;
          id: string;
          title: string;
        };
        Insert: {
          icon: string;
          id?: string;
          title: string;
        };
        Update: {
          icon?: string;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          email: string;
          id: string;
        };
        Insert: {
          email: string;
          id: string;
        };
        Update: {
          email?: string;
          id?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          description: string;
          id: string;
          image: string;
          pinned: boolean | null;
          title: string;
        };
        Insert: {
          description: string;
          id?: string;
          image: string;
          pinned?: boolean | null;
          title: string;
        };
        Update: {
          description?: string;
          id?: string;
          image?: string;
          pinned?: boolean | null;
          title?: string;
        };
        Relationships: [];
      };
      projects_platforms: {
        Row: {
          platform_id: string;
          project_id: string;
          url: string;
        };
        Insert: {
          platform_id: string;
          project_id: string;
          url: string;
        };
        Update: {
          platform_id?: string;
          project_id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_platforms_platform_id_fkey";
            columns: ["platform_id"];
            referencedRelation: "platforms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_platforms_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects_series: {
        Row: {
          project_id: string;
          series_id: string;
        };
        Insert: {
          project_id: string;
          series_id: string;
        };
        Update: {
          project_id?: string;
          series_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_series_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_series_series_id_fkey";
            columns: ["series_id"];
            referencedRelation: "series";
            referencedColumns: ["id"];
          },
        ];
      };
      series: {
        Row: {
          code: string;
          description: string;
          icon: string;
          id: string;
          title: string;
        };
        Insert: {
          code: string;
          description: string;
          icon: string;
          id?: string;
          title: string;
        };
        Update: {
          code?: string;
          description?: string;
          icon?: string;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
