<template>
  <v-card>
    <v-card-title id="title" @click="track">
      Questions
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <template id="questions-1">
      <v-layout row wrap>
        <v-flex pa-1 md6 v-for="(question, i) in questions" :key="i">
          <v-card color="#ffe491" light>
            <v-card-title>
              <v-icon large left>question_answer</v-icon>
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
      questionId: []
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
    }
  }
};
</script>
