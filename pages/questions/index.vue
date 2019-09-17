<template>
  <v-card>
    <v-card-title id="title" @click="track">
      Questions
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-row justify="center">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list three-line subheader>
            <v-subheader>Detalhes do produto</v-subheader>
            <table>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
              </tr>
              <tr>
                <td>
                  <v-img :src="this.imagemItem" style="width: 100px"></v-img>
                </td>
                <td>{{this.nomeItem}}</td>
                <td>{{this.precoItem | currency}}</td>
                <td>{{this.estoqueItem}}</td>
              </tr>
            </table>
            <v-list-item>
              <v-list-item-content>
                <v-card id="iframe"></v-card>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>

    <template id="questions-1">
      <v-layout row wrap>
        <v-flex pa-1 md12 v-for="(question, i) in questions" :key="i">
          <v-card color="#ffe491" light>
            <v-card-title>
              <v-icon large left @click="showProduct(question.itemId)">question_answer</v-icon>
              <span class="title font-weight-light">Nova Mensagem</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold">"{{question.text}}"</v-card-text>
            <v-card-actions>
              <v-list-item class="grow">
                <v-row align="center" justify="end">
                  <v-text-field v-model="questionId[i]"></v-text-field>
                </v-row>
                <v-row align="center" justify="end">
                  <v-icon class="mr-1">done_all</v-icon>
                  <v-btn @click="sendAnswer(i, questionId[i])" class="subheading mr-2">responder</v-btn>
                </v-row>
              </v-list-item>
            </v-card-actions>
            <v-card-text class="White--text">
              <span sm3>{{question.dateCreated | formatDate}}</span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
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
    let getQuestions = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/pedingQuestions/${getCookie(
        "seller"
      )}?dti=${moment(new Date().addDays(-360)).format(
        "YYYY-MM-DD"
      )}&dtf=${moment(new Date().addDays(3)).format("YYYY-MM-DD")}`
    });
    return {
      questions: getQuestions.data,
      search: "",
      questionId: [],
      dialog: false,
      nomeItem: "",
      precoItem: "",
      imagemItem: "",
      estoqueItem: ""
    };
  },
  methods: {
    track() {
      console.log("ga started");
      this.$ga.page({
        page: "/questin",
        title: "Página de Questões",
        location: window.location.href
      });
    },
    sendAnswer(a, i) {
      alert(a);
      alert(i);
    },
    showProduct(item) {
      axios({
        method: "post",
        url: `https://neto-mercado-livre.herokuapp.com/api/product/${item}`
      })
        .then(res => {
          this.nomeItem = res.data[0].title;
          this.precoItem = res.data[0].price;
          this.imagemItem = res.data[0].secureThumbnail;
          this.estoqueItem = res.data[0].availableQuantity;
          var parent = document.getElementById("iframe");
          parent.insertAdjacentHTML(
            "afterend",
            `<iframe src="${res.data[0].permalink}" style="width:100%;height: 650px;" scrolling="no"></iframe>>`
          );
          this.dialog = true;
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style scoped>
table, th, td {
  border: 1px solid black;
  text-align: center;
}
</style>
