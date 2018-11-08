<template>
<div class="signup container">
  <form @submit.prevent="signup" class="card-panel">
    <!--signup method - firebase will take care of auth-->
    <h2 class="center deep-purple-text">Signup</h2>
    <div class="field">
      <!-- for styling -->
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email">
</div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
</div>
        <div class="field">
          <label for="alias">Alias:</label>
          <input type="text" name="alias" v-model="alias">
</div>
          <p class="red-text center" v-if="feedback">{{feedback}}</p>
          <div class="field center">
            <button class="btn deep-purple">Signup</button>
          </div>
  </form>
</div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }

  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = 'This alias already exists'
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => { // cred is used in Firebase 5.0.0
                //console.log(cred.user)
                ref.set({ // .set some properties on document
                  alias: this.alias,
                  geolocation: null,
                  user_id: user.uid
                })
              }).then(() => {
                this.$router.push({
                  name: 'GMap'
                }) //re-route them back to GMap page, see router/index.js lines 11-13
              })
              .catch(err => {
                console.log(err)
                this.feedback = err.message
              })
            this.feedback = 'This alias is free to use'
          }
        })
        console.log(this.slug)
      } else {
        this.feedback = "You must enter an alias"
      }
    }
  }
}
</script>
.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field{
  margin-bottom: 16px;
}

<style>

</style>
