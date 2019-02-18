<template>
  <v-card>
    <v-card-title>
      Users
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
    :headers="headers"
    :items="users"
    :search="search"  >

      <template justify-center slot="items" slot-scope="props">
        <td>{{props.item.userId}}</td>
        <td>{{props.item.loja}}</td>
        <td>{{props.item.email}}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
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
      users: getUsers.data,
      search: '',
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
  methods: {

    }
};
</script>
