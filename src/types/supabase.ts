export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          product_id: string;
          quantity: number;
          user_id: string;
        };
        Insert: {
          product_id?: string;
          quantity?: number;
          user_id?: string;
        };
        Update: {
          product_id?: string;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_cart_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_cart_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      category: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name?: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      order: {
        Row: {
          created_at: string;
          date: string | null;
          id: number;
          payment_id: number | null;
          shipment_id: number | null;
          total_price: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          id?: number;
          payment_id?: number | null;
          shipment_id?: number | null;
          total_price?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          id?: number;
          payment_id?: number | null;
          shipment_id?: number | null;
          total_price?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_payment_id_fkey';
            columns: ['payment_id'];
            isOneToOne: false;
            referencedRelation: 'payment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipment_id_fkey';
            columns: ['shipment_id'];
            isOneToOne: false;
            referencedRelation: 'shipment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      order_item: {
        Row: {
          created_at: string;
          id: number;
          order_id: number | null;
          price: number | null;
          product_id: number | null;
          quantity: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          order_id?: number | null;
          price?: number | null;
          product_id?: number | null;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_item_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order';
            referencedColumns: ['id'];
          }
        ];
      };
      payment: {
        Row: {
          amount: number | null;
          created_at: string;
          date: string | null;
          id: number;
          method: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          method?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          method?: string | null;
        };
        Relationships: [];
      };
      product: {
        Row: {
          category_id: string;
          colors: string[] | null;
          createdAt: string | null;
          description: string | null;
          discount: number | null;
          id: string;
          image: string;
          name: string;
          price: number;
          promo: string | null;
          stock: number;
        };
        Insert: {
          category_id: string;
          colors?: string[] | null;
          createdAt?: string | null;
          description?: string | null;
          discount?: number | null;
          id?: string;
          image?: string;
          name?: string;
          price?: number;
          promo?: string | null;
          stock?: number;
        };
        Update: {
          category_id?: string;
          colors?: string[] | null;
          createdAt?: string | null;
          description?: string | null;
          discount?: number | null;
          id?: string;
          image?: string;
          name?: string;
          price?: number;
          promo?: string | null;
          stock?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'category';
            referencedColumns: ['id'];
          }
        ];
      };
      shipment: {
        Row: {
          address: string | null;
          city: string | null;
          country: string | null;
          created_at: string;
          date: string | null;
          id: number;
          state: string | null;
          user_id: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          state?: string | null;
          user_id?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          date?: string | null;
          id?: number;
          state?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'shipment_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
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
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
