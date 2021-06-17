export default async ({ store }) => {
    store.dispatch("auth/loadUser");
}