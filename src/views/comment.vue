<template>
  <v-list three-line>
    <div v-for="(comment, index) in comments" :key="index">
      <v-list-item :key="index" avater>
        <v-list-item-avatar>
          <img :src="comment.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-subtitle class="text--primary subheading">
            {{ comment.content }}
          </v-list-item-subtitle>

          <v-list-item-subtitle>
            {{ comment.createdAt.toDate().toLocaleString() }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action> </v-list-item-action>
        <v-divider :key="comment.id"></v-divider>
      </v-list-item>
    </div>
  </v-list>
</template>
