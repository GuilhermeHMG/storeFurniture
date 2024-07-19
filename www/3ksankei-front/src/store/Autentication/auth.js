import { defineStore } from "pinia";

export const useAuth = defineStore("useAuth", () => {
  const path_api = import.meta.env.VITE_API_URL

  async function login(username, password) {
    try {
      const response = await fetch(`${path_api}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao realizar login');
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function redefinirSenha(senha, c_senha, accessToken) {
    try {

      if (senha.length < 8) {
        throw new Error('A nova senha deve conter no mínimo 8 caracteres');
      }

      const response = await fetch(`${path_api}/api/redefinirSenha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          password: senha,
          c_password: c_senha,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao alterar senha');
      }

      const data = await response.json();
      
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function esqueciMinhaSenha(email) {
    try {
      const response = await fetch(`${path_api}/api/esqueciMinhaSenha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar e-mail');
      }

      const data = await response.json();
      
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


	async function verifyTokenStatus(accessToken) {
		try {
			if (!accessToken) {
				throw new Error("Nenhum token de acesso disponível");
			}

			const response = await fetch(`${path_api}/api/verifyToken`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error("Falha ao verificar o token");
			}

			const data = await response.json();

			return data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	/**
	 * @param {string} accessToken
	 * @returns {Promise<{permissions: string[]}>}
	 */
	async function getPermissions(accessToken) {
		try {
			if (!accessToken) {
				throw new Error("Nenhum token de acesso disponível");
			}

			const response = await fetch(`${path_api}/api/getPermissions`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error("Falha ao verificar o token");
			}

			const data = await response.json();

			return data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	return {
		login,
		redefinirSenha,
		esqueciMinhaSenha,
		verifyTokenStatus,
		getPermissions,
	};
});
