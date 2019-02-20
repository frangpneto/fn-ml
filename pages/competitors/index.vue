<template>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
    :headers="headers"
    :items="items"
    v-model="selected"
    :search="search"  >

      <template slot="items" slot-scope="props">
        <td>
          <v-img :src="props.item.secureThumbnail" style="width: 100px"></v-img>
        </td>
        <td>{{props.item.dateCreated}}</td>
        <td>{{props.item.title}}</td>
        <td>{{props.item.status}}</td>
        <td>{{props.item.sellerCustomField}}</td>
        <td>{{props.item.itemId}}</td>
        <td>{{props.item.availableQuantity}}</td>
        <td>{{props.item.soldQuantity}}</td>
        <td>{{props.item.price}}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>

import axios from "axios";
import cookies from "cookie";
import VueNumeric from "vue-numeric";
import moment, { version } from "moment";

export default {

}
</script>
