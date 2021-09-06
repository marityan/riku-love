<template>
  <section class="container">
    <div>
      <figure>
        <img src="../images/icon.png" />
      </figure>
      <h1 class="title">
        ESタイムライン
      </h1>
      <div>
        <b-card>
          <textarea id="ESContent" v-model="text" />
          <button v-on:click="toukou">投稿</button>
        </b-card>
      </div>
      <!-- <div class="list">
        <div class="item" v-for="(item, index) in this.news" :key="index">
          <div>{{ index + item.text }}</div>
          <button v-on:click="commentFunction">コメントをする</button>
        </div>
      </div>
      // 自動読み込みのブロック
      一定の部分までスクロールされると@infinite=で指定したmethodが実行される
      <infinite-loading
        ref="infiniteLoading"
        spinner="circle"
        @infinite="infiniteLoad"
      >
        // ステータスがcompleteに更新されると下記が表示される
        <span slot="no-more">-----検索結果は以上です-----</span>
        // 結果が存在しない場合下記が表示される
        <span slot="no-results">-----検索結果はありません-----</span>
      </infinite-loading> -->
      <!-- Twitter -->
      <!-- <div class="twitter__container">
        
        <div class="twitter__title">
          <span class="twitter-logo"></span>
        </div>
        
        <div class="twitter__contents"> -->

      <div
        class="twitter__block"
        v-for="(item, index) in esTimeline"
        :key="index"
      >
        <figure>
          <img src="../images/icon.png" />
        </figure>
        <div class="twitter__block-text">
          <div class="name">
            {{ item.id }}<span class="name_reply"> @{{ item.userId }} </span>
          </div>
          <div class="date">1時間前</div>
          <div class="paper">
            <div class="lines">
              <div class="text" contenteditable spellcheck="false">
                {{ item.text }}
              </div>
            </div>
          </div>
          <div class="twitter__icon" for="com">
            <button
              class="twitter-heart"
              id="com"
              v-on:click="commentFunction(item.id)"
            >
              コメントする
            </button>
          </div>
        </div>
      </div>
      <!-- 
      </div> -->
    </div>
  </section>
</template>

<script>
import firebase from "firebase"
// import InfiniteLoading from "vue-infinite-loading"

export default {
  components: {
    // InfiniteLoading,
  },
  data() {
    return {
      esTimeline: [],
      news: [],
      text: "",
      id_last: "0",
    }
  },
  created() {
    firebase
      .firestore()
      .collection("timelineData")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc)
          this.esTimeline.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
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
    /*
     * infiniteLoad
     * 自動実行されるmethod
     */
    infiniteLoad() {
      for (let i = 0; i < 20; i++) {
        this.news.push(this.esTimeline[i])
      }
      this.$refs.infiniteLoading.stateChanger.loaded()
      if (this.news.length == 30) {
        this.$refs.infiniteLoading.stateChanger.complete()
      }
    },
    commentFunction(id) {
      this.router.push({ path: `/comment/${id}` })
    },
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

<style scoped>
.item {
  padding: 0;
  background: #ffffff;
  overflow: hidden;
  margin-top: 0.1px;
  /* margin: 20px auto; */
  font-size: 80%;
  border: solid 1px #eeeeee;
}
.list {
  padding: 0;
  position: relative;
}

/* .twitter__container {
  padding: 0;
  background: #ffffff;
  overflow: hidden;
  max-width: 400px;
  margin: 20px auto;
  font-size: 80%;
  border: solid 1px #eeeeee;
}

.twitter__container a {
  color: #58aeed;
} */

/* タイトル部分 */
.twitter__title {
  background: #58aeed;
  padding: 10px;
  text-align: center;
  font-size: 150%;
  color: #ffffff;
}

.twitter__title .twitter-logo {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  display: block;
}

.twitter__title span {
  font-size: 20px;
}

/* タイムライン部分 */
.twitter__contents {
  overflow: hidden;
  position: relative;
  line-height: 135%;
}

.twitter__contents.scroll {
  height: 500px;
  overflow-y: scroll;
}
.twitter__block {
  width: 100%;
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: solid 1px #eeeeee;
  overflow: hidden;
}

.twitter__block:last-child {
  border-bottom: solid 0px;
}
/* アイコン画像 */
.twitter__block figure {
  width: 50px;
  padding: 0;
  margin: 0;
  float: left;
  width: 50px;
}
/* 正方形を用意 */
.twitter__block figure img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
/* コメントエリア */
.twitter__block-text {
  margin: 0;
  position: relative;
  margin-left: 60px;
  padding-right: 10px;
}

.twitter__block-text .name {
  font-weight: bold;
}

.twitter__block-text .name .name_reply {
  color: #8a9aa4;
  margin-left: 10px;
}

.twitter__block-text .date {
  position: absolute;
  top: 0;
  right: 20px;
  text-align: right;
  color: #8a9aa4;
}
/* 本文 */
.twitter__block-text {
  margin: 5px 0;
}
/* 画像を貼る場合 */
.twitter__block-text .text .in-pict img {
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  margin: 5px 0;
  width: 95%;
  height: 200px;
  object-fit: cover;
}

.twitter__icon br {
  display: none;
}

.twitter__icon .twitter-bubble {
  width: 14px;
  height: 14px;
  display: block;
  padding-left: 20px;
  width: 20%;
  float: left;
  color: #8a9aa4;
  border: 0px;
}

/* @import url(https://fonts.googleapis.com/css?family=Indie+Flower); */
body {
  margin: 0;
  padding: 0;
  background: lightgoldenrodyellow;
}
.paper {
  height: 550px;
  width: 450px;
  background: rgba(255, 255, 255, 0.9);
  margin: 45px 25px;
  left: 50%;
  top: 50%;
  box-shadow: 0px 0px 5px 0px #888;
}
/* .paper::before {
  content: "";
  position: absolute;
  left: 45px;
  height: 100%;
  width: 2px;
  background: rgba(255, 0, 0, 0.4);
} */
.lines {
  margin-top: 45px;
  height: calc(100% - 35px);
  width: 100%;
  background-image: repeating-linear-gradient(
    white 0px,
    white 24px,
    steelblue 25px
  );
}
.text {
  position: absolute;
  top: 80px;
  left: 55px;
  bottom: 30px;
  right: 30px;
  line-height: 25px;
  font-family: "Indie Flower";
  overflow: hidden;
  outline: none;
}
/* .holes {

  left: 10px;
  height: 25px;
  width: 25px;
  background: lightgoldenrodyellow;
  border-radius: 50%;
  box-shadow: inset 0px 0px 2px 0px #888;
}
.hole-top {
  top: 10%;
}
.hole-middle {
  top: 50%;
}
.hole-bottom {
  bottom: 1000%;
} */
.ma {
  background-color: palegreen;
  width: 100%;
}
.container {
  margin: 0;
  padding: 0;
}
</style>
