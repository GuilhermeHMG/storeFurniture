<template>
    <Toast class="toast-custom"/>
    <div class="container-flex">
        <div class="">
          <Dashboard />
        </div>
    </div>
  </template>
  
  <script>
  import Dashboard from '../../components/Home/Dashboard.vue';
  
  export default {
    components: {
      Dashboard,
    },
    name: 'Home',
    data() {
      return {
        authenticated:false,
      }  
    },
    mounted: function () {
      this.messageLogin();
    },
    methods: {
      async messageLogin() {
        this.authenticated = this.$router.currentRoute.value.query.authenticated
  
        if(this.authenticated){
  
          this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso', life: 3000 });
          const { authenticated, ...queryWithoutTk } = this.$router.currentRoute.value.query;
          this.$router.replace({ query: queryWithoutTk });
        }
      },
    }
  };
  </script>
  
  <style scoped>
  </style>
  