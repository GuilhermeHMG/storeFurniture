<template>
  <Dialog v-model:visible="visible" modal :style="{ width: '50vw'}">
    <template #header>
      <h3>Novo produto</h3>
      <button class="btn-close-custom-info" @click="visibleInfo = false"></button>
    </template><hr>

    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="name">Nome</label>
          <InputText id="name" type="text" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="name">Valor de Compra</label>
          <InputNumber id="name" />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="name">Valor de Venda</label>
          <InputNumber id="name" />
        </div>
      </div>
    </div>

  </Dialog>
</template>

<script>
import { useRouter } from 'vue-router';

// Importa os Stores
  import { StoreProducts } from '../../store/Products/StoreProducts';

export default {
  setup(){
        const router = useRouter()
    },
  data() {
      return {
        visible: false,
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
              },    
              {
                label: 'Cadastro de Produto',
                command: () => {
                  this.$router.push('/products/new');
                }
              }
          ]
      };
  },
  methods: {
    openDialog() {
      this.visible = true;
    }
  }
};
</script>

<style scoped>

  .btn-close-custom-info {
    border: none;
    margin-left: 35%;
    background-color: #FFF;
    color: #656565;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-close-custom-info {
    border: none;
    margin-left: 35%;
    background-color: #fff;
    color: #656565;
  } 

</style>