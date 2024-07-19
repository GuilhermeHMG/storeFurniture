<template>
  <div class="">
      <Header v-if="!hideMenu" />
          <div class="div-default">
              <div v-if="!hideMenu" class="app">
                  <Menu />
              </div>
              <div v-if="hideMenu" class="content-login" :style="{ 'justify-content': hideMenu ? 'center' : 'unset', 'display': hideMenu ? 'flex' : 'unset' }">
                  <router-view></router-view>
              </div>
              <div v-else class="content" id="content" :style="{ 'justify-content': hideMenu ? 'center' : 'unset', 'display': hideMenu ? 'flex' : 'unset' }">
                  <router-view></router-view>
              </div>
          </div>
      <Footer v-if="!hideMenu" />
  </div>
</template>

<script>
//    import { useAuth } from './store/Autenticacao/auth';
    import Menu from './components/partials/Menu.vue';
    import Header from './components/partials/Header.vue';
    import Footer from './components/partials/Footer.vue';
    import Cookies from 'js-cookie';
    import PanelMenu from 'primevue/panelmenu';
    import { ref, computed, watch, onBeforeMount, onMounted } from "vue";
    import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'MainApp',
    components: {
        PanelMenu,
        Menu,
        Header,
        Footer
    },
    setup() {
        const route = useRoute();
        const hideMenu = ref(true);

        watch(route, (newRoute) => {
            hideMenu.value = newRoute.name === 'Login' || 
                             newRoute.name === 'EsqueciMinhaSenha' ||
                             newRoute.name === 'RedefinirSenha';
        });

        return {
            hideMenu
        };
    },
    data() {
        return {}  
    },
    methods: {
        async handleLogout() {
            try {
                Cookies.remove('access_token');
                this.$router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    },
  };
</script>

<style scoped>

  .div-default {
    display: inline-flex;
    width: 100%;
  }

  .app {
    position: fixed;
    z-index: 9;
  }

  .content-login {
    align-items: center;
    justify-content: center;
    padding-top: 45px;
    padding-left: 35px;
    width: 98%;
    transition: 0.1s ease-out;
  }

</style>
