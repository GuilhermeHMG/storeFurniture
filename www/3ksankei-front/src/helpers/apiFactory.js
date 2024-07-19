import Cookies from "js-cookie";
import { toQueryString } from "./querystring";

/**
 * @typedef {{[key: string]: string[]}} ApiErrors
 */

/**
 * @class
 * @constructor
 * @public
 */
export class ApiValidationException extends Error {
  /**
   *
   * @param {string} message
   * @param {ApiErrors} errors
   */
  constructor(message, errors) {
    super(message);
    /**
     * Validation errors returned by the api
     * @type {ApiErrors}
     * @public
     */
    this.errors = errors;
  }
}
/**
 * @class
 * @constructor
 * @public
 */
export class ApiResourceNotFoundException extends Error {
  // TODO: Better message for this
}

/**
 * @class
 * @constructor
 * @public
 */
export class ApiServerErrorException extends Error {}

/**
 * @template Entity, CreateDto, UpdateDto, Query
 *
 * @class
 * @constructor
 * @public
 * @type {CrudApi<Entity, CreateDto, UpdateDto, Query>}
 *
 */
export class CrudApi {
  api_url = import.meta.env.VITE_API_URL;
  /**
   * @param {string} path The parameter should start with '/' and not end with '/' the factory mounts the request with api_url/api + path + query or /id
   */
  constructor(path) {
    this.path = path;
  }

  get headers() {
    return {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  /**
   * @protected
   * @param {Response} response
   */
  parseResponse = async (response) => {
    if (response.ok) {
      if (response.status === 204) return;
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
  };

  /**
   * @param {Query} [query]
   * @returns {Promise<import("@/store/Api/types").PaginatedData<Entity>|Entity[]>}
   */
  findAll = async (query) => {
    const q = toQueryString(query);
    const request = new Request(`${this.api_url}/api${this.path}${q}`, {
      headers: this.headers,
    });
    const response = await fetch(request);
    return this.parseResponse(response);
  };

  /**
   *
   * @param {CreateDto} dto
   * @return {Promise<Entity>}
   */
  create = async (dto) => {
    const request = new Request(`${this.api_url}/api${this.path}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dto),
    });
    const response = await fetch(request);
    return this.parseResponse(response);
  };

  /**
   *
   * @param {string|number} id
   * @return {Promise<Entity>}
   */
  findOneById = async (id) => {
    const request = new Request(`${this.api_url}/api${this.path}/${id}`, {
      headers: this.headers,
    });
    const response = await fetch(request);
    return this.parseResponse(response);
  };
  /**
   *
   * @param {string|number} id
   * @return {Promise<unknown>}
   */
  delete = async (id) => {
    const request = new Request(`${this.api_url}/api${this.path}/${id}`, {
      headers: this.headers,
      method: "DELETE",
    });
    const response = await fetch(request);
    return this.parseResponse(response);
  };

  /**
   *
   * @param {string|number} id
   * @param {UpdateDto} dto
   * @return {Promise<Entity>}
   */
  update = async (id, dto) => {
    const request = new Request(`${this.api_url}/api${this.path}/${id}`, {
      headers: this.headers,
      method: "PUT",
      body: JSON.stringify(dto),
    });
    const response = await fetch(request);
    return this.parseResponse(response);
  };
}
