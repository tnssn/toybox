<script>
// misskey
import * as Misskey from 'misskey-js'
export default{
    mounted(){
        console.log(import.meta.env.VITE_MISSKEY_TOKEN)
    },
    data() {
        return {
            misuki:{},
            timeline:{},
            meta: {},
            cli: new Misskey.api.APIClient({
            origin: "https://misskey.systems",
            credential: import.meta.env.VITE_MISSKEY_TOKEN,
            }),
            postContent: "",
        }
    },
    async mounted() {
    this.meta = await this.cli.request("i", { detail: true });
    this.mi()
    },
    methods: {
        async mi() {
            this.misuki = await (await fetch("https://misskey.systems/api/i", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method : "POST",
                body : JSON.stringify({
                    i : import.meta.env.VITE_MISSKEY_TOKEN,
                })
            })).json();
        },
        async getTimeline() {
            this.timeline = await this.cli.request("notes/local-timeline");
            console.log(this.timeline)
        }, 
        async MisskeyPost() {
            await this.cli.request("notes/create", {text:this.postContent});
        }
    }
}
</script>
<template>
    <div>
        <p>みすてむずのわたしの情報</p>
        <img :src="misuki.avatarUrl" />

        <p>{{ misuki.name }}</p>
    </div>

    <hr>
    <v-text-field variant="outlined" v-model="postContent"></v-text-field>
    <v-btn @click="MisskeyPost" class="bg-blue-accent-1">ぽすとみすきー！</v-btn>

    <hr>

    <v-btn @click="getTimeline">タイムラインを取得！</v-btn>
    <div class="timeline-no-soto"> 
        <v-list v-for="(item, key) in timeline" :key="key">
            <!-- <img :src="item.user.avatarUrl" style="width: 100px;"/> -->
            <v-avatar  size="x-large">
                <v-img :src="item.user.avatarUrl"/>
            </v-avatar>
            {{ item.user.name }}
            <div>
                {{ item.text }}
            </div>
        </v-list>
    </div>
    <!-- <pre>{{ timeline }}</pre> -->
</template>

<style scoped>
.timeline-no-soto{
    margin: 1em 0;
}
</style>