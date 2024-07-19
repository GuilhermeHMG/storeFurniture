<template>
  <aside :class="sidebarClasses" @mouseenter="handleMenuMouseEnter" @mouseleave="handleMenuMouseLeave">
    <div class="menu-custom">
      <div class="menu-items">
        <PanelMenu v-model:expandedKeys="expandedKeys" :model="items"/>
      </div>
    </div>
    <div class="button-signout">
      <button @click="handleLogout" class="logout-button btn btn-light btn-sm">
        <i class="fa-solid fa-right-to-bracket"></i>
        SAIR
      </button>
    </div>
  </aside>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Menu',
  data() {
    return {
      expandedKeys: {},
      is_expanded: false,
      items: [
        {
          key: '0',
          label: 'Início',
          icon: 'fa-solid fa-house',
          command: () => {
            this.$router.push('/inicio');
          }
        },
        {
          key: '1',
          label: 'Produtos',
          icon: 'pi pi-box',
          items: [
            {
              key: '1_0',
              label: 'Gerenciar Produtos',
              command: () => {
                this.$router.push('/products');
              }
            }
          ]
        },
        {
          key: '2',
          label: 'Vendas',
          icon: 'pi pi-cart-plus',
          items: [
            {
              key: '2_0',
              label: 'Relatório de Vendas',
              command: () => {
                this.$router.push('/sales');
              }
            },
            {
              key: '2_1',
              label: 'Cadastro de Venda',
              command: () => {
                this.$router.push('/sales/new');
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    sidebarClasses() {
      return {
        'is-expanded': this.is_expanded,
      };
    },
  },
  methods: {
    toggleSidebar() {
      this.is_expanded = !this.is_expanded;
      this.updateContentClass();
    },
    handleMenuMouseEnter() {
      this.is_expanded = true;
      this.updateContentClass();
    },
    handleMenuMouseLeave() {
      this.is_expanded = false;
      this.updateContentClass();
      this.expandedKeys = {};
    },
    updateContentClass() {
      const contentElement = document.getElementById('content');
      if (contentElement) {
        if (this.is_expanded) {
          contentElement.classList.remove('content');
          contentElement.classList.add('content-right');
        } else {
          contentElement.classList.remove('content-right');
          contentElement.classList.add('content');
        }
      }
    },
    async handleLogout() {
      try {
        const contentElement = document.getElementById('content');
        contentElement.classList.remove('content-right');
        contentElement.classList.add('content');

        Cookies.remove('access_token');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  }
};
</script>

<style scoped>
  .toggle-button {
    align-self: flex-end;
    border: none;
    margin-top: 5px;
    padding: 0px 20px;
    cursor: pointer;
  }

  .toggle-button:hover {
    background-color: #01548C;
  }

  aside {
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    background-color: #01548C;
    border-right: 1px solid #01548C;
    width: calc(2rem + 20px);
    min-height: 100vh;
    overflow: hidden;
    padding: 0rem;
    padding-top: 5rem;
    transition: 0.1s ease-out;

    .button-signout {
      position: fixed;
      bottom: 40px;
      background-color: #01548C;
    }
    .button-signout button {
      width: 40px;
      font-size: 18px;
      color: #e30613;
      background-color: #E6E6E0;
      font-weight: bold;
      border-radius: 0%;
      overflow: hidden;
    }

    .logout-button {
      width: 2px;
    }

    &.is-expanded {
      width: 250px;
      .button-signout {
        position: fixed;
        margin-top: 80.9vh;
      }
      .button-signout button {
        width: 237px;
      }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

.menu-custom {
  display: flex;
  margin-top: -47px;
}

.menu-items {
  width: 200rem;
}

:deep(.p-panelmenu .p-menuitem-icon:first-child) {
  color: #01548C;
  width: 38px;
  background-color: #E6E6E0;
  padding: 8px;
  margin-left: -8px;
  border-radius: 50%; 
  box-sizing: border-box;
}

:deep(.p-panelmenu .p-panelmenu-header) {
  background-color: #341945;
  font-weight: normal;
  width: 100%;
}

:deep(.p-panelmenu .p-panelmenu-header-content) {
  border: none;
  width: 100%;
}

:deep(.p-panelmenu .p-panelmenu-header a) {
  background-color: #01548C;
  color: #E6E6E0;
  font-weight: normal;
  font-size: 20px;
}

:deep(.p-panelmenu .p-panelmenu-header .p-icon) {
  order: 2;
  margin-left: 200px;
  position: absolute;
}

:deep(.p-panelmenu .p-panelmenu-header a:hover) {
  background-color: #01548C;
}

:deep(.p-panelmenu .p-panelmenu-content) {
  background-color: #01548C;
  color: #E6E6E0;
  border: none;
  margin-left: 10px;
}

:deep(.p-panelmenu .p-menuitem) {
  background-color: #01548C;
}

:deep(.p-panelmenu .p-menuitem a:hover) {
  background: #01548C;
}

:deep(.p-panelmenu .p-menuitem-content .p-menuitem-text) {
  background: #01548C;
  color: #E6E6E0;
  font-size: 14px;
}

:deep(.p-panelmenu .p-menuitem-text) {
  font-size: 16px;
  margin-top: -10px;
  margin-bottom: -10px;
}

:deep(.p-panelmenu .p-menuitem-text:hover) {
  background: #01548C;
}

:deep(.p-menuitem-content:hover) {
  background: #01548C;
}

:deep(.p-panelmenu .p-panelmenu-header .router-link-active) {
  background: #01548C !important;
}

:deep(.p-panelmenu .p-panelmenu-header .router-link-active .p-menuitem-text) {
  margin: 0;
}

:deep(.p-panelmenu .p-panelmenu-content .router-link-active) {
  background: #01548C !important;
}

:deep(.p-panelmenu .p-menuitem-icon) {
  margin-right: 17px;
  font-size: 20px;
}

:deep(.router-link-active .p-menuitem-text:hover) {
  background-color: #01548C !important;
  color: #341945 !important;
}

:deep(.p-panelmenu .p-menuitem-header-content) {
  background-color: #341945;
  border: none;
}

.button-signout {
  margin: 0.3rem;
  background-color: #01548C;
}

.button-signout i {
  margin-top: 3px;
  margin-left: 4px;
  margin-right: 70px;
}

.button-signout button {
  width: auto; /* Removendo a largura total */
  display: flex;
  align-items: center; /* Alinhando o texto e o ícone verticalmente */
  font-size: 18px;
  color: #E30613;
  background-color: #FFFFFF;
  font-weight: bold;
  border-radius: 2px !important;
}

.logout-button:hover {
  background-color: #E30613 !important;
  color: #E6E6E0 !important;
  border-color: #E30613;
}

</style>

<style>
  .content {
    align-items: center;
    justify-content: center;
    padding-top: 45px;
    padding-left: 35px;
    width: 98%;
    transition: 0.1s ease-out;
  }

  .content .btn-filter-custom-1 {
    margin-right: 2.7%;
  }

  .content .btn-filter-custom-2 {
    margin-right: 2%;
  }

  .content-right {
    align-items: left;
    justify-content: left;
    padding-top: 45px;
    padding-left: 233px;
    width: 98%;
    transition: 0.1s ease-out;
  }

  .content-right .btn-filter-custom-1 {
    margin-right: 7.9%;
  }

  .content-right .btn-filter-custom-2 {
    margin-right: 7%;
  }
</style>