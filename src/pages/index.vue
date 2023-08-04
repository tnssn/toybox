<script>
// misskey
import * as Misskey from 'misskey-js'
export default {
    data() {
    return {
        meta: {},
        cli: new Misskey.api.APIClient({
        origin: "https://misskey.systems",
        credential: import.meta.env.VITE_MISSKEY_TOKEN,
        }),
        postContent: "",
    };
    },
    async mounted() {
    this.meta = await this.cli.request("i", { detail: true });
    },
    methods: {
        MisskeyPostTest() {
            console.log(this.postContent)
        },
        async MisskeyPost() {
        await this.cli.request("notes/create", {text:this.postContent});
        }
    }
}
</script>
<template>
    <div>home</div>
    <v-text-field variant="outlined" v-model="postContent"></v-text-field>
    <v-btn @click="MisskeyPostTest" class="bg-blue-accent-1">ぽすとみすきー！てすと</v-btn>
    <v-btn @click="MisskeyPost" class="bg-blue-accent-1">ぽすとみすきー！</v-btn>
 
</template>