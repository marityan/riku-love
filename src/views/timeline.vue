<template>
  <div>
    <div>
      <b-card>
        <textarea id="ESContent" v-model="text" />
        <button v-on:click="toukou">投稿</button>
      </b-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      id_last: "0",
      text: "",
    }
  },

  created: function() {
    firebase
      .firestore()
      .collection("timelineData")
      .get()
      .then(
        function(querySnapshot) {
          querySnapshot.forEach(
            function(doc) {
              if (Number(doc.data().id) > Number(this.id_last)) {
                this.id_last = doc.data().id
              }
            }.bind(this)
          )
        }.bind(this)
      )
  },

  methods: {
    toukou: function() {
      this.id_last = String(Number(this.id_last) + 1)

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .firestore()
            .collection("timelineData")
            .add({
              userId: user.uid,
              text: this.text,
              wordLength: this.text.length,
            })
          alert("投稿完了")
          this.text = ""
        } else {
          // User is signed out
          alert("投稿することができません。")
          console.log("Error")
        }
      })
    },
  },
}
</script>

<style></style>
