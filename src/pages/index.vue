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
        timeline:{},
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
        },
        async getTimeLine() {
            this.timeline = await this.cli.request("notes/local-timeline");
            console.log(this.timeline)
        },
    }
}
</script>
<template>
    <div>home</div>
    <v-text-field variant="outlined" v-model="postContent"></v-text-field>
    <v-btn @click="MisskeyPostTest" class="bg-blue-accent-1">ぽすとみすきー！てすと</v-btn>
    <v-btn @click="MisskeyPost" class="bg-blue-accent-1">ぽすとみすきー！</v-btn>
<br>
<br>
    <v-btn @click="getTimeLine">タイムラインを取得！</v-btn>
    {{ timeline }}
</template>