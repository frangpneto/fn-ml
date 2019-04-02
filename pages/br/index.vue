<template>
  <v-form>
    <v-toolbar light>
      <v-toolbar-title>Dashboard Mercado Livre</v-toolbar-title>
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
              <h2>O único Dashboard gratúito para você analisar sua performance no Mercado Livre e poder tomar as decisões certas!*</h2>
              <span>Está é uma ferramentas de análise e gestão para que atue em tempo real e otimize seu negócio</span>
              <br>
              <v-btn @click="Aproveite" outline>Aproveite, é de Graça*</v-btn>
            </v-flex>
            <v-flex xl6 lg6 md6 sm12 xs12 class="hidden-sm-and-down">
              <v-img src="/EvolutionSales.jpg" aspect-ratio="1.7" contain></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
      <!--Footer -->
      <v-layout row wrap></v-layout>
    </v-container>
  </v-form>
</template>
<style scoped>
.cursive {
  font-family: cursive;
}
</style>
<script>
export default {
   data () {
      return {
        items: [
          {
            text: 'Contato'
          },
          {
            text: 'Premium'
          },
          {
            text: 'Aessar',
            to: '/login'
          }
        ]
      }
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
      console.log('ga started')
      this.$ga.page({
        page: "/br",
        title: "Página Iniciaç",
        location: window.location.href
      });
    }
  }
};
</script>

