<template>
  <div class="container" id="app" v-cloak>
    <form v-on:submit.prevent>
      <input type="textarea" v-model="comment" />
      <button v-on:click="submit">送信</button>
      <button v-on:click="sort">⬇︎</button>
      <button v-on:click="sortUp">⬆︎</button>
    </form>
    <div v-for="(comment, index) in comments" :key="comment.tokuten">
      <ul>
        <p>
          コメント : <span>{{ comment.comment }}</span>
        </p>
        <button v-on:click="deleteItem(index)">delete</button>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data: function() {
    return {
      comment: "",
      rate: 0,
      comments: [],
      sun: 0,
      length: false,
    }
  },

  methods: {
    submit: function() {
      if (this.comment == "") return
      if (this.comment.length > 100) return
      let commentItem = {
        comment: this.comment,
        rate: this.rate,
      }
      firebase
        .firestore()
        .collection("timelineData")
        .doc(`${this.$route.params.id}`)
        .collection("comment")
        .add({ comment: this.comment })

      this.comments.unshift(commentItem)
      this.sun = this.sun + Number(commentItem.rate)
      this.comment = ""
      this.rate = 0
      if (this.comments.length > 0) {
        this.length = true
      }
    },

    deleteItem: function(index) {
      this.sun = this.sun - Number(this.comments[index].rate)
      this.comments.splice(index, 1)
      if (this.comments.length < 1) {
        this.length = false
      }
    },

    sortUp: function() {
      let arr = this.comments
      arr.sort(function(a, b) {
        if (a.rate > b.rate) return 1
        if (a.rate < b.rate) return -1
        return 0
      })
      this.comments = arr
    },

    sort: function() {
      let arr = this.comments
      arr.sort(function(a, b) {
        if (a.rate > b.rate) return -1
        if (a.rate < b.rate) return 1
        return 0
      })
      this.comments = arr
    },
  },

  computed: {
    averageScore: function() {
      return (this.sun / this.comments.length).toFixed(2)
    },
  },
}
</script>
