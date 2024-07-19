<template>
  <Toast />
  <div class="login-container">
    <div class="content-center">
      <div class="ts-login-logo">
        <img src="../../assets/images/icons/logo.png">
        <h2>Faça seu Login</h2>
      </div>
      <div class="container-login">
        <div class="form-group">
          <div class="icon-input">
            <i class="pi pi-user"></i>
            <input class="form-control border-default" type="text" placeholder="Digite seu E-mail" ref="inputUsername"
              v-model="username">
          </div>
          <small v-if="showErrorUsername" class="help-span">Preencha o campo acima</small>
        </div>
        <div class="form-group">
          <div class="icon-input">
            <i class="pi pi-lock"></i>
            <div class="custom-eye">
              <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'" @click="toggleShowPassword"></i>
            </div>
            <input v-if="showPassword" class="form-control border-default" type="text" ref="inputPassword"
              v-model="password">
            <input v-else class="form-control border-default" type="password" ref="inputPassword" v-model="password">
          </div>
          <small v-if="showErrorPassword" class="help-span">Preencha o campo acima</small>
          <!-- <a href="/esqueciMinhaSenha">Esqueceu sua Senha?</a> -->
        </div>
        <div class="form-group">
          <Button @click="handleLogin" class="btn btn-info login-button">Entrar</Button>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from '../partials/Footer.vue';
import { useAuth } from '../../store/Autentication/auth';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loginPage: true,
      showErrorUsername: false,
      showErrorPassword: false,
    }
  },
  components: {
    Footer,
  },
  beforeRouteEnter(to, from, next) {
    const redirectParam = to.query.redirect;
    if (redirectParam) {
      const chave = 'aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ';
      try {
        const tokenComEspacos = redirectParam.replace(/ /g, '+');
        const tokenDescriptografado = CryptoJS.AES.decrypt(tokenComEspacos, chave).toString(CryptoJS.enc.Utf8);

        Cookies.set('access_token', tokenDescriptografado, { expires: 7 });
        next('/inicio');
      } catch (error) {
        console.error('Erro ao descriptografar o token:', error);
        next();
      }
    } else {
      next();
    }
  },
  mounted: function () {
    Cookies.remove('access_token');
    Cookies.remove('login');
  },
  methods: {
    async clickLogin() {

      this.showErrorUsername = false;
      this.showErrorPassword = false;

      if (this.username.trim() === '' && this.username.trim() === '') {
        this.showErrorUsername = true;
      }

      if (this.password.trim() === '' && this.password.trim() === '') {
        this.showErrorPassword = true;
      }

      if (this.showErrorUsername) {
        this.$toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, revise todos os campos.', life: 5000 });
        if (this.showErrorUsername) {
          this.$nextTick(() => {
            this.$refs.inputUsername.focus();
          });
        }
        return;
      }

      if (this.showErrorPassword) {
        this.$toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, revise todos os campos.', life: 5000 });
        if (this.showErrorPassword) {
          this.$nextTick(() => {
            this.$refs.inputPassword.focus();
          });
        }
        return;
      }

      this.showErrorUsername = false;
      this.showErrorPassword = false;
      this.loginPage = false;
    },
    async handleLogin() {

      const auth = useAuth();
      try {        
        const data = await auth.login(this.username, this.password);

        Cookies.set('access_token', data.token, { expires: 7 })
        const accessToken = Cookies.get('access_token');
        console.log('accessToken', accessToken)

        if (accessToken == 'undefined') {
          console.log('erro')
          this.$toast.add({ severity: 'error', summary: 'Erro', detail: error, life: 3000 });
        }

        if (!data.email_verified) {
          this.$router.push('/redefinirSenha');
        }

        if (data.email_verified) {
          this.$router.push('/inicio?authenticated=true');
        }

      } catch (error) {
        console.error('Falha ao realizar login:', error);
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: error, life: 3000 });
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  }
}
</script>

<style scoped>

.ts-login-logo img {
  width: 420px;
  height: 239px;
  object-fit: contain;
}

h2 {
  color: #212121;
  font-size: 24px;
  font-weight: 200;
  line-height: 44px;
}

.container-login {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  text-align: left;
  width: 100%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 5%;
  width: 100%;
}

.form-group a {
  font-size: 10px;
}

.input-group-text {
  border: 1px solid #8F9CC0;
  border-radius: 0%;
}

input {
  width: 100%;
  border-radius: 0%;
}

.icon-input {
  position: relative;
}

.icon-input i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  color: #8F9CC0;
}

.icon-input input {
  padding-left: 50px;
}

.custom-eye {
  position: absolute;
  left: 88%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #8F9CC0;
}

.login-button {
  margin-top: 30px;
}

a {
  display: block;
  text-decoration: none;
  color: #411F56;
  margin-top: 10px;
  text-align: right;
}

input.form-control:hover {
  border-color: #2196F3;
  border-radius: none;
}

.login-button {
  margin-top: 30px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  background: linear-gradient(45deg, #07467e, #0b5fa8);
  color: #fff;
  border: none;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: linear-gradient(45deg, #0b5fa8, #07467e);
}

.title-login {
  justify-content: left;
}

.input-mask {
  font-size: 16px;
  margin-top: 10px;
  height: 40px;
}
</style>
