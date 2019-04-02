<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="drawer">
        <v-list dense class="grey lighten-4">
          <template v-for="(item, i) in items">
            <v-layout row v-if="item.heading" align-center :key="i">
              <v-flex xs6>
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
            <v-list-tile :key="i" :to="item.to" v-else>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="amber" app absolute clipped-left>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">Mercado Livre</span>
        <!-- <v-text-field solo-inverted flat label="Search" prepend-icon="search"></v-text-field> -->
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <nuxt/>
      </v-content>
    </v-app>
  </div>
</template>
<style scoped>
#keep main .container {
  height: 660px;
}

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
</style>
<!-- Global site tag (gtag.js) - Google Analytics -->


<script>
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

if (window.location.pathname != "/login" && window.location.pathname != "/br") {
  if (getCookie("seller") == "") {
    window.location = "/br";
  }
}

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
  data: () => ({
    drawer: null,
    items: [
      { icon: "dashboard", text: "Dashboard", to: "/" },
      { icon: "remove_red_eye", text: "Concorrentes", to: "/competitors" },
      { icon: "question_answer", text: "Questions", to: "/questions" },
      { icon: "apps", text: "Produtos", to: "/products" },
      { icon: "shopping_cart", text: "Vendas", to: "/orders" },
      {
        icon: "supervisor_account",
        text: "Gestão de Usuários",
        to: "/account"
      },
      { icon: "exit_to_app", text: "Sair", to: "/br" }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    track() {
      this.$ga.page(this.$router);
    }
  }
};
</script>
