<template>
  <v-data-table
    :headers="headers"
    :items="filteredCreadores"
    class="elevation-1">

    <!--Barra superior-->
    <template v-slot:top>

      <!--Dentro de la barra superior-->
      <v-toolbar flat color="indigo-lighten-5">
        <v-toolbar-title class="text-purple-darken-3"><h4>Autores y sus Publicaciones</h4></v-toolbar-title>

        <v-spacer />
        <v-divider :thickness="3" color="teal-darken-3" class="mx-4" inset vertical />

        <!--ESPACIO DIVISOR PARA BUSQUEDA-->
        <v-dialog v-model="dialogSearch" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="purple-darken-4" dark v-bind="props">
              <h4>
            <v-icon class="me-2">
              mdi-magnify
            </v-icon>
              Buscar Elemento
            </h4>
            </v-btn>
          </template>

          <!--Edicion de elemento existente o nuevo-->
          <v-card>
            <v-card-title>
              <span class="text-h5">Buscar Elemento</span>
            </v-card-title>

            <!--Editor de elemento-->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="text-purple-darken-3">
                    <v-text-field v-model="searchQuery" label="Buscar" dense />
                  </v-col>
                </v-row>

                <v-radio-group v-model="inline" inline>
                <v-row>

                  <v-col class="text-indigo-darken-4">
                    <v-radio label="Autor" value="radioAutor" />
                  </v-col>

                  <v-col class="text-blue-darken-4">
                    <v-radio label="Título" value="radioTitulo" />
                  </v-col>

                  <v-col class="text-light-blue-darken-4">
                    <v-radio label="Post" value="radioPost" />
                  </v-col>

                  <v-col class="text-purple-darken-4">
                    <v-radio label="Todos" value="radioTodos" />
                  </v-col>

              </v-row>
              </v-radio-group>
              </v-container>
            </v-card-text>

            <!--Buscar elemento-->
            <v-card-actions>
              <v-spacer/>
              <v-btn color="purple-darken-1" variant="text" @click="closeSearch">
                <v-icon class="me-2">
                  mdi-magnify
                </v-icon>
                Buscar
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
        <!--ESPACIO DIVISOR PARA BUSQUEDA-->

        <v-divider :thickness="3" color="teal-darken-3" class="mx-4" inset vertical />

        <!--Boton Reinicio-->
        <v-btn color="light-blue-darken-4" @click="initialize">
            <h4>
            <v-icon class="me-2">
              mdi-restart
            </v-icon>
              Reiniciar
            </h4>
        </v-btn>

        <v-divider :thickness="3" color="teal-darken-3" class="mx-4" inset vertical />

        <!--Boton Nuevo Elemento-->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="light-green-darken-4" dark v-bind="props">
              <h4>
            <v-icon class="me-2">
              mdi-pen-plus
            </v-icon>
              Nuevo Elemento
            </h4>
            </v-btn>
          </template>

          <!--Edicion de elemento existente o nuevo-->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formtitleElement }}</span>
            </v-card-title>

            <!--Editor de elemento-->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="text-indigo-darken-4">
                    <v-text-field v-model="editedItem.autorName" label="Autor" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="text-blue-darken-4">
                    <v-text-field v-model="editedItem.title" label="Título" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="text-light-blue-darken-4">
                    <v-text-field v-model="editedItem.post" label="Post" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <!--Confirmacion de editor de elemento-->
            <v-card-actions>
              <v-spacer/>
              <v-btn color="red-darken-4" variant="text" @click="close">
                <v-icon class="me-2">
                  mdi-cancel
                </v-icon>
                Cancelar
              </v-btn>
              <v-btn color="purple-darken-1" variant="text" @click="save">
                <v-icon class="me-2">
                  mdi-content-save
                </v-icon>
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-divider :thickness="3" color="teal-darken-3" class="mx-4" inset vertical />

        <!--Confirmacion de eliminacion de elemento-->
        <v-dialog v-model="dialogDeleteItem" max-width="500px" class="text-center">
          <v-card>
            <v-card-title class="text-h5">¿Eliminar este elemento?</v-card-title>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="green-darken-4" variant="text" @click="closeDeleteItem">
                <v-icon class="me-2">
                  mdi-cancel
                </v-icon>
                Cancelar
              </v-btn>
              <v-btn color="red-darken-4" variant="text" @click="deleteItemConfirm">
                <v-icon class="me-2">
                  mdi-delete
                </v-icon>
                Eliminar
              </v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <!--Columna de Acciones-->
    <template v-slot:item.actions="{ item }" >

      <v-icon size="small" class="me-2" color="cyan-darken-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" color="red-darken-2" @click="deleteItem(item.raw)">
        mdi-delete
      </v-icon>
    </template>

    <!--Sin datos en la tabla-->
    <template v-slot:no-data>
      <b style='color:#9d19529c'>¡Sin datos!</b>
    </template>

  </v-data-table>
