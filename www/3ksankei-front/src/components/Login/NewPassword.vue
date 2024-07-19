<template>
  <Toast />
  <div class="login-container">
    <div class="content-center">
      <div class="ts-login-logo">
        <img src="../../assets/images/logos/primary_color_tagline.png">
        <h2>Trocar senha</h2>
      </div>
      <div class="container-login">
        <div class="form-group">
          <label :class="{ 'all-requirements-met-text': allRequirementsMet, 'all-requirements-not-met-text': !allRequirementsMet, 'required-field': true }">Nova Senha</label>
          <div class="icon-input">
            <i class="pi pi-lock"></i>
            <div class="custom-eye">
              <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'" @click="toggleShowPassword"></i>
            </div>
            <input :type="showPassword ? 'text' : 'password'" :class="{'form-control': true, 'input-password': true, 'all-requirements-met': allRequirementsMet, 'all-requirements-not-met': !allRequirementsMet}" type="text" placeholder="Digite sua senha" v-model="pass" @input="checkPasswordRequirements">
          </div>
          <div class="password-requirements">
            <div v-if="!isLengthValid">
              <p :class="{ 'invalid': !isLengthValid, 'valid': isLengthValid }">
                - Deve conter no mínimo 8 caracteres.
              </p>
            </div>
            <div v-if="!hasUppercaseLetter">
              <p :class="{ 'invalid': !hasUppercaseLetter, 'valid': hasUppercaseLetter }">
                - Deve conter pelo menos uma letra maiúscula.
              </p>
            </div>
            <div v-if="!hasLowerCaseLetter">
              <p :class="{ 'invalid': !hasLowerCaseLetter, 'valid': hasLowerCaseLetter }">
                - Deve conter pelo menos uma letra minúscula.
              </p>
            </div>
            <div v-if="!hasNumber">
              <p :class="{ 'invalid': !hasNumber, 'valid': hasNumber }">
                - Deve conter pelo menos um número.
              </p>
            </div>
            <div v-if="!hasSpecialCharacter">
              <p :class="{ 'invalid': !hasSpecialCharacter, 'valid': hasSpecialCharacter }">
                - Deve conter pelo menos um caractere especial.
              </p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div v-if="allRequirementsMet">
            <label :class="{ 'invalid': !isPasswordConfirmed, 'valid': isPasswordConfirmed, 'required-field': true }">Confirmar Nova senha</label>
            <div class="icon-input">
              <i class="pi pi-lock"></i>
              <div class="custom-eye">
                <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'" @click="toggleShowPassword"></i>
              </div>
              <input :type="showPassword ? 'text' : 'password'" :class="{'form-control': true, 'input-password': true, 'all-requirements-met': isPasswordConfirmed, 'all-requirements-not-met': !isPasswordConfirmed}" placeholder="Confirme sua senha" v-model="retryPass" @input="checkPasswordConfirmed">
            </div><br/>
          </div>
          <div v-if="isPasswordConfirmed" class="form-group">
            <button class="login-button" @click="handleSave">Trocar Senha</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<script>
    import Footer from '../../components/Footer.vue';
    import { useAuth } from '../../store/Autenticacao/auth';
    import Cookies from 'js-cookie';

    export default {
        name: 'RedenifirSenha',
        data() {
            return {
            pass: '',
            retryPass: '',
            showPassword: false,
            isLengthValid: false,
            hasSpecialCharacter: false,
            isPasswordConfirmed: false,
            isDisabled: true,
            hasUppercaseLetter: false,
            hasNumber: false,
            hasLowerCaseLetter: false,
            allRequirementsMet: false
            }
        },
        components: {
            Footer,
        },
        methods: {
          async handleSave() {

            const auth = useAuth();
            try {
              const accessToken = Cookies.get('access_token');
              const data = await auth.redefinirSenha(this.pass, this.retryPass, accessToken);

              if(data.email_verified_at){
                this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Nova senha criada com sucesso', life: 3000 });
                setTimeout(function(){
                    window.location.href = '/login';
                }, 3000)
              }

            } catch (error) {
              console.error('Falha ao alterar senha:', error);
              this.$toast.add({ severity: 'error', summary: 'Erro', detail: error, life: 3000 });
            }
          },  
          toggleShowPassword() {
              this.showPassword = !this.showPassword;
          },
          checkPasswordRequirements() {
            this.isLengthValid = this.pass.length >= 8;
            this.hasUppercaseLetter = /[A-Z]/.test(this.pass);
            this.hasLowerCaseLetter = /[a-z]/.test(this.pass);
            this.hasNumber = /\d/.test(this.pass);
            this.hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(this.pass);

            this.allRequirementsMet = this.isLengthValid && this.hasUppercaseLetter && this.hasNumber && this.hasSpecialCharacter;
          },

          checkPasswordConfirmed() {
            this.isPasswordConfirmed = this.allRequirementsMet && this.pass !== '' && this.pass === this.retryPass;
            if (this.isPasswordConfirmed) {
                this.isDisabled = false;
            }
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
  align-items: center;
  text-align: center;
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
  position: absolute; left: 88%; top: 50%; transform: translateY(-50%); cursor: pointer; color: #8F9CC0;
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
  width: 100%;
  height: 40px;
  background-color: #411F56;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}

button.login-button:hover {
  border-color: #F15A29;
  background-color: #674C78;
}
.password-requirements {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  font-size: 12px;
}
.invalid {
  color: red !important;
}
.valid {
  color: green !important;
}
.all-requirements-met{
  border-color: green;
}
.all-requirements-met-text {
  color: green;
}
.all-requirements-not-met {
  border-color: red;
}
.all-requirements-not-met-text {
  color: red;
}
.required-field {
  font-size: 16px;
}
  .senha-label {
    margin-right: 10px;
  }
</style>