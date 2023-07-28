<script>
export default{
    mounted(){
        console.log(import.meta.env.VITE_MISSKEY_TOKEN)
    },
    data() {
        return {
            misuki:{},
            timeline:{},
        }
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
            this.timeline = await (await fetch("https://misskey.systems/api/notes/local-timeline", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method : "POST",
                body : JSON.stringify({
                    i : "yRbr21ta6LdjewCy6n5fzNbMPcbZo71d",
                })
            })).json();
            console.log("timeline")
        }
        
    }
}
</script>
<template>
    <v-btn @click="mi">わたしの情報</v-btn>
    <div>
        <p>みすてむずのわたしの情報</p>
        <img :src="misuki.avatarUrl" />

        <p>{{ misuki.name }}</p>
        <p>{{ misuki.avatarUrl }}</p>
    </div>
    <v-btn @click="getTimeline">タイムラインを取得！</v-btn>
    <div class="timeline-no-soto"> 
        <v-list v-for="(item, key) in timeline" :key="key">
            <!-- <img :src="item.user.avatarUrl" style="width: 100px;"/> -->
            <v-avatar  size="x-large"><v-img :src="item.user.avatarUrl"/></v-avatar>
            {{ item.user.name }}
            <div>
                {{ item.text }}
            </div>
        </v-list>
    </div>
    <pre>{{ timeline }}</pre>
</template>

<style scoped>
.timeline-no-soto{
    margin: 1em 0;
}
</style>