</template>

<script>
import { ref } from 'vue';

const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlAutores = "https://jsonplaceholder.typicode.com/users";

const headers = [
  { title: 'Autor', key: 'autorName', align: 'justify', class: "text-amber"},
  { title: 'Titulo', key: 'title', align: 'justify' },
  { title: 'Post', key: 'post', align: 'justify' },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
];

const defaultItem = {
  autorName: '',
  title: '',
  post: '',
};

export default {
  data() {
    return {
      dialog: false,
      dialogDeleteItem: false,
      dialogSearch: false, //Cuadro de dialogo para busqueda
      searchQuery: '',
      headers: headers,
      creadores: ref([]),
      filteredCreadores: ref([]),
      editedIndex: -1,
      editedItem: { ...defaultItem },
      defaultItem: { ...defaultItem },
      autoresMap: {}, // Un mapeo de userId a nombres de autores
      column: null,
      inline: null,
    };
  },

  computed: {
    formtitleElement() {
      return this.editedIndex === -1 ? 'Nuevo Elemento' : 'Editar Elemento';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDeleteItem(val) {
      val || this.closeDeleteItem();
    },
    dialogSearch(val){
      val || this.closeSearch();
    }
  },

  methods: {
    async initialize()
    {
      await fetch(urlAutores)
        .then((response) => response.json())
        .then((data) =>
        {
          // Crear un mapeo de userId a nombres de autores
          data.forEach((autor) =>
          {
            this.autoresMap[autor.id] = autor.name;
          });
        });

      await fetch(urlPosts)
        .then((response) => response.json())
        .then((data) =>
        {
          this.creadores = data.map((post) =>
          ({
            autorName: this.autoresMap[post.userId], // Usar el mapeo para obtener el nombre del autor
            title: post.title,
            post: post.body,
          }));
          this.filteredCreadores = this.creadores;
        });
      console.log("Datos Obtenidos");
    },

    editItem(item) {
      this.editedIndex = this.creadores.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.creadores.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDeleteItem = true;
    },

    //Funcion de apertura de busqueda

    deleteItemConfirm() {
      this.creadores.splice(this.editedIndex, 1);
      this.closeDeleteItem();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDeleteItem() {
      this.dialogDeleteItem = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeSearch(){
      this.dialogSearch = false;
      this.$nextTick(() => {
        this.search();
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.creadores[this.editedIndex], this.editedItem);
      } else {
        this.creadores.push({ ...this.editedItem });
      }
      this.close();
    },

    search() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredCreadores = this.creadores.filter((creador) => {
      // Filtra los elementos que contienen la consulta en el autor, título o post.
      if(this.inline === "radioAutor")
        return (creador.autorName.toLowerCase().includes(query));

      else if(this.inline === "radioTitulo")
        return (creador.title.toLowerCase().includes(query));

      else if(this.inline === "radioPost")
        return (creador.post.toLowerCase().includes(query));

      else
        return (
          creador.autorName.toLowerCase().includes(query) ||
          creador.title.toLowerCase().includes(query) ||
          creador.post.toLowerCase().includes(query)
        );
    })
  },
  },

  created() {
    this.initialize();
  },
};
</script>
