<template>
  <div class="content">
    <div class="row">
      <div class="col back-circle">
          <a href="/inicio"><img src="../../assets/images/icons/back_circle.svg" /></a>
      </div>
      <div class="col-9">
        <h2>Produtos</h2>
      </div>
      <div class="col-2 button-add-prod">
        <!-- <Button class="button-add-prod" @click="goToEditor('new')" severity="success" outlined><i class="pi pi-plus-circle"></i>Cadastrar Novo</Button> -->
        <Button class="button-add-prod" @click="openNewDialog" severity="success" outlined><i class="pi pi-plus-circle"></i>Cadastrar Novo</Button>
      </div>
    </div>
    <div class="row">
      <div class="col back-circle">
      </div>
      <div class="col-12">
        <Breadcrumb :home="home" :model="items" />
      </div>
    </div>
    <div class="border-table">
      <DataTable :value="produtos" class="custom-table" tableStyle="text-align:center" paginator :rows="10">
        <Column field="id" header="ID"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="valor_compra" header="Valor Compra"></Column>
        <Column field="valor_venda" header="Valor Venda"></Column>
        <Column field="imagem" header="Imagem"></Column>
        <Column field="created_at" header="Data de Criação">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.created_at) }}
          </template>
        </Column>
        <Column field="updated_at" header="Data de Modificação">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.updated_at) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <!-- Incluir o componente New.vue -->
    <New ref="newDialog" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import New from './New.vue'; // Importa o componente New.vue

// Importa os Stores
import { StoreProducts } from '../../store/Products/StoreProducts';

export default {
  components: {
    New // Declara o componente
  },
  setup(){
        const router = useRouter()
    },
  data() {
    return {
      items: [
          {
            label: 'Início',
            command: () => {
              this.$router.push('/inicio');
            }
          },      
          {
            label: 'Produtos',
            command: () => {
              this.$router.push('/products');
            }
          }
        ],
        produtos: []
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    async goToEditor(page){
      const novaRota = `${this.$router.currentRoute.value.path}/${page}`;

      // Navegando para a nova rota
      await this.$router.push({ path: novaRota });
    },
    async getData() {
      const accessToken = Cookies.get('access_token');
      const store = StoreProducts();
      this.produtos = await store.getDataStore(accessToken);

      console.log('this.produtos: ', this.produtos)
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy HH:mm:ss');
    },
    openNewDialog() {
      this.$refs.newDialog.openDialog();
    }
  }
};
</script>

<style scoped>
  
  .button-add-prod button {
    width: 100%;
    height: 80%;
    /* font-size: 16px; */
    /* color: #414141; */
    /* background-color: #FFFFFF; */
    border-radius: 50px;
    /* border: 0.5px solid #CBCFDD; */
  }

  .button-add-prod i {
    width: 1.5rem;
    margin-right: 5px;
    /* margin-bottom: 5px; */
  }

  /* button.add-prod-button:hover {
    color: #FFF;
    background-color: #562873;
  } */
</style>