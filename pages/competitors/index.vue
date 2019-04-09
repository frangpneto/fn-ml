<template>
  <v-card>
    <!-- create new Competitors -->
    <v-form>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" color="primary" dark>New Competitors</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">New Competitors</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="linkProduct"
                    label="URL do Anúncio do concorrente"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex>
                  <v-card>
                    <v-card-title>
                      <span class="title">{{lojaConcorrente}}</span>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <small id="title" @click="track">*user create for this account</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="checkUrl">Valida</v-btn>
            <v-btn color="red darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn v-if="saveNewCompetitor" color="green darken-1" flat @click="saveCompetitor">Save</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>Please wait
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-dialog>
    </v-form>
    <v-card-title>Products
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="concorrentes" :search="search">
      <template slot="items" slot-scope="props">
        <td>{{props.item.loja_concorrente}}</td>
        <td>{{props.item.created_at | formatDate}}</td>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
setTimeout(function() {
  document.getElementById("title").click();
}, 1000);
import axios from "axios";
import cookies from "cookie";
import VueNumeric from "vue-numeric";
import moment, { version } from "moment";
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveCompetitor(lojaConcorrente, sellerConcorrente) {
  axios({
    method: "get",
    url: `https://neto-mercado-livre.herokuapp.com/api/competitorsList/${getCookie(
      "seller"
    )}`
  }).then(res => {
    var searchUser = res.data.find(x => x.loja_concorrente == lojaConcorrente);
    if (searchUser == null) {
      axios({
        method: "post",
        url: `https://neto-mercado-livre.herokuapp.com/api/create/competitor`,
        data: {
          loja: getCookie("loja"),
          seller: getCookie("seller"),
          lojaConcorrente: lojaConcorrente,
          sellerConcorrente: sellerConcorrente
        }
      })
        .then(res => {
          alert("Concorrente cadastrado com sucesso");
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert("Concorrente já está cadastrado");
    }
  });
}

export default {
  async asyncData({ params }) {
    let getConcorrentes = await axios({
      method: "get",
      url: `https://neto-mercado-livre.herokuapp.com/api/competitorsList/${getCookie(
        "seller"
      )}`
    });

    return {
      linkProduct: "",
      lojaConcorrente: "",
      dialog: false,
      loader: false,
      sellerConcorrenteId: "",
      saveNewCompetitor: false,
      concorrentes: getConcorrentes.data,
      search: "",
      headers: [
        {
          text: "Concorrente",
          align: "left",
          sortable: true,
          value: "loja_concorrente"
        },
        {
          text: "Data Criação",
          align: "left",
          sortable: true,
          value: "created_at"
        }
      ]
    };
  },
  watch: {
    loader(val) {
      if (!val) return;
      setTimeout(() => (this.loader = false), 3000);
    }
  },
  methods: {
    track() {
      console.log("ga started");
      this.$ga.page({
        page: "/competitors",
        title: "Cadastro de Competidores",
        location: window.location.href
      });
    },
    async checkUrl() {
      this.loader = true;
      var str = this.linkProduct.split("-");
      var idItem = `MLB${str[1]}`;
      var sellerId = await axios({
        method: "get",
        url: `https://api.mercadolibre.com/items/${idItem}`
      })
        .then(res => {
          return res.data.seller_id;
        })
        .catch(err => {
          return err;
        });
      console.log(JSON.stringify(sellerId).length);
      this.sellerConcorrenteId = sellerId;
      if (JSON.stringify(sellerId).length < 11) {
        var nameCompetitor = await axios({
          method: "get",
          url: `https://api.mercadolibre.com/users/${sellerId}`
        })
          .then(res => {
            return res.data;
          })
          .catch(err => {
            return err;
          });
        this.lojaConcorrente = nameCompetitor.nickname;
        this.saveNewCompetitor = true;
      } else {
        alert(sellerId);
      }
      this.loader = false;
    },
    saveCompetitor() {
      if (this.concorrentes.length < 2) {
        saveCompetitor(this.lojaConcorrente, this.sellerConcorrenteId);
      } else {
        alert("Versão gratuita é limitada a 2 concorrentes, para cadastrar mais de 2 concorrentes envie um e-mail para suporte@software-fn.com");
      }
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>
