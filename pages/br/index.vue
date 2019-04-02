<template>
  <v-form>
    <v-container>
      <!--Header-->
      <v-layout row wrap>
        <v-flex md10>logo</v-flex>
        <v-flex md1>contato</v-flex>
        <v-flex md1>preço</v-flex>
      </v-layout>
      <!-- body -->
      <v-layout row wrap>
        <v-container>
          <v-layout row wrap>
            <v-flex xl12 xs6 md6 pa-5 class="cursive">
              <h2>O único Dashboard gratúito para você analisar sua performance no Mercado Livre e poder tomar as decisões certas!*</h2>
              <span>Está é uma ferramentas de análise e gestão para que atue em tempo real e otimize seu negócio</span>
              <br />
              <v-btn @click="Aproveite" outline>Aproveite, é de Graça*</v-btn>
            </v-flex>
            <v-flex xl12 xs6 md6>
              <v-img src="/EvolutionSales.jpg" aspect-ratio="1.7" contain></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
      <!--Footer -->
      <v-layout row wrap>

      </v-layout>
    </v-container>
  </v-form>
</template>
<style scoped>
.cursive{
  font-family: cursive
}
</style>
<script>
export default {
  layout: "clean",
   methods: {
     Aproveite() {
       window.open('https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=5738811713607553', '_blank');
     }
   }
};
</script>

