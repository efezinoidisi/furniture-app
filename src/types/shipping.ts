export type Address = {
  apartment: string;
  city: string;
  country: string;
  created_at: string;
  full_name: string;
  id: string;
  phone_number: string;
  state: string;
  street: string;
  user_id: string | null;
};

export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;
