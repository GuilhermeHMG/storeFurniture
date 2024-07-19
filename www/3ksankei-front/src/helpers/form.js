/**
 * UseForms Module
 * @module UseForms
 */

import { HttpValidationException } from "@/exceptions/HttpValidationException";
import Cookies from "js-cookie";
import { reactive } from "vue";
import { z } from "zod";

/**
 * @typedef {Object} SubmitOptions
 *
 * @property {"POST"|"PUT"} method
 *
 */

function getDefaults(schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}

/**
 *
 * @deprecated
 *
 * Use the form in the useForm (has capabilities for desconstruct the values)
 *
 * @template T
 * Creates a useForm hook with types derived from a Zod schema.
 * @param {import("zod").ZodObject<Any, "strip", z.ZodTypeAny, T, T>} schema A Zod schema object.
 * @returns {import("./types").UseFormDef<T>}
 */
export function useForm(schema) {
  const api_url = import.meta.env.VITE_API_URL;

  const data = getDefaults(schema);
  const getHeaders = () => ({
    Authorization: `Bearer ${Cookies.get("access_token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const form = reactive({
    data,
    errors: {},
    customData: {},
    masks: {},
    unMasks: {},
    loading: false,
    validated: false,
    failed: false,
    validationBinds: {},
    async calculateBinds() {
      for (const key of Object.keys(schema.shape)) {
        this.validationBinds[key] = {
          invalid: form.errors[key],
          class: form.validated
            ? form.errors[key]
              ? "is-invalid"
              : "is-valid"
            : "",
        };
      }
    },
    async submit(url, options) {
      form.loading = true;
      const data = form.getBody();
      const result = schema.safeParse(data);
      if (!result.success) {
        const { issues } = result.error;
        const errors = {};
        issues.map((issue) => {
          const path = issue.path.join(".");
          if (!(path in errors)) errors[path] = [];
          errors[path].push(issue.message);
        });
        form.setFailure(errors);
        return errors;
      }
      const body = result.data;
      try {
        const response = await fetch(`${api_url}/api${url}`, {
          method: options?.method ?? "POST",
          headers: getHeaders(),
          body: JSON.stringify(body),
        });
        if (response.ok) {
          form.setSuccess();
          return response.json();
        }
        if (response.status === 422) {
          const { errors } = await response.json();
          form.setFailure(errors);
          return data;
        }
        const data = response?.json() ?? {
          code: response.status,
          message: response.statusText,
        };
        form.setFailure(data);
        return data;
      } catch (error) {
        form.setFailure(error);
        return { error: error.message };
      }
    },
    async apiSubmit(apiCaller) {
      form.loading = true;
      const data = form.getBody();
      const result = schema.safeParse(data);
      if (!result.success) {
        const { issues } = result.error;
        const errors = {};
        issues.map((issue) => {
          const path = issue.path.join(".");
          if (!(path in errors)) errors[path] = [];
          errors[path].push(issue.message);
        });
        form.setFailure(errors);
        return errors;
      }
      const body = result.data;
      try {
        const data = await apiCaller(body);
        form.setSuccess();
        return data;
      } catch (error) {
        if (error instanceof HttpValidationException) {
          const { errors } = error;
          form.setFailure(errors);
          return data;
        }
        form.setFailure(error);
        return { error: error.message };
      }
    },
    setFailure: async (errors) => {
      form.errors = errors;
      form.validated = true;
      form.failed = true;
      form.calculateBinds();
      setTimeout(() => {
        form.loading = false;
      }, 2000);
    },
    setSuccess: async () => {
      form.errors = {};
      form.failed = false;
      form.calculateBinds();
      setTimeout(() => {
        form.loading = false;
      }, 4000);
    },
    set(data) {
      form.data = { ...form.data, ...data };
    },
    createMask(field, maskFunction, unMaskFunction) {
      const m = (event) => {
        let value = event.target.value; // Remove non-digit characters
        value = maskFunction(value);
        form.data[field] = value; // Update the model
        event.target.value = value; // Update the input field
      };
      form.masks[field] = m;
      if (unMaskFunction) form.unMasks[field] = unMaskFunction;
      return form;
    },
    getBody() {
      const masks = {};
      for (const [field, unmask] of Object.entries(form.unMasks)) {
        masks[field] = form.data[field]
          ? unmask(form.data[field])
          : form.data[field];
      }
      const data = {
        ...form.data,
        ...form.customData,
        ...masks,
      };
      return data;
    },
  });
  return form;
}
