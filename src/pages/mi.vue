<script>
export default{
    data() {
        return {
            misuki:{}   
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
        }
    }
}
</script>
<template>
    <button @click="mi">みすきー！</button>
    <div>
        <p>みすてむずのわたしの情報</p>
        <img :src="misuki.avatarUrl" />

        <p>{{ misuki.name }}</p>
        <p>{{ misuki.avatarUrl }}</p>
    </div>
</template>