export default async ({ store }) => {
    console.log('プラグインloadUserが実行されました。')
    store.dispatch("auth/loadUser");
}