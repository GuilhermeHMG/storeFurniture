/**
 * @typedef {Object} Permission
 * @property {?string} column
 * @property {string} key
 * @property {?boolean} value
 */

/**
 * @typedef {Object} PermissionGroup
 *
 * @property {string} title
 * @property {{ [column: string]: Permission}} permissions
 *
 */
class PermissionGroup {
	constructor(title) {
		this.title = title;
		/** @type {{ [column: string]: Permission}} */
		this.permissions = {};
		this._keyToColumn = {};
	}

	/**
	 * @param {Permission} permission
	 */
	addPermission(permission) {
		this.permissions[permission.column] = permission;
		this._keyToColumn[permission.key] = permission.column;
		return this;
	}

	setValue(column, value) {
		this.permissions[column].value = value;
		return this;
	}

	setValueByKey(key, value) {
		const column = this._keyToColumn[key];
		if (!column) return;
		if (!this.permissions[column]) return;
		this.permissions[column].value = value;
		return this;
	}

	keys() {
		return Object.values(this.permissions)
			.filter((permission) => permission.value)
			.map((permission) => permission.key);
	}
}

/**
 * @typedef {Object} PermissionTable
 * @property {string} title
 * @property {PermissionGroup[]} groups
 * @property {string[]} columns
 */
export class PermissionTable {
	constructor(title) {
		this.title = title;
		/** @type {PermissionGroup[]} */
		this.groups = [];
		this.columns = [];
	}

	/**
	 * @param  {...string} columns
	 * @returns
	 */
	addColumn(...columns) {
		this.columns.push(...columns);
		return this;
	}

	/**
	 * @param {string} title
	 */
	newGroup(title) {
		const group = new PermissionGroup(title);
		this.groups.push(group);
		return group;
	}

	/**
	 * @param {string} title
	 * @returns {?PermissionGroup}
	 */
	findGroup(title) {
		return this.groups.find((group) => group.title === title);
	}

	keys() {
		const keys = [];
		for (const group of this.groups) {
			keys.push(...group.keys());
		}
		return keys;
	}

	/**
	 *
	 * @param {array<string>} keys
	 */
	setFromKeys(keys) {
		if (!keys) return;
		for (const group of this.groups) {
			for (const permission of Object.values(group.permissions)) {
				permission.value = keys.includes(permission.key);
			}
		}
	}
}
