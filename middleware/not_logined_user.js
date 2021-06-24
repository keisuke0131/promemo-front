export default function ({ store, redirect }) {
  if (!(store.state.auth.auth_user)) {
    redirect('/auth/login')
  }else{
    console.log("ログイン中");
  }
}