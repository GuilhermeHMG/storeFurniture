import Cookies from "js-cookie";
import { ref } from "vue";
import { ZodObject, z } from "zod";
import {
  ApiResourceNotFoundException,
  ApiServerErrorException,
  ApiValidationException,
} from "./apiFactory";

function getSchemaDefaults(schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}

export class ValidationException extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

const headers = () => ({
  Authorization: `Bearer ${Cookies.get("access_token")}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

/**
 * @template Schema
 * @param {ZodObject<Any, "strict", Any, Schema>} schema
 * @param {import("./types").UseFormOptions<Schema>} options
 * @return {import("./types").UseFormInstance<Schema>}
 * */
export function useForm(schema, options) {
  const api_url = import.meta.env.VITE_API_URL;

  /** @type {import("./types").UseFormInstance<Schema>} */
  const i = {
    // I stands for Instance
    schema,
    data: ref(getSchemaDefaults(schema)),
    errors: ref({}),
    errorMessage: ref(undefined),
    loading: ref(false),
    submitted: ref(false),
    failed: ref(false),
    validated: ref(false),
    validationBinds: ref({}),
    // tainted: ref(false),
    __body: undefined,
    __loadings: 0,
    masks: {},
    __unMasks: {},
    __startLoading() {
      i.__loadings += 1;
      i.loading.value = true;
    },
    __endLoading() {
      i.__loadings -= 1;
      if (i.__loadings === 0) {
        setTimeout(() => {
          i.loading.value = i.__loadings !== 0;
        }, 5000);
      }
    },
    async __calculateBinds() {
      for (const key of Object.keys(schema.shape)) {
        i.validationBinds.value[key] = {
          invalid: !!i.errors.value[key],
          class: i.validated
            ? i.errors.value[key]
              ? "is-invalid"
              : "is-valid"
            : "",
        };
        i.validationBinds;
      }
    },
    async __submitViaFetch(url, options) {
      const response = await fetch(`${api_url}/api${url}`, {
        ...options,
        headers: {
          ...options?.headers,
          ...headers(),
        },
        body: JSON.stringify(i.__body),
      });
      // TODO: extract this code to a fuction (equal to CRUDAPÌ)
      if (response.ok) {
        return response.json();
      }
      if (response.status === 422) {
        const { message, errors } = await response.json();
        throw new ApiValidationException(message, errors);
      }
      if (response.status === 404) {
        const { message } = await response.json();
        throw new ApiResourceNotFoundException(message);
      }

      const { message } = await response.json();
      throw new ApiServerErrorException(message);
    },
    async __submitViaMethod(method) {
      const data = await method(i.__body);
      return data;
    },
    async __schemaValidate() {
      const result = schema.safeParse(i.data.value);
      if (!result.success) {
        const { issues } = result.error;
        const errors = {};
        issues.map((issue) => {
          const path = issue.path.join(".");
          if (!(path in errors)) errors[path] = [];
          errors[path].push(issue.message);
        });
        i.errors.value = errors;
        return false;
      }
      const unmasked = await i.__removeMasks(result.data);
      i.__body = unmasked;

      return true;
    },
    async submit(urlOrMethod, requestOptions) {
      if (!(await i.__schemaValidate())) {
        i.validated.value = true;
        i.failed.value = true;
        i.__calculateBinds();
        if (options?.onError)
          options?.onError(
            new ValidationException(
              "Um ou mais campos estão incorretos",
              i.errors.value
            )
          )
        return;
      }
      let data;

      i.__startLoading();
      try {
        if (options?.beforeSubmit) options.beforeSubmit(i.errors.value);
        if (typeof urlOrMethod === "string") {
          data = await i.__submitViaFetch(urlOrMethod, requestOptions);
        } else {
          data = await i.__submitViaMethod(urlOrMethod);
        }
        if (options?.onSubmit) options.onSubmit();
      } catch (error) {
        i.failed.value = true;
        if (error instanceof ApiValidationException) {
          i.errorMessage.value = error.message;
          i.errors.value = error.errors;
        } else if (error instanceof ApiResourceNotFoundException) {
          i.errorMessage.value = error.message;
        } else if (error instanceof ApiServerErrorException) {
          i.errorMessage.value = error.message;
        }
        if (options?.onError) options.onError(error);
      } finally {
        i.__endLoading();
        i.__calculateBinds();
        i.validated.value = true;
        i.submitted.value = true;
      }
      return data;
    },
    reset(taint = undefined) {
      i.data.value = getSchemaDefaults(schema);
      i.validated.value = false;
      i.submitted.value = false;
      i.failed.value = false;
      i.tainted.value = taint !== undefined ? taint : i.tainted.value;
      i.errors.value = {};
      i.errorMessage.value = undefined;
    },
    createMask(field, maskFunction, unMaskFunction) {
      const m = (event) => {
        let value = event.target.value; // Remove non-digit characters
        value = maskFunction(value);
        i.data.value[field] = value; // Update the model
        event.target.value = value; // Update the input field
      };
      i.masks[field] = m;
      if (unMaskFunction) i.__unMasks[field] = unMaskFunction;
      return i;
    },
    async __removeMasks(data) {
      for (const [field, unmask] of Object.entries(i.__unMasks)) {
        data[field] = data[field] ? await unmask(data[field]) : data[field];
      }
      return data;
    },
  };
  return i;
}
