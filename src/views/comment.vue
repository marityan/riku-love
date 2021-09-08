<template>
  <div class="container" id="app" v-cloak>
    <form v-on:submit.prevent class="comment">
      <img src="../images/icon.png" />
      <input type="textarea" v-model="comment" class="comment_textarea" />
      <button v-on:click="submit" class="btn">
        送信
      </button>
      <button v-on:click="sort" class="btn">⬇︎</button>
      <button v-on:click="sortUp" class="btn">
        ⬆︎
      </button>
    </form>
    <div
      class="comment_container"
      v-for="(comment, index) in comments"
      :key="comment.tokuten"
    >
      <div class="comment_contents scroll">
        <div class="comment_block">
          <figure>
            <img src="../images/icon.png" />
          </figure>
          <div class="comment_block-text">
            <div class="name">
              うさきち<span class="name_reply">@usa_tan</span>
            </div>
            <div class="date">1時間前</div>
            <div class="text">
              {{ comment.comment }}
            </div>
            <!-- <div class="comment_icon">
              <span class="comment-loop">4</span>
            </div> -->
            <button v-on:click="deleteItem(index)" class="btn_delete">
              削除
            </button>
          </div>
        </div>
      </div>
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
  props: {
    docId: {
      type: String,
      require: true,
    },
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
        .doc(this.docId)
        .collection("comment")
        .add({
          comment: this.comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

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

      firebase
        .firestore()
        .collection("timelineData")
        .doc(this.docId)
        .collection("comment")
        .doc(this.comments[index].id)
        .delete()
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

  created() {
    const ref = firebase
      .firestore()
      .collection("timelineData")
      .doc(this.docId)
      .collection("comment")
      .orderBy("createdAt", "desc")

    this.subscribe = ref.onSnapshot((snapshot) => {
      let esTimeline = []
      snapshot.forEach((doc) => {
        esTimeline.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      this.comments = esTimeline
    })
  },

  computed: {
    averageScore: function() {
      return (this.sun / this.comments.length).toFixed(2)
    },
    // mathDate: function() {
    //   const a = date.toDate()
    //   const b = new Date()
    //   if () {

    //   }
    // },
  },
}
</script>
<style scoped>
.comment {
  width: 700px;
}

.comment_container {
  padding: 0;
  background: #ffffff;
  overflow: hidden;
  margin: 20px auto;
  font-size: 80%;
}

.comment_contents.scroll {
  height: auto;
  overflow-y: scroll;
}

.comment_block {
  width: 100%;
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  overflow: hidden;
}

.comment_block:last-child {
  border-bottom: solid 0px;
}

.comment_block figure {
  width: 50px;
  padding: 0;
  margin: 0;
  float: left;
  width: 50px;
}

.comment_block figure img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.comment_block-text {
  margin: 0;
  position: relative;
  margin-left: 60px;
  padding-right: 10px;
}
.comment_block-text .name {
  font-weight: bold;
}

.comment_block-text .name .name_reply {
  color: #8a9aa4;
  margin-left: 10px;
}

.comment_block-text .date {
  position: absolute;
  top: 0;
  right: 20px;
  text-align: right;
  color: #8a9aa4;
}

.comment_block-text .text {
  margin: 5px 0;
}

.comment_icon {
  width: 30px;
  height: 30px;
}

.comment_icon br {
  display: none;
}

.comment-loop {
  width: 10px;
  height: 10px;
  display: block;
  margin-left: 40px;
  background: palegreen;
  float: left;
  color: #8a9aa4;
}
.container img {
  border-radius: 50%;
  width: 35px;
  height: 35px;
}
.comment_textarea {
  width: 350px;
  margin: 0 10px;
  border-bottom: 1px solid;
  border-left: transparent;
  border-right: transparent;
  border-top: transparent;
}
.btn {
  color: #fff;
  background-color: palegreen;
  width: auto;
  height: 35px;
  margin: 0 5px;
}
.btn:hover {
  color: #fff;
  background: paleturquoise;
}

.btn_delete {
  color: #fff;
  background-color: palegreen;
  width: auto;
  height: 20px;
  border: transparent;
  margin: 0 5px;
  border-radius: 100vh;
}
.btn_delete:hover {
  color: #fff;
  background: paleturquoise;
}
</style>
