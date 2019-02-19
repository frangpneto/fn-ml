<template>
  <v-layout row wrap>
    <v-flex>
      <v-card>
        <!-- create new user -->
        <v-form>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="primary" dark>New User</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">New user</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="email" label="Email*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="pass" label="Password*" type="password" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>*user create for this account</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="green darken-1" flat @click="saveUser">Save</v-btn>
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

        <!-- -->
        <v-card-title>Users
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="users"
          :pagination.sync="pagination"
          :search="search"
          select-all
          item-key="userId"
          class="elevation-1"
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th>
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  primary
                  hide-details
                  @click.stop="toggleAll"
                ></v-checkbox>
              </th>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template justify-center slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
              </td>
              <td>{{props.item.userId}}</td>
              <td>{{props.item.loja}}</td>
              <td>{{props.item.email}}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>
        <v-btn
          :disabled="loader"
          :loading="loader"
          class="white--text"
          color="red darken-2"
          @click="removerUser"
        >Remove Users</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- Modal to create new user -->
</template>

<script>
import axios from "axios";
import cookies from "cookie";
import VueNumeric from "vue-numeric";
import moment, { version } from "moment";
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
function removerUser(idUser) {
  for (const id of idUser) {
    console.log(id.userId);
    if (id.email != getCookie("usuario")) {
      axios({
        method: "post",
        url: `https://neto-mercado-livre.herokuapp.com/api/remove/user/${
          id.userId
        }`
      })
        .then(res => {
          //alert(res)
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert("Você não pode excluir seu próprio usuário");
    }
  }
}
function saveUser(email, pass) {
  axios({
    method: "post",
    url: `https://neto-mercado-livre.herokuapp.com/api/get/user/${getCookie(
      "seller"
    )}`
  })
    .then(res => {
      var searchUser = res.data.find(x => x.email == email);
      if (searchUser == null) {
        axios({
          method: "post",
          url: `https://neto-mercado-livre.herokuapp.com/api/create/user/${getCookie(
            "seller"
          )}`,
          data: {
            user: email,
            pass: pass
          }
        })
          .then(res => {
            alert("Usuário cadastrado com sucesso");
          })
          .catch(err => {
            alert(err);
          });
      } else {
        alert("Usuário já cadastrado");
      }
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
}
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

export default {
  async asyncData({ params }) {
    let getUsers = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/get/user/${getCookie(
        "seller"
      )}`
    });
    return {
      pagination: {
        sortBy: "name"
      },
      selected: [],
      email: "",
      pass: "",
      loader: false,
      dialog: false,
      users: getUsers.data,
      search: "",
      headers: [
        {
          text: "User ID",
          align: "left",
          sortable: true,
          value: "userId"
        },
        {
          text: "Loja",
          align: "left",
          sortable: true,
          value: "loja"
        },
        {
          text: "E-mail",
          align: "left",
          sortable: true,
          value: "email"
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
    saveUser() {
      if (this.email.search("@") > 0) {
        if (this.email != "" && this.pass != "") {
          saveUser(this.email, this.pass);
        } else {
          alert("email e senha são campos obrigatórios");
        }
      }
      else{
        alert('o campo e-mail é inválido')
      }
    },
    removerUser() {
      (this.loader = true), removerUser(this.selected);
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.users.slice();
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
