
<template>
  <div>
    <v-layout justify-start>
      <v-icon light>multiline_chart</v-icon>
      <h1>Dashboard</h1>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex pa-1 md4>
        <v-card min-height="250">
          <v-card-title>
            <h3>Overview</h3>
          </v-card-title>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <h2>{{items.length - inactiveItem}}</h2>
                <span>Publlicações Ativas</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{inactiveItem}}</h2>
                <span>Publlicações Pausadas</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{sumQuestionsPending}}</h2>
                <span>Perguntas Pendentes</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{orderMessagesPending}}</h2>
                <span>Mensagens Pendentes</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex pa-1 md4>
        <v-card min-height="250">
          <v-card-title>
            <h3>Activity today</h3>
          </v-card-title>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <h2>{{orderToday.quantity}}</h2>
                <span>Vendas</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{questionsToday}}</h2>
                <span>Perguntas</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>
                  <vue-numeric
                    disabled
                    currency="R$"
                    separator="."
                    v-bind:precision="2"
                    v-model="orderToday.value"
                  ></vue-numeric>
                </h2>
                <span>Receita</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>R$ {{(orderToday.value / orderToday.quantity).toFixed(2)}}</h2>
                <span>Ticket Médio</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex pa-1 md4>
        <v-card min-height="250">
          <v-card-title>
            <h3>Performance</h3>
          </v-card-title>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <h2>{{visitsSevenDay}}</h2>
                <span>visitas</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{((orders.length / visitsSevenDay) * 100).toFixed(2)}}%</h2>
                <span>vendas por visita</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{questions.length}}</h2>
                <span>Perguntas</span>
              </v-flex>
              <v-flex xs12 sm6>
                <h2>{{(questions.length / orders.length).toFixed(2)}}</h2>
                <span>perguntas por pedido</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <span class="font-italic">ultimos 7 dias</span>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
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
function sumOrders(orders) {
  var total = 0;
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    total = +total + +order.totalAmount;
  }
  return total;
}
function sumQuestionsPending(questions) {
  var total = 0;
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    if (question.status != "ANSWERED") {
      total++;
    }
  }
  return total;
}
function getOrderToday(orders) {
  var ordersToday = []
  var total = 0;
  var value = 0;
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    if (
      moment(order.dateCreated).format("YYYY-MM-DD") >=
      moment().format("YYYY-MM-DD")
    ) {
      total++;
      value = +value + +order.totalAmount
    }
  }
  ordersToday.quantity = total
  ordersToday.value = value
  return ordersToday;
}
function sumQUestionsToday(questions) {
  var total = 0;
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    if (
      moment(question.dateCreated).format("YYYY-MM-DD") >=
      moment().format("YYYY-MM-DD")
    ) {
      total++;
    } else {
      //console.log(question.dateCreated);
    }
  }
  return total;
}
function itemsInactive(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.status != "active") {
      total++;
    }
  }
  return total;
}
function messagePending(messages) {
  var total = 0;
  for (var i = 0; i < messages.length; i++) {
    var message = messages[i];
    if (message.dateRead == null) {
      total++;
    }
  }
  return total;
}
function questionsLatestSevenDays(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    total = +total + +item.lastSevenDayVisits;
  }
  return total;
}
export default {
  // data() {
  //   return {
  //     orders: []
  //   };
  // },
  async asyncData({ params }) {
    let getOrders = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/orders/${getCookie(
        "seller"
      )}?dti=${moment(new Date().addDays(-7)).format(
        "YYYY-MM-DD"
      )}&dtf=${moment().format()}`
    });
    let getQuestions = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/questions/${getCookie(
        "seller"
      )}?dti=${moment(new Date().addDays(-7)).format("YYYY-MM-DD")}&dtf=${moment().format()}`
    });
    let getItems = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/items/${getCookie(
        "seller"
      )}`
    });
    let getMessage = await axios({
      method: "post",
      url: `https://neto-mercado-livre.herokuapp.com/api/ordermessages/${getCookie(
        "loja"
      )}`
    });
    return {
      orderToday: getOrderToday(getOrders.data),
      orders: getOrders.data,
      sumOrders: sumOrders(getOrders.data),
      questions: getQuestions.data,
      questionsToday: sumQUestionsToday(getQuestions.data),
      sumQuestionsPending: sumQuestionsPending(getQuestions),
      items: getItems.data,
      inactiveItem: itemsInactive(getItems.data),
      orderMessagesPending: messagePending(getMessage.data),
      visitsSevenDay: questionsLatestSevenDays(getItems.data)
    };
  },
  components: {
    VueNumeric
  }
};
</script>




