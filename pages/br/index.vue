<template>
  <v-form>
    <v-toolbar light class="cursive">
      <v-toolbar-title id="title" @click="track">Dashboard Mercado Livre</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-for="item in items" :key="item.text" class="hidden-sm-and-down">
        <v-btn flat :to="item.to">{{ item.text }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <!-- body -->
      <v-layout row wrap>
        <v-container>
          <v-layout row wrap>
            <v-flex xl6 lg6 md6 sm12 xs12 pa-5 class="cursive">
              <h2>O único Dashboard com acesso gratúito para você analisar sua performance no Mercado Livre e poder tomar as decisões certas!</h2>
              <span>Está é uma ferramentas de análise e gestão para que atue em tempo real e otimize seu negócio</span>
              <br>
              <v-btn @click="Aproveite" outline color="green darken-1">Aproveite</v-btn>
            </v-flex>
            <v-flex xl6 lg6 md6 sm12 xs12 class="hidden-sm-and-down">
              <v-img src="/EvolutionSales.jpg" aspect-ratio="1.7" contain></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <v-footer>
        <v-layout>
        </v-layout>
      </v-footer>
  </v-form>
</template>
<style scoped>
.cursive {
  font-family: cursive;
}
</style>
<script>
setTimeout(function() {
  document.getElementById("title").click();
}, 1000);
export default {
  head() {
    return {
      title: "Dashboard Mercado Livre",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "dashboard mercado livre, mercado livre, gestão de vendas mercado livre, gestão de vendas, vender mais, mercadolivre, software, ferramentas, acompanhar concorrentes, responder perguntas, subir de posição, publicar, publicar massivamente, indicadores, metricas, tempo real, notificações, operadores"
        },
        {
          hid: "description",
          name: "description",
          content:
            "Acompanhe seus concorrentes, tenha acesso a indicadores das vendas realizadas no Mercado Livre. Aplicação para gestão de vendas realizadas no Mercado Livre."
        }
      ]
    };
  },
  data() {
    return {
      items: [
        {
          text: "Contato"
        },
        {
          text: "Premium"
        },
        {
          text: "Aessar",
          to: "/login"
        }
      ]
    };
  },
  layout: "clean",
  methods: {
    Aproveite() {
      window.open(
        "https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=5738811713607553",
        "_blank"
      );
    },
    track() {
      console.log("ga started");
      this.$ga.page({
        page: "/br",
        title: "Página Iniciaç",
        location: window.location.href
      });
    }
  }
};
</script>

