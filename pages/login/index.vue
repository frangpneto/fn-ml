<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Authentication</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    v-model="email"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="senha"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login(email, senha)">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
document.cookie = "seller=";
document.cookie = "loja=";
import axios from "axios";
import cookies from "cookie";
function getCookie(cookieName, stringCsookie) {
  let strCookie = new RegExp("" + cookieName + "[^;]+").exec(stringCookie)[0];
  return unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, "") : "");
}
export default {
  head() {
    return {
      title: "Dashboard Mercado Livre - Login",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "keywords", content: "dashboard mercado livre, mercado livre, gestão de vendas mercado livre, gestão de vendas" },
        {
          hid: "description",
          name: "description",
          content: "aplicação para gestão de vendas realizadas no mercado livre."
        }
      ]
    };
  },
  data: () => ({
    drawer: null,
    email: "",
    senha: ""
  }),
  props: {
    source: String
  },
  layout: "clean",
  methods: {
    login(email, senha) {
      this.$nuxt.$loading.start();
      axios({
        method: "post",
        data: {
          email: email,
          senha: senha
        },
        url: "https://neto-mercado-livre.herokuapp.com/api/auth"
      })
        .then(res => {
          if (res.status == 200) {
            document.cookie = `seller=${res.data.seller}`;
            document.cookie = `loja=${res.data.loja}`;
            document.cookie = `usuario=${email}`
            window.location = "/";
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          alert(`Unathourized, err: ${err}`);
        });
    }
  }
};
</script>


