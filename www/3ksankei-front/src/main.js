import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Icones
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema do PrimeVue
import 'primevue/resources/primevue.min.css'; // Core CSS do PrimeVue
import 'primeicons/primeicons.css'; // Ícones do PrimeVue
import Avatar from 'primevue/avatar'; // Ícones de avatar do PrimeVue
import PanelMenu from 'primevue/panelmenu'; // Painel do menu
import Breadcrumb from 'primevue/breadcrumb'; // Navegação sobre hierarquia de páginas
import DataTable from 'primevue/datatable'; // Tabelas
import Column from 'primevue/column'; //Colunas da tabela
import ProgressBar from 'primevue/progressbar'; // Barra de progresso
import Toast from 'primevue/toast'; // Pop-up de mensagens
import Dialog from 'primevue/dialog'; //Modals
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask'; // Máscara dos inputs
import MultiSelect from 'primevue/multiselect'; // Multi-seleção
import Sidebar from 'primevue/sidebar'; //Painel lateral
import Checkbox from 'primevue/checkbox'; // Checkbox
import Button from 'primevue/button'; // Botões
import Accordion from 'primevue/accordion'; // Mostra e oculta campos de formulário
import AccordionTab from 'primevue/accordiontab'; // Mostra e oculta campos de formulário
import RadioButton from 'primevue/radiobutton'; // Radio para check
import VueTheMask from 'vue-the-mask'; // Diretiva para utilizar as mascaras nos componentes
import Chart from 'primevue/chart';
import Tree from 'primevue/chart';
import ProgressSpinner from 'primevue/progressspinner'; // Animação de rotação infinita

// CSS
import './assets/style.css';

const app = createApp(App);

app.component('Avatar',Avatar);
app.component('PanelMenu', PanelMenu);
app.component('Breadcrumb', Breadcrumb);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ProgressBar', ProgressBar);
app.component('Toast', Toast);
app.component('Dialog', Dialog);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);
app.component('MultiSelect', MultiSelect);
app.component('Sidebar', Sidebar);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('RadioButton', RadioButton);
app.component('Chart', Chart);
app.component('Tree', Tree);
app.component('ProgressSpinner', ProgressSpinner);

// Pinia state management
const pinia = createPinia();
app.use(pinia);

// PrimeVue UI components
app.use(PrimeVue, { 
    ripple: true, 
    locale: {
        "startsWith": "Começa com",
        "contains": "Contém",
        "notContains": "Não contém",
        "endsWith": "Termina com",
        "equals": "Igual",
        "notEquals": "Diferente",
        "noFilter": "Sem Filtro",
        "lt": "Menor que",
        "lte": "Menor ou igual a",
        "gt": "Maior que",
        "gte": "Maior ou igual a",
        "dateIs": "Data é",
        "dateIsNot": "Data não é",
        "dateBefore": "Data é antes",
        "dateAfter": "Data é depois",
        "clear": "Limpar",
        "apply": "Aplicar",
        "matchAll": "Corresponder Todos",
        "matchAny": "Corresponder Qualquer",
        "addRule": "Adicionar Regra",
        "removeRule": "Remover Regra",
        "accept": "Sim",
        "reject": "Não",
        "choose": "Escolher",
        "upload": "Upload",
        "cancel": "Cancelar",
        "completed": "Concluído",
        "pending": "Pendente",
        "dayNames": ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        "dayNamesMin": ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
        "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        "chooseYear": "Escolher Ano",
        "chooseMonth": "Escolher Mês",
        "chooseDate": "Escolher Data",
        "prevDecade": "Década Anterior",
        "nextDecade": "Próxima Década",
        "prevYear": "Ano Anterior",
        "nextYear": "Próximo Ano",
        "prevMonth": "Mês Anterior",
        "nextMonth": "Próximo Mês",
        "prevHour": "Hora Anterior",
        "nextHour": "Próxima Hora",
        "prevMinute": "Minuto Anterior",
        "nextMinute": "Próximo Minuto",
        "prevSecond": "Segundo Anterior",
        "nextSecond": "Próximo Segundo",
        "am": "AM",
        "pm": "PM",
        "today": "Hoje",
        "weekHeader": "Sm",
        "firstDayOfWeek": 0,
        "dateFormat": "dd/mm/yy",
        "weak": "Fraco",
        "medium": "Médio",
        "strong": "Forte",
        "passwordPrompt": "Digite uma senha",
        "emptyFilterMessage": "Nenhum resultado encontrado",
        "searchMessage": "{0} resultados disponíveis",
        "selectionMessage": "{0} itens selecionados",
        "emptySelectionMessage": "Nenhum item selecionado",
        "emptySearchMessage": "Nenhum resultado encontrado",
        "emptyMessage": "Nenhuma opção disponível",
        "aria": {
            "trueLabel": "Verdadeiro",
            "falseLabel": "Falso",
            "nullLabel": "Não Selecionado",
            "star": "1 estrela",
            "stars": "{star} estrelas",
            "selectAll": "Todos itens selecionados",
            "unselectAll": "Todos itens desselecionados",
            "close": "Fechar",
            "previous": "Anterior",
            "next": "Próximo",
            "navigation": "Navegação",
            "scrollTop": "Rolar para o Topo",
            "moveTop": "Mover para o Topo",
            "moveUp": "Mover para Cima",
            "moveDown": "Mover para Baixo",
            "moveBottom": "Mover para o Fundo",
            "moveToTarget": "Mover para o Destino",
            "moveToSource": "Mover para a Fonte",
            "moveAllToTarget": "Mover Tudo para o Destino",
            "moveAllToSource": "Mover Tudo para a Fonte",
            "pageLabel": "{page}",
            "firstPageLabel": "Primeira Página",
            "lastPageLabel": "Última Página",
            "nextPageLabel": "Próxima Página",
            "prevPageLabel": "Página Anterior",
            "rowsPerPageLabel": "Linhas por página",
            "previousPageLabel": "Página Anterior",
            "jumpToPageDropdownLabel": "Pular para o Dropdown de Página",
            "jumpToPageInputLabel": "Pular para o Campo de Página",
            "selectRow": "Linha Selecionada",
            "unselectRow": "Linha Deselecionada",
            "expandRow": "Expandir Linha",
            "collapseRow": "Colapsar Linha",
            "showFilterMenu": "Mostrar Menu de Filtro",
            "hideFilterMenu": "Ocultar Menu de Filtro",
            "filterOperator": "Operador de Filtro",
            "filterConstraint": "Restrição de Filtro",
            "editRow": "Editar Linha",
            "saveEdit": "Salvar Edição",
            "cancelEdit": "Cancelar Edição",
            "listView": "Visualização em Lista",
            "gridView": "Visualização em Grade",
            "slide": "Deslizar",
            "slideNumber": "{slideNumber}",
            "zoomImage": "Ampliar Imagem",
            "zoomIn": "Aproximar",
            "zoomOut": "Afastar",
            "rotateRight": "Rotacionar para a Direita",
            "rotateLeft": "Rotacionar para a Esquerda"
        }
    }
});

// Router
app.use(router);

// Confirmation
app.use(ConfirmationService);

app.use(ToastService);

app.use(VueTheMask);

// Monta a aplicação
app.mount('#app');
