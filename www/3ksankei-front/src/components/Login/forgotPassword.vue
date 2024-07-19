<template>
    <Toast />
    <div class="login-container">
      <div class="content-center">
        <div class="ts-login-logo">
          <img src="../../assets/images/logos/primary_color_tagline.png">
          <h2>Informe o seu e-mail</h2>
        </div>
        <div class="container-login">
            <div class="form-group">
                <div class="icon-input">
                    <i class="pi pi-user"></i>
                    <input class="form-control border-default" type="text" placeholder="Digite seu E-mail" ref="inputEmail" v-model="email">
                </div>
                <small v-if="showErrorEmail" class="help-span">Preencha o campo acima</small>
            </div>
            <div class="form-group">
                <button @click="clickSend" class="login-button">Enviar</button>
            </div>
        </div>
      </div>
    </div>
    <Footer />
  </template>

<script>
    import Footer from '../../components/Footer.vue';
    import { useAuth } from '../../store/Autenticacao/auth';

    export default {
        name: 'ForgotPassword',
        data() {
            return {
            email: '',
            showErrorEmail: false,
            }
        },
        components: {
            Footer,
        },
        methods: {
          async clickSend() {
            const auth = useAuth();
            
            try {
              
              this.showErrorEmail = false;

              if(this.email.trim() === '' && this.email.trim() === ''){
                this.showErrorEmail = true;
              }

              if ( this.showErrorEmail) {
                this.$toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, revise todos os campos.', life: 5000 });
                if (this.showErrorEmail) {
                    this.$nextTick(() => {
                        this.$refs.inputEmail.focus();
                    });
                } 
                return;
              }

              this.showErrorEmail = false;

              const data = await auth.esqueciMinhaSenha(this.email);

              this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'E-mail enviado com sucesso', life: 3000 });
                setTimeout(function(){
                    window.location.href = '/login';
                }, 3000)

            } catch (error) {
              console.error('Falha ao enviar e-mail:', error);
              this.$toast.add({ severity: 'error', summary: 'Erro', detail: error, life: 3000 });
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

</style>