<template>
  <v-card>
    <v-layout justify-start>
      <h1 id="title" @click="track">Questions Pending: {{questions.length}}</h1>
    </v-layout>

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
                <th>Status</th>
                <th>Estoque</th>
              </tr>
              <tr>
                <td>
                  <a :href="this.linkItem" target="_blank">
                    <v-img :src="this.imagemItem" style="width: 100px"></v-img>
                  </a>
                </td>
                <td>{{this.nomeItem}}</td>
                <td>{{this.precoItem | currency}}</td>
                <td>{{this.status}}</td>
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
              <v-icon large left>question_answer</v-icon>
              <span class="title font-weight-light">Nova Mensagem</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold">"{{question.text}}"</v-card-text>
            <v-text-field outlined label="Resposta" v-model="questionId[i]"></v-text-field>
            <v-btn v-bind="btnOption" @click="showProduct(question.itemId)" class="subheading mr-2">
              <v-icon class="mr-1">remove_red_eye</v-icon>Ver Produto
            </v-btn>
            <v-btn
              v-bind="btnOption"
              @click="sendAnswer(question.id, questionId[i], i)"
              class="subheading mr-2"
            >
              <v-icon class="mr-1">done_all</v-icon>responder
            </v-btn>
            <v-card-text class="White--text">
              <span sm3>Recebido em: {{question.dateCreated | formatDate}}</span>
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
      estoqueItem: "",
      status: "",
      linkItem: "",
      loading: false,
      disabled: false
    };
  },
  computed: {
    btnOption() {
      const options = {
        loading: this.loading,
        disabled: this.disabled
      };
      return options;
    }
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
    sendAnswer(questionId, text, i) {
      this.loading = true;
      this.disabled = true;
      if (text != "" && text != undefined) {
        axios({
          method: "post",
          url: `https://neto-mercado-livre.herokuapp.com/api/answers/${getCookie(
            "seller"
          )}`,
          data: {
            questionId: questionId,
            text: text
          }
        })
          .then(res => {
            this.questions.splice(i);
            this.loading = false;
            this.disabled = false;
          })
          .catch(err => {
            alert(err);
            this.loading = false;
            this.disabled = false;
          });
      } else {
        alert("Mensagem é obrigatória");
        this.loading = false;
        this.disabled = false;
      }
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
          this.status = res.data[0].status;
          this.linkItem = res.data[0].permalink;
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
table,
th,
td {
  border: 1px solid black;
  text-align: center;
}
</style>
