<template>
  <div>
    <div class="signed-in-user-profile" v-if="user">
      <!-- <div>uid : {{ user.uid }}</div> -->
      <div>Googleユーザ名 : {{ user.displayName }}</div>

      <div class="signed-in-user-profile__photo">
        <img
          v-bind:src="
            user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'
          "
        />
        
        <div class="container">
          <header>
            <div class="row">
              <h1>ユーザー登録</h1>
            </div>
          </header>
        </div>

        <hr />

        <div class="container">
          <form action="＃" method="get" class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <div class="form-group">
                <label for="name"
                  ><span class="label label-danger">必須</span> お名前</label
                >
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="form-control"
                  placeholder="例：ジャングル オーシャン"
                  autofocus
                  required
                />
              </div>
              <div class="form-group">
                <label for="email"
                  ><span class="label label-danger">必須</span>
                  メールアドレス</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="例：raffaello@jungleocean.com"
                  required
                />
              </div>
              <div class="form-group">
                <label for="tel"
                  ><span class="label label-danger">必須</span> 電話番号</label
                >
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  class="form-control"
                  placeholder="例：080-1234-5678"
                  required
                />
              </div>
              <div class="form-group">
                <label><span class="label label-danger">必須</span> 性別</label>
                <div>
                  <label class="radio-inline">
                    <input type="radio" name="male" value="1" required />男性
                  </label>

                  <label class="radio-inline">
                    <input type="radio" name="female" value="2" required />女性
                  </label>

                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="not applicable"
                      value="9"
                      required
                    />その他
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="job"
                  ><span class="label label-success">任意</span>
                  あなたが目指している職業</label
                >
                <select id="job" name="job" class="form-control">
                  <option value="">選択してください</option>
                  <option value="Webデザイナー">Webデザイナー</option>
                  <option value="Webディレクター">Webディレクター</option>
                  <option value="フロントエンドエンジニア"
                    >フロントエンドエンジニア</option
                  >
                  <option value="バックエンドエンジニア"
                    >バックエンドエンジニア</option
                  >
                  <option value="ゴリラ">ゴリラ</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div class="form-group">
                <label
                  ><span class="label label-success">任意</span>
                  あなたが学びたいこと（複数選択可）</label
                >
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="q1_html"
                      name="q1"
                      value="デザイン"
                    />デザインについて
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="q1_html"
                      name="q1"
                      value="プログラミング"
                    />プログラミングについて
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="q1_html"
                      name="q1"
                      value="マーケティング"
                    />マーケティングについて
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="q1_html"
                      name="q1"
                      value="バナナ"
                    />バナナについて
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">送信する</button>
            </div>
          </form>
        </div>

        <hr />

        <div class="container">
          <footer>
            <p>&copy; JungleOcean.</p>
          </footer>
        </div>
      </div>
    </div>
    <div v-else>No User Signed In</div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>

<style scoped>
.signed-in-user-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signed-in-user-profile__photo {
  height: 10rem;
}
.signed-in-user-profile__photo img {
  height: 100%;
  object-fit: contain;
}

header {
  margin-top: 30px;
  color: #43a047;
}
hr {
  border-width: 3px;
  border-color: #43a047;
}
h1 {
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  text-align: center;
}
.align-light {
  text-align: right;
}
.form-group {
  margin-bottom: 35px;
}
footer p {
  text-align: center;
}
input:required {
  background: #ffcdd2;
}
input[type="email"]:invalid {
  background: #ffcdd2;
}
input:valid {
  background: transparent;
}
input:focus {
  background: #dcedc8;
}
</style>
