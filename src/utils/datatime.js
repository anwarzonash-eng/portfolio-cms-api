export default async function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15);
    return timestamp + '_' + randomString;
}