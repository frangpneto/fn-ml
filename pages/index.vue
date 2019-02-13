
<template>
  <div>
    <v-layout justify-start>
      <h1>Dashboard</h1>
    </v-layout>
    <v-divider></v-divider>
    <v-layout>
      <h3>Vendas</h3>
    </v-layout>
    <v-layout row wrap>
      <v-flex md3>Dashboard</v-flex>
      <v-flex md3>Dashboard</v-flex>
      <v-flex md3>Dashboard</v-flex>
      <v-flex md3>Dashboard</v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  fetch({ store, par }) {
    console.log("start get api");
    return axios({
      method: "post",
      headers:{'map-key': 'connect-3pKAdFWa'},
      data: {
        updateTime: "2019-02-13"
      },
      url: "https://www.leverosintegra.com.br/Map/Api/Orders"
    })
      .then(res => {
        console.log("ok", res);
        //store.seller = res.data;
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};
</script>




