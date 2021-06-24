export default function ({ store, redirect }) {
  if (store.state.auth.auth_user) {
    redirect('/')
  }else{
    console.log("ログインしてない");
  }
}