<template>
  <v-card>
    <v-card-title id="title" @click="track">
      Products
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" v-model="selected" :search="search">
      <template slot="items" slot-scope="props">
        <td>
          <v-img :src="props.item.secureThumbnail" style="width: 100px"></v-img>
        </td>
        <td>{{props.item.dateCreated | formatDate}}</td>
        <td>{{props.item.title}}</td>
        <td>{{props.item.status}}</td>
        <!-- <td>{{props.item.sellerCustomField}}</td> -->
        <td>{{props.item.itemId}}</td>
        <td v-if="props.item.last_seven_day_visits > 0">{{((props.item.soldQuantity / props.item.total_visits) * 100).toFixed(2)}} %</td>
        <td v-else>0 %</td>
        <td>{{props.item.availableQuantity}}</td>
        <td>{{props.item.soldQuantity}}</td>
        <td>{{props.item.price | currency}}</td>
        <td>{{props.item.total_visits}}</td>
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

export default {
  async asyncData({ params }) {
    let getItems = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/itemsfull/${getCookie(
        "seller"
      )}`
    });

    return {
      items: getItems.data,
      search: "",
      headers: [
        {
          text: "Item",
          align: "center",
          sortable: false,
          value: "secureThumbnail"
        },
        {
          text: "Data Criação",
          align: "center",
          sortable: true,
          value: "dateCreated"
        },
        {
          text: "Descrição",
          align: "center",
          sortable: true,
          value: "title"
        },
        {
          text: "Situação",
          align: "center",
          sortable: true,
          value: "status"
        },
        // {
        //   text: "Id ERP",
        //   aligth: "center",
        //   sortable: true,
        //   value: "sellerCustomField"
        // },
        {
          text: "Id Item",
          aligth: "center",
          sortable: true,
          value: "itemId"
        },
        {
          text: "Conversão",
          aligth: "center",
          sortable: true,
          value: "last_seven_day_visits"
        },
        {
          text: "Estoque",
          aligth: "center",
          sortable: true,
          value: "availableQuantity"
        },
        {
          text: "Vendido",
          aligth: "center",
          sortable: true,
          value: "soldQuantity"
        },
        {
          text: "Preço",
          aligth: "center",
          sortable: true,
          value: "price"
        },
        {
          text: "Visitas",
          aligth: "center",
          sortable: true,
          value: "total_visits"
        }
      ]
    };
  },
  methods: {
    track() {
      console.log("ga started");
      this.$ga.page({
        page: "/br",
        title: "Página de Produtos",
        location: window.location.href
      });
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
