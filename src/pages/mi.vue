<script>
export default{
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
                    i : "yRbr21ta6LdjewCy6n5fzNbMPcbZo71d",
                })
            })).json();
            console.log(this.misuki)
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
    <button @click="mi">わたしの情報</button>
    <div>
        <p>みすてむずのわたしの情報</p>
        <img :src="misuki.avatarUrl" />

        <p>{{ misuki.name }}</p>
        <p>{{ misuki.avatarUrl }}</p>
    </div>
    <button @click="getTimeline">タイムラインを取得！</button>
    <div> 
        <div v-for="(item, key) in timeline" :key="key">
            <img :src="item.user.avatarUrl" style="width: 100px;"/>{{ item.user.name }}
            <div>
                {{ item.text }}
            </div>
        </div>
    </div>
    <pre>{{ timeline }}</pre>
</template>