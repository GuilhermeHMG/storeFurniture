import type { Ref } from "vue";
import type { AnyZodObject, ZodObject, ZodTypeAny, string, z } from "zod";
import type { ValidationException } from "./useForm";

export interface OnPageChangeParams {
  first: number;
  page: number;
  pageCount: number;
  rows: number;
}

export type UseFormDef<T> = {
  data: T;
  customData: T;
  errors?: {
    [x in keyof T]?: string[];
  };
  masks: {
    [x in keyof T]?: (event: Event) => void;
  };
  loading: boolean;
  failed: boolean;
  validated: boolean;
  validationBinds: {
    [x in keyof T]?: {
      invalid: boolean;

      class: string;
    };
  };
  submit: (
    url: string,
    options?: SubmitOptions
  ) => Promise<{ data: unknown; errors: unknown }>;
  // * apiSubmit: (method: (data: T) => Entity) => Promise<Entity></Entity>
  apiSubmit: <U>(method: (data: T) => U) => Promise<U>;
  set: (data: Partial<T>) => void;
  createMask: (
    field: keyof T,
    maskFunction: (value: string) => string,
    unMaskFunction: (value: string) => string
  ) => UseFormDef<T>;
};

export type ErrorsResult<Schema> = {
  [key in keyof Schema]?: string[];
};

export type UseFormOptions<Schema> = {
  beforeSubmit: () => unknown;
  onSubmit: () => unknown;
  onError: (error: ValidationException | Error) => unknown;
};

export type UseFormInstance<Schema> = {
  data: Ref<Schema>;
  defaultData: Schema;
  errors: Ref<ErrorsResult<Schema>>;
  errorMessage: Ref<string | undefined>;
  validationBinds: Ref<{
    [key in keyof Schema]: {
      class: string;
      invalid: string;
    };
  }>;
  masks: {
    [x in keyof T]?: (event: Event) => void;
  };
  loading: Ref<boolean>;
  // tainted: Ref<boolean>,
  validated: Ref<boolean>;
  submitted: Ref<boolean>;
  failed: Ref<boolean>;
  createMask: (
    field: keyof Schema,
    maskFunction: (value: string) => string,
    unMaskFunction: (value: string) => string
  ) => UseFormInstance<Schema>;

  // Method overloads for submit
  submit(url: string, options?: RequestInit): Promise<unknown> | undefined;
  submit<U>(method: (data: Schema) => U): Promise<U> | undefined;

  reset: (taint: boolean) => unknown;

};